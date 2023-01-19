import { DateTime } from 'luxon'
import voltaDaily from './volta/daily.js'
import voltaMonthlyPrecheck from './volta/monthly_precheck.js'
import voltaMonthly from './volta/monthly.js'

import ewcDaily from './ewc/daily.js'
import ewcMonthlyPrecheck from './ewc/monthly_precheck.js'
import ewcaMonthly from './ewc/monthly.js'

import nodemailer from 'nodemailer'
import fs from 'fs'
import util from 'util'

// Creates a Log File to be uploaded with emails
const LOG_DIR = "logs"
const timestamp = DateTime.local().toISO()
const LOG_FILE_NAME = `${timestamp}.log`
const LOG_PATH = LOG_DIR + "/" + LOG_FILE_NAME
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR)
}

// Binds `console.log` to a new function that logs to standard output and file
// Note: May only work with console.logs that only have 1 parameter
var log_file = fs.createWriteStream(LOG_PATH, { flags: 'w' });
var log_stdout = process.stdout;

console.log = function (d) { //
  log_file.write(DateTime.local().toISOTime() + ": " + util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

let statusLog = []

const main = async () => {
  try {
    await scriptRunner()
  } catch (e) {
    try {
      console.log("An error occured for the script runner.")
      await sendEmail([
        {name: "EC2 Runner", success: false, message: "EC2 Runner Script, the process responsible for running daily, monthly precheck, and monthly scripts, has caught an unexpected error."},
        ...statusLog
      ], false)
    } catch (e) { }
  }
}

const scriptRunner = async () => {
  // 15 mins
  const TIMEOUT = 900000
  let dailyRanSuccessfully = false

  // Production variable only used for running Volta or EWC Scripts
  const production = (process.env.PRODUCTION === "true") ? true : false
  const isFirstOfMonth = DateTime.local().day.toString() === '1'

  // Run the scripts
  console.log("--> [Daily] Starting...")
  const dailyFinished = await daily(production)
  console.log(">>> Finished executing workflow")
  if (dailyFinished === undefined) {
    // Error: Send email to Web3 Renewables
    console.log("--> [Daily] Error Occured. Skipping monthly if necessary.")
    statusLog.push({ name: "Daily", success: false, message: "Error Occured." })
  } else if (!dailyFinished) {
    // No viable PV Systems registered
    console.log("--> [Daily] No viable PV Systems registered. Skipping monthly if necessary.")
    statusLog.push({ name: "Daily", success: true, message: "No viable PV Systems registered. Skipping monthly if necessary." })
  } else {
    console.log("--> [Daily] Successfully Finished!")
    statusLog.push({ name: "Daily", success: true, message: "Successfully Finished!" })
    dailyRanSuccessfully = true
  }

  // Run Monthly EWC Scripts
  if (isFirstOfMonth && dailyRanSuccessfully) {
    // Wait 15 mins after daily finished to allow Web3 Storage files to settle
    console.log("--> [Precheck] Waiting....")
    await sleep(TIMEOUT)
    console.log("--> [Precheck] Starting...")
    const precheckFinished = await monthlyPrecheck(production)
    let precheckRanSuccessfully = false
    console.log(">>> Finished executing workflow")
    if (precheckFinished === undefined) {
      // Error: Send Message to Web3 Renewables email
      console.log("--> [Precheck] Error Occured")
      statusLog.push({ name: "Monthly Precheck", success: false, message: "An Error Occured." })
    } else if (!precheckFinished) {
      // Precheck finsihed, no updates
      console.log("--> [Precheck] No updates needed.")
      statusLog.push({ name: "Monthly Precheck", success: true, message: "No PV Systems have had a status change." })
      precheckRanSuccessfully = true
    } else {
      console.log("--> [Precheck] Updates occured. Waiting...")
      statusLog.push({ name: "Monthly Precheck", success: true, message: "Backtraced and updated past GCs for at least one PV System." })
      precheckRanSuccessfully = true
      await sleep(TIMEOUT)
    }

    if (precheckRanSuccessfully) {
      console.log("--> [Monthly] Starting...")
      const monthlyFinished = await monthly(production)
      console.log(">>> Finished executing workflow")
      if (monthlyFinished === undefined) {
        // Error: Send email to Web3 Renewables
        console.log("--> [Monthly] Error Occured")
        statusLog.push({ name: "Monthly", success: false, message: "Error Occured" })
      } else if (!monthlyFinished) {
        // No viable PV Systems registered
        console.log("--> [Monthly] Finished, no daily data to create monthly from.")
        statusLog.push({ name: "Monthly", success: true, message: "Finished, no daily data to create monthly from." })
      } else {
        console.log("--> [Monthly] Successfully Finished!")
        statusLog.push({ name: "Monthly", success: true, message: "Successfully Finished!" })
      }
    }
  }

  await sendEmail(statusLog, true)
}

const daily = async (production) => {
  return (production) ? ewcDaily() : voltaDaily()
}

const monthlyPrecheck = async (production) => {
  return (production) ? ewcMonthlyPrecheck() : voltaMonthlyPrecheck()
}

const monthly = async (production) => {
  return (production) ? ewcaMonthly() : voltaMonthly()
}

const sendEmail = async (scripts, sendOnlyOnError = true) => {
  const containsError = scripts.some(script => !script.success)
  console.log(`--> [Email] ${sendOnlyOnError ? "Only Sending email on error." : "Sending email regardless of status."} `)

  if (!containsError && sendOnlyOnError) {
    console.log("--> [Email] No errors. Will NOT send email")
    return
  }

  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.GMAIL_EMAIL_USERNAME, // generated ethereal user
        pass: process.env.GMAIL_APP_PASSWORD, // generated ethereal password
      },
    });
    // send mail with defined transport object
    await transporter.sendMail({
      from: `"Web3 Renewables AWS Server" <${process.env.GMAIL_EMAIL_USERNAME}@gmail.com>`, // sender address
      to: `${process.env.GMAIL_EMAIL_USERNAME}@gmail.com`, // list of receivers
      subject: `AWS Server Script Execution: ${(containsError) ? "Failed" : "Success"}`, // Subject line
      html: createBody(scripts), // html body
      attachments: [
        {   // utf-8 string as an attachment
          filename: LOG_FILE_NAME,
          path: LOG_PATH
        }
      ]
    });
  } catch (e) {
    console.log("--> [Email] Could not send email report")
    console.log(e)
  }
}


const createBody = (scripts) => {
  return (
    `
  <table style="width:100%; font-family: Arial, Helvetica, sans-serif">
      <tr>
        <th style="padding: 15px;text-align: left; background-color: #04AA6D; color: white;">Attempted Scripts Ran</th>
        <th style="padding: 15px;text-align: left; background-color: #04AA6D; color: white;">Success</th>
        <th style="padding: 15px;text-align: left; background-color: #04AA6D; color: white;">Message</th>
      </tr>
      ${scripts.map((script, index) => {
      const bgColor = (index % 2 == 0) ? "#f2f2f2" : "white"
      return `<tr>
          <td style="padding: 15px;text-align: left; background-color:${bgColor}">${script.name}</td>
          <td style="padding: 15px;text-align: left; background-color:${bgColor}">${(script.success) ? "\u2714" : "\u274C"}</td>
          <td style="padding: 15px;text-align: left; background-color:${bgColor}">${script.message}</td>
        </tr>`
    }).join("\n")}
    </table>`
  )
}

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

main()