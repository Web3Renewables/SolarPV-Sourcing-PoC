import fs from 'fs'
import jwtDecode from 'jwt-decode'
import { DateTime } from 'luxon'

const convertDateToUTC = (date, timezone) => {
  return new Date(`${date} ${timezone}`).toISOString()
}

const writeFileAsJSON = (data, fileName) => {
  fs.writeFileSync(fileName, JSON.stringify(data))
}

const readFileAsJSON = (path) => {
  return JSON.parse(fs.readFileSync(path))
}

const writeCsv = (fileName, csv) => {
  fs.writeFileSync(fileName, csv)
}

const findMaxClaimTypeReducer = (prev, current) => {
  return (prev.claim.claimTypeVersion > current.claim.claimTypeVersion) ? prev : current
}

const yesterday = () => {
  // Get ISO date time for inverter (UTC 00;00;00) for yesterday
  const startDateUtc = DateTime.utc().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).minus({ days: 1 })
  const endDateUtc = DateTime.utc().set({ hour: 23, minute: 59, second: 59, millisecond: 59 }).minus({ days: 1 })
  // Gets the day month year for inverter request
  const inverterDateISO = startDateUtc.toISODate()
  return {
    startDateUtc,
    endDateUtc,
    inverterDateISO
  }
}

/**
 * Gets the number of days in last month
 * @returns {{year: string, month: string, daysInMonth: number}}
 */
const getDaysInLastMonth = () => {
  var dt = new Date();
  // While Month is 0 based, (i.e, 0 = Jan, 1 = Feb, etc)
  // Therefore, getting the current month will lead to the last months data being returned
  var month = dt.getUTCMonth();
  var year = dt.getUTCFullYear();
  // Passing in 0 as the day will return the last day of the previous month
  // Therefore, passing in 7, 2022 - Would be Auguest 2022, however 0 makes it the last day of July - therefore July 2022
  return getDaysInMonth(month, year)
}

/**
 * Gets the number of days in last month
 * @param {number} month Month to grab. For example: 1 = January, 2 = February, 3 = March, etc..
 * @param {number} year Year to grab month from
 * @returns {{year: string, month: string, daysInMonth: number}}
 */
const getDaysInMonth = (month, year) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  return { year: year, month: month, daysInMonth: daysInMonth }
}

/**
 * Filters a list distinctly by a key in an object
 * @param {{cid: string, pvSystemDID: string, fileName: string, certificateStatus: string}[] | {JSONObject}} dataArray Check 'web3_renewables_index.json' for schema (specifically daily property)
 * @param {string} key Key to filter by distinct with
 * @returns 
 */
const filterUniqueByKey = (dataArray, key) => {
  return [...new Map(dataArray.map(item => [item[key], item])).values()];
}

/**
 * Gets unique months / years from an array of dates
 * @param {{year: string, month: string, day: string}} dates Array of Dates to get unique months from (ISO 8601)
 */
const getUniqueMonths = (dates) => {
  // Covnvert the data that will be the same to a string, make that a key, then filter by that key
  const months = dates.map(date => {
    const yearMonth = { month: date.month, year: date.year }
    return {
      key: JSON.stringify(yearMonth),
      date: yearMonth
    }
  })
  return [...new Map(months.map(item => [item["key"], item])).values()].map(obj => obj.date);
}

/**
 * Returns date object from string with two digits for month and day (M-RETS Format)
 * @param {string} dateString Date in ISO 8601
 * @returns 
 */
const formatDateString = (dateString) => {
  return DateTime.fromFormat(dateString, "yyyy-M-d").toFormat('MM/dd/yyyy').toString()
}

/**
 * Returns date object from string with two digits for month and day (M-RETS Format)
 * @param {string} dateString Date in ISO 8601
 * @returns 
 */
 const formatIsoDateString = (dateString) => {
  return DateTime.fromISO(dateString).toFormat('MM/dd/yyyy').toString()
}

/**
 * Delays execution of function
 * @param {number} ms Number of milliseconds to sleep
 * @returns 
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Gets the day and month from a utc date
 * @param {string} dateString UTC Date in ISO8601
 * @returns 
 */
const getYearMonthDayUtc = (dateString) => {
  const date = DateTime.fromISO(dateString, { zone: 'utc' })
  return { year: date.year.toString(), month: date.month.toString(), day: date.day.toString() }
}

const sortNewestByCreatedAt = (x,y) => {
  return DateTime.fromISO(y.createdAt, {setZone: "utc"}).toMillis() - DateTime.fromISO(x.createdAt, {setZone: "utc"}).toMillis()
}

const decodeAndParseJWT = (token) => {
  const decode = jwtDecode(token)
  const requestorFields = decode.claimData.requestorFields.find(obj => obj.key === 'data')
  if(!requestorFields) return
  try {
    return JSON.parse(requestorFields.value)
  } catch {
    return undefined
  }
}

export {
  convertDateToUTC,
  writeFileAsJSON,
  readFileAsJSON,
  findMaxClaimTypeReducer,
  yesterday,
  getDaysInMonth,
  getDaysInLastMonth,
  filterUniqueByKey,
  formatDateString,
  sleep,
  getYearMonthDayUtc,
  getUniqueMonths,
  writeCsv,
  sortNewestByCreatedAt,
  decodeAndParseJWT,
  formatIsoDateString
}