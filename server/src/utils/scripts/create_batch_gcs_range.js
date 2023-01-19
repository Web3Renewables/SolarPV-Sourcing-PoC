import { DateTime } from 'luxon'
import { getIamClient } from "../helpers/iam-client.js"
import { WALLET_PRIVATE_KEY, RPC_URL, CHAIN_ID, VOLTA_CACHE_SERVER_URL, getInfuraIPFSConfig, ORG_ELECTRICIAN_ROLE_NAMESPACE } from "../../volta/constants.js"
import { Web3Storage } from 'web3.storage'
import { putFiles, saveRawAndGCs } from "../helpers/web3-storage.js"
import { loginWattTime } from "../helpers/watt-time.js"
import { validClaims } from "../helpers/iam-client.js"
import { createGCs } from "../mappers/create-gc.js"
import { parseIndex, updateIPNSPointer } from '../helpers/web3-name.js'
import { getDaysInMonth } from '../utils.js'
import { issueBatchDailyVCs } from '../vcs/create_vc.js'
import { fetchEnctypedPVSystemData } from '../daily_aggregate.js'

const createBatchGCsRange = async () => {

  // August
  const month = 11
  const monthObj = getDaysInMonth(month, 2022)
  const dates = []
  for (let i = 0; i < monthObj.daysInMonth; i++) {
    const startDateUtc = DateTime.utc(monthObj.year, monthObj.month, i + 1, 0, 0, 0, 0)
    const endDateUtc = DateTime.utc(monthObj.year, monthObj.month, i + 1, 23, 59, 59, 59)
    const inverterDateISO = startDateUtc.toISODate()
    dates.push({ startDateUtc, endDateUtc, inverterDateISO })
  }
  
  const web3StorageToken = process.env.WEB3_STORAGE_API_KEY
  console.log(">>> Connecting to Volta Test Network")
  const iamClient = await getIamClient(RPC_URL, CHAIN_ID, VOLTA_CACHE_SERVER_URL, process.env.WALLET_PRIVATE_KEY, getInfuraIPFSConfig())

  if (!iamClient.domainsService || !iamClient.assetsService || !iamClient.claimsService || !iamClient.didRegistry) {
    console.log(">>> Could not login to network")
    return
  }

  const orgNamespace = `${process.env.NEXT_PUBLIC_SWITCHBOARD_ORG_NAME}.${process.env.NEXT_PUBLIC_SWITCHBOARD_ROOT_NAMESPACE}`

  const decodeKey = process.env.DECRYPTION_KEY
  const production = false
  const orgElectricianRoleNamespace = ORG_ELECTRICIAN_ROLE_NAMESPACE
  const ipnsPrivateKey = process.env.DEVELOPMENT_INDEX_PRIVATE_KEY
  const ipnsAddress = process.env.DEVELOPMENT_INDEX_ADDRESS
  const indexFileName = process.env.INDEX_FILE_NAME

  console.log(`>>> Running daily GC for dates ${dates[0].startDateUtc} - ${dates[monthObj.daysInMonth - 1].startDateUtc}`)

  console.log(`>>> Connected to network as ${iamClient.did}`)
  console.log(`>>> Getting Valid Claims...`)

  const appsInfo = (await validClaims(iamClient, orgNamespace, "pv-system", "electrician", orgElectricianRoleNamespace)).filter(obj => obj.app.id == 485)

  const apps = await fetchEnctypedPVSystemData(appsInfo)
  console.log(apps)

  // check that there exists at least one project
  if (!apps.length) {
    console.log(">>> No PV Systems to create GCs from.")
    return
  }
  console.log(">>> There exists claims to create GCs")

  // Login to WattTime
  console.log(">>> Logging into WattTime...")
  const wattTimeToken = await loginWattTime()

  if (wattTimeToken === undefined) {
    console.log(">>> could not log into WattTime")
    return
  }
  console.log(">>> Logged into WattTime")

  console.log(">>> Creating GCs")
  const timestamp = new Date().toISOString()  
  let gcs = []
  for (let i = 0; i < dates.length; i++) {
    const gc = await createGCs(apps, wattTimeToken, decodeKey, production, iamClient.did, dates[i], timestamp)
    gcs.push(gc)
  }

  // const gcs = await Promise.all(dates.map(async date => {
  //   return await createGCs(apps, wattTimeToken, decodeKey, production, iamClient.did, date, timestamp)
  // }))

  const filtered = gcs.flat().filter(obj => obj !== undefined)

  if (!filtered.length) {
    console.log(">>> After filtering, no GCs to upload")
    return
  }
  console.log(filtered)

  const web3Storage = new Web3Storage({ token: web3StorageToken })
  // Saving RAW Inverter Data and GCs to Web3.Storage
  const cids = await saveRawAndGCs(filtered, web3Storage)
  if (!cids) return

  const { rawInverterCID, gcFilesCID } = cids

  console.log(">>> Issuing Batch of VCs...")
  const vcs = await issueBatchDailyVCs(process.env.VC_TEST_ACCOUNT_PRIVATE_KEY, process.env.VC_TEST_ACCOUNT_PRIVATE_KEY, gcFilesCID, filtered, production)

  console.log(">>> Updating IPNS File...")
  // Create the new index file from the old one
  const newDailyIndexFileCID = await updateDailyIndex(web3Storage, ipnsPrivateKey, ipnsAddress, indexFileName, gcFilesCID, vcs, rawInverterCID)
  if (!newDailyIndexFileCID) {
    console.log(">>> Could not update IPNS")
  } else {
    console.log(">>> Updated IPNS")
  }

  console.log(">>> Finished executing workflow")
}

const updateDailyIndex = async (web3storage, privateKey, nameAddress, originalFileName, newCid, gcs, rawInverterCid) => {
  try {
    const revision = await parseIndex(nameAddress)
    const oldCid = revision.value.slice(6)
    const res = await web3storage.get(oldCid)
    if (!res.ok) {
      console.log(">>> Could not update index because could not retrieve original")
      return
    }
    const files = await res.files()
    const original = files.find(file => file.name === originalFileName)
    const data = JSON.parse(await original.text())
    let newData;
    for (let i = 0; i < gcs.length; i++) {
      const tokens = gcs[i].data.gc.fileName.split("_")
      newData = updateDailyObject(data, tokens[0], newCid, gcs[i], rawInverterCid)
    }

    const newIndexCid = await putFiles(web3storage, [{ fileName: originalFileName, data: newData }])
    await updateIPNSPointer(newIndexCid, privateKey)
    return newIndexCid
  } catch (e) {
    console.log(e)
  }
}

const updateDailyObject = (dataObject, date, newCid, gc, rawInverterCID) => {
  let data = dataObject

  if (!data.pvSystems) {
    data.pvSystems = {}
  }

  let pvSystemObject = (!data.pvSystems[gc.data.gc.data.production_device_identifier]) ? { reporting_dates: [], status: "Active" } : data.pvSystems[gc.data.gc.data.production_device_identifier]
  if (!pvSystemObject.status) pvSystemObject.status = "Active"
  if (!pvSystemObject.reporting_dates) pvSystemObject.reporting_dates = []

  const entry = {
    rawInverterCID: rawInverterCID,
    vcUuid: gc.vcUuid,
    cid: newCid,
    fileName: gc.data.gc.fileName,
    pvSystemDID: gc.data.gc.data.production_device_identifier,
  }

  if (!data.daily[date]) data.daily[date] = {}
  if (!data.daily[date].entries) data.daily[date].entries = []
  data.daily[date].entries.push(entry)

  let tempList = (!pvSystemObject.reporting_dates) ? [] : pvSystemObject.reporting_dates
  if (!tempList.includes(date)) {
    tempList.push(date)
    data.pvSystems[gc.data.gc.data.production_device_identifier] = { reporting_dates: tempList, status: pvSystemObject.status }
  }

  return data
}



createBatchGCsRange()