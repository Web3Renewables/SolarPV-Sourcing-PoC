import { parseIndex, updateIPNSPointer, updateMonthlyIndex } from "./helpers/web3-name.js"
import { getDaysInLastMonth, filterUniqueByKey, getYearMonthDayUtc, getUniqueMonths } from "./utils.js"
import { Web3Storage } from "web3.storage"
import { fetchFileList, pinFiles, putFiles, saveRawAndGCs } from "./helpers/web3-storage.js"
import { createMonthlyGCs } from "./mappers/create-monthly-gc.js"
import { issueBatchMonthlyVCs, updateBatchVCs } from "./vcs/create_vc.js"
import fetch from "node-fetch"

const monthlyWorkFlow = async (
  ipnsAddress,
  ipnsPrivateKey,
  web3Storage,
  indexFileName,
  production,
  walletPrivateKey,
) => {
  // Get the month / number of days of the previous month
  const lastMonth = getDaysInLastMonth()

  console.log(">>> Getting Index File...")
  // Get the index file
  const file = await getIndexFile(ipnsAddress, indexFileName, web3Storage)
  let index = JSON.parse(await file.text())

  // Check if any DIDs have had their PV System role change, if so, update the past GCs
  const dids = getDIDsFromIndex(index)
  // If no DIDs, no system has had any daily reports
  if (dids.length == 0) {
    console.log(">>> No DIDs reported for in the daily functions for the month.")
    return false
  }

  // Get the CIDs of all the files to grab for the month
  console.log(">>> Getting entries from index by month")
  const entries = getEntriesFromIndexByMonth(index.daily, lastMonth)
  const filtered = filterUniqueByKey(entries, "cid")
  if (!filtered.length) { throw new Error("No files to fetch") }

  // For each CID, get all the files
  console.log(">>> Fetching files from Web3.Storage...")
  const fileContents = await fetchWeb3StorageFilesOriginal(filtered, web3Storage)
  if (!fileContents.length) { throw new Error("No files fetched from Web3.Storage") }

  // Map the files returned to their correct PV System (so they can be aggregated into a monthly GC)
  let pvSystemFiles = organizeFilesToPVSystems(fileContents)
  console.log(Object.keys(pvSystemFiles))

  // Create Array of all MonthlyGCs
  const timestamp = new Date().toISOString()
  let monthlyGCs = createMonthlyGCs(pvSystemFiles, `${lastMonth.year}-${lastMonth.month}-1`, `${lastMonth.year}-${lastMonth.month}-${lastMonth.daysInMonth}`, production, timestamp)

  // Post all objects as files to Web3.Storage
  console.log(">>> Saving GCs files to Web3.Storage")
  const monthlyCID = await putFiles(web3Storage, monthlyGCs)

  console.log(">>> Issuing Batch of VCs...")
  const vcs = await issueBatchMonthlyVCs(walletPrivateKey, walletPrivateKey, monthlyCID, monthlyGCs, production)
  
  // Save File locations to IPNS Index
  console.log(">>> Updating the index file...")
  const newIndexCID = await updateMonthlyIndex(web3Storage, ipnsPrivateKey, ipnsAddress, indexFileName, monthlyCID, vcs, lastMonth.year, lastMonth.month)

  // Pin Monthly CID
  console.log(">>> Pinning Newest Index File and Monthly CIDs")
  await pinFiles([monthlyCID, newIndexCID])
  return true
}

/**
 * Retrieves the file pointed to byt the IPNS address
 * @param {string} ipnsAddress IPNS Address for the Web3Renewables Index
 * @param {string} indexFileName Filename stored at the CID pointed to by the IPNS address
 * @param {Web3Storage} web3Storage Web3Storage Class
 * @returns {Web3File}
 */
const getIndexFile = async (ipnsAddress, indexFileName, web3Storage) => {
  const revision = await parseIndex(ipnsAddress)
  const fileCID = revision.value.slice(6)

  const fileRes = await fetch(`https://${fileCID}.ipfs.w3s.link/${indexFileName}`)
  if (!fileRes.ok) throw new Error()
  return fileRes
}

/**
 * Maps the Daily JSON objects in index from PVSystemDID to CIDs in Web3Storage
 * @param {{year: string, month: string, daysInMonth: number}} monthObject Object representing information about a month (month: 1 = January)
 * @param {Web3RenewablesIndex.daily} jsonObject Web3Renewables index object (Check 'web3_renewables_index.json' for schema, specifically 'daily' property)
 * @returns {{cid: string, pvSystemDID: string, fileName: string, certificateStatus: string}[]}
 */
const getEntriesFromIndexByMonth = (jsonObject, monthObject) => {
  const monthString = (monthObject.month > 9) ? monthObject.month : `0${monthObject.month}`
  const dateInclude = `${monthObject.year}-${monthString}`
  return Object.entries(jsonObject).map(([key, value]) => {
    if (key.includes(dateInclude)) return value
  }).filter(obj => obj !== undefined).map(obj => obj.entries).flat()
}

/**
 * Maps CIDs of a date to the file saved in Web3Storage
 * @param {{date: string, cid: string[]}[]} dateCIDArr 
 * @param {Web3Storage} web3Storage Web3Storage Class
 * @returns {{cid: string, data: DailyGCSchema}}
 */
const fetchWeb3StorageFilesOriginal = async (cidArr, web3Storage) => {
  let tempCidArr = cidArr
  let resolveJsonObjects = []
  while (tempCidArr.length) {
    const jsonObjects = await Promise.all(tempCidArr.splice(0, 15).map(async (obj) => {
      try {
        const res = await web3Storage.get(obj.cid)
        if (!res.ok) {
          console.log(`failed to get ${obj.cid}`)
          return;
        }

        let files = await res.files()
        const resolvedFiles = await Promise.allSettled(files.map(async file => {
          return {
            data: await file.text(),
            fileName: file.name
          }
        }))

        const filtered = resolvedFiles
          .filter(promise => promise.status === 'fulfilled')
          .map(promise => promise.value)

        const jsonFiles = filtered.map(({ data, fileName }) => {
          return {
            cid: obj.cid,
            data: JSON.parse(data),
            indexData: obj,
            fileName
          }
        })

        return jsonFiles
      } catch (e) {
        console.log(e)
        console.log(`>>> Could not fetch - ${obj.cid}`)
      }

    }))
    resolveJsonObjects = [...resolveJsonObjects, ...jsonObjects]
  }
  return resolveJsonObjects.flat().filter(obj => obj !== undefined)
}

/**
 * Organizes the retrieved file contents to their respective DIDs (Returns GC Data Schema Array Per PV System)
 * @param {{cid: string, data: DailyGCSchema}[]} array 
 * @returns {{['PVSystemDID']: {JSONObject}[]}}
 */
const organizeFilesToPVSystems = (array) => {
  let pvSystemFiles = {}
  array.forEach(obj => {
    const key = obj.data.production_device_identifier
    const current = pvSystemFiles[key] ?? []
    pvSystemFiles[key] = [...current, obj]
  })
  return pvSystemFiles
}

const getDIDsFromIndex = (index) => {
  if (index.pvSystems === undefined) return []
  return Object.entries(index.pvSystems).map(([key, value]) => key)
}

const checkAndUpdatePastGCs = async (dids, index, web3Storage, subjectPrivKey, issuerPrivKey, production) => {
  let updates = []
  for (let i = 0; i < dids.length; i++) {
    // Given a DID, check if the Pv-System role is revoked,
    // Should have value, but just to be sure, default it if undefined
    if (!index.pvSystems[dids[i]]) index.pvSystems[dids[i]] = {}
    if (!index.pvSystems[dids[i]].status) index.pvSystems[dids[i]].status = "Active"

    const status = index.pvSystems[dids[i]].status
    // Check if the pv System is in the file (should be, error if not)
    console.log(">>> Checking " + dids[i] + "...")
    const gcObjs = await getPastDailyGCs(dids[i], index)
    if (!gcObjs.length) {
      console.log(">>> Could not retrieve past Daily GCs for " + dids[i])
      updates.push({ did: dids[i], status: status, updateMrets: false })
      continue;
    }

    // Check if the current pv system role status is the same as the past GCs
    const needsUpdating = gcObjs.some(obj => obj.gc.certificate_status !== status)

    if (needsUpdating) {
      updates.push({ updateable: await updateGCs(dids[i], gcObjs, web3Storage, status, index), did: dids[i], status: status, updateMrets: true })
    } else {
      updates.push({ did: dids[i], status: status, updateMrets: false })
    }
  }


  // If no need for updates, return the original index
  if (!updates.some(update => update.updateable !== undefined)) {
    console.log(">>> No updates to PV System roles")
    return { index: index, pvSystemStatusList: updates, wasIndexUpdated: false }
  }
  console.log(">>> Systems have had a role change, updating index with new files...")
  //If updates, update the index file (Daily and Monthly) and upload it
  const updatedIndex = updateIndex(index, updates)

  // Update the DID Document
  const data = []
  updates.forEach(obj => {
    if (obj.updateable !== undefined) {
      const daily = obj.updateable.dailyGcsMetadata.map(meta => { return { fileName: meta.fileName, cid: meta.dailyGcCid, did: meta.did, vcUuid: meta.vcUuid } })
      const monthly = obj.updateable.monthlyGcsMetadata.map(meta => { return { fileName: meta.fileName, cid: meta.monthlyGcCid, did: meta.did, vcUuid: meta.vcUuid } })
      data.push(...daily)
      data.push(...monthly)
    }
  })

  console.log(">>> Updating Batch VCs...")
  await updateBatchVCs(subjectPrivKey, issuerPrivKey, data, production)
  console.log(">>> Finished updating batch VCs")

  return { index: updatedIndex, wasIndexUpdated: true, pvSystemStatusList: updates.map(obj => { return { did: obj.did, status: obj.status, updateMrets: obj.updateMrets } }) }
}

/**
 * Gets the past daily GCs from the Web3 Renewables Index
 * @param {string} did PV System DID
 * @param {IndexGCSchema} index Index File (For more information see index_schema.json)
 * @returns {{gc: DailyGCSchema, vcUuid: string, date: string, fileName: string, entryIndex: number}[]}
 */
const getPastDailyGCs = async (did, index) => {
  if (!index || !index.pvSystems || !index.pvSystems[did] || !index.pvSystems[did].reporting_dates) return []
  if (!index.pvSystems[did].reporting_dates.length) return []
  const dates = index.pvSystems[did].reporting_dates
  const gcs = await Promise.all(dates.map(async date => {
    const metaDataIndex = index.daily[date].entries.findIndex(entry => entry.pvSystemDID === did)
    if (metaDataIndex == -1) return
    const metadata = index.daily[date].entries[metaDataIndex]
    const res = await fetch(`https://${metadata.cid}.ipfs.w3s.link/${metadata.fileName}`)
    if (!res.ok) return
    return { gc: await res.json(), vcUuid: metadata.vcUuid, date: date, fileName: metadata.fileName, entryIndex: metaDataIndex }
  }))

  return gcs.filter(obj => obj !== undefined)
}

/**
 * Creates updated monthly and daily GCs
 * @param {string} did DID of PV System to update
 * @param {{gc: DailyGCSchema, vcUuid: string, date: string, fileName: string, entryIndex: number}[]} dailyGcObjs Daily GCs and its respective VC uuid
 * @param {Web3Storage} web3Storage Web3Storage class
 * @param {string} type Certificate's new status (Active, Revoked)
 * @param {IndexSchema} index Web3 Renewables Index
 * @returns {{dailyGcCid: string, monthlyGcCid: string, dailyGCsMetadata: {vcUuid: string, fileName: string, date: string}, monthlyDailyGCsMetadata: {vcUuid: string, fileName: string, date: {year: string, month: string, day: string}}}[]} 
 */
const updateGCs = async (did, dailyGcObjs, web3Storage, type, index) => {
  const dataToStorageMapping = obj => { return { data: obj.gc, fileName: obj.fileName } }
  // Update past daily GCs with new status
  const updated = updateDailyGCs(dailyGcObjs, type)

  // Publish new Daily GCs
  const dailyGcCid = await putFiles(web3Storage, updated.map(dataToStorageMapping))

  // Update Monthly GCs
  const monthlyGCs = await getPastMonthlyGCs(did, index)

  // Update Monthly GCs with new status and daily CIDs
  const updatedMonthlyGCs = updateMonthlyGCs(monthlyGCs, dailyGcCid, type, updated.map(obj => obj.fileName))

  let monthlyGcCid;
  // Publish New Monthly CIDs
  if (updatedMonthlyGCs.length != 0) {
    monthlyGcCid = await putFiles(web3Storage, updatedMonthlyGCs.map(dataToStorageMapping))
  } else {
    monthlyGcCid = undefined
  }

  return {
    dailyGcsMetadata: updated.map(obj => { return { vcUuid: obj.vcUuid, date: obj.date, fileName: obj.fileName, did: did, dailyGcCid: dailyGcCid, entryIndex: obj.entryIndex } }),
    monthlyGcsMetadata: updatedMonthlyGCs.map(obj => { return { vcUuid: obj.vcUuid, date: obj.date, fileName: obj.fileName, did: did, monthlyGcCid: monthlyGcCid, entryIndex: obj.entryIndex } })
  }
}

/**
 * Gets the past daily GCs from the Web3 Renewables Index
 * @param {string} did PV System DID
 * @param {IndexGCSchema} index Index File (For more information see index_schema.json)
 * @returns {{gc: MonthlyGCSchema, vcUuid: string, date: {year: string, month: string}, fileName: string, entryIndex: number}[]}
 */
const getPastMonthlyGCs = async (did, index) => {
  if (!index || !index.pvSystems || !index.pvSystems[did] || !index.pvSystems[did].reporting_dates) return []
  if (!index.pvSystems[did].reporting_dates.length) return []

  // Get the dates the pv System has reported into
  const dates = index.pvSystems[did].reporting_dates.map(date => getYearMonthDayUtc(date))

  // Filter by unique values get only one instance of a month
  const uniqueMonths = getUniqueMonths(dates)

  // For each month, get the gc
  const gcs = await Promise.all(uniqueMonths.map(async obj => {
    if (!index.monthly[obj.year][obj.month]) {
      console.log(">>> Cannot get past monthly GCs as no entries for " + `Year: ${obj.year} Month: ${obj.month}`)
      return
    }
    const metaDataIndex = index.monthly[obj.year][obj.month].entries.findIndex(entry => entry.pvSystemDID === did)
    if (metaDataIndex == -1) return
    const metadata = index.monthly[obj.year][obj.month].entries[metaDataIndex]
    const res = await fetch(`https://${metadata.cid}.ipfs.w3s.link/${metadata.fileName}`)
    if (!res.ok) return
    return { gc: await res.json(), vcUuid: metadata.vcUuid, date: obj, fileName: metadata.fileName, entryIndex: metaDataIndex }
  }))

  return gcs.filter(obj => obj !== undefined)
}

/**
 * Udpdates the Daily GCs with a new status
 * @param {{gc: MonthlyGCSchema, vcUuid: string, date: string, fileName: string, entryIndex: number}[]} gcObjs Granular Certificate Objects
 * @param {string} status certificate status
 * @returns 
 */
const updateDailyGCs = (gcObjs, status) => {
  return gcObjs.map(({ gc, vcUuid, date, fileName, entryIndex }) => {
    gc.certificate_status = status
    return { gc: gc, vcUuid: vcUuid, date: date, fileName: fileName, entryIndex: entryIndex }
  })
}

/**
 * Updates the entries in the 'Monthly' section with the new cid's / status of a GC
 * @param {{gc: MonthlyGCSchema, vcUuid: string, date: {year: string, month: string, day: string}, fileName: string, entryIndex: number}[]} gcObjs Granular Certificate Objects
 * @param {string} dailyCid CID of the Recently Published Daily GCs
 * @param {string} status Status to set the entries in the Monthly report
 * @param {string[]} fileNamesToUpdate FileNames of DailyGC entries to only update
 * @returns 
 */
const updateMonthlyGCs = (gcObjs, dailyCid, status, fileNamesToUpdate) => {
  return gcObjs.map(({ gc, vcUuid, date, fileName, entryIndex }) => {
    let newGc = JSON.parse(JSON.stringify(gc))
    newGc.certificate_status = status
    newGc.generation_data = gc.generation_data.map(data => {
      if (fileNamesToUpdate.includes(data.fileName)) {
        data.cid = dailyCid
      }
      return data
    })
    return { gc: newGc, vcUuid: vcUuid, date: date, fileName: fileName, entryIndex: entryIndex }
  })
}

/**
 * Updates the provided index with the new data
 * @param {IndexSchema} index JSON Object to put updates into
 * @param {{did: string, updateMrets: boolean, status: string, updateable: {dailyGcsMetadata: {vcUuid: string, fileName: string, date: string, did: string, dailyGcCid: string, entryIndex: number}[], monthlyGcsMetadata: {vcUuid: string, monthlyGcCid: string, did: string, fileName: string, entryIndex: number, date: {year: string, month: string, day: string}}[]}}[]} updates Updated Values
 */
const updateIndex = (index, updates) => {
  let tempIndex = index
  // For each PV System that needs to be updated
  updates.forEach(update => {
    if (!update.updateable) return
    // Update All Daily GCs
    update.updateable.dailyGcsMetadata.forEach(metadata => {
      tempIndex.daily[metadata.date].entries[metadata.entryIndex].cid = metadata.dailyGcCid
    })
    // Update All Monthly GCs
    update.updateable.monthlyGcsMetadata.forEach(metadata => {
      tempIndex.monthly[metadata.date.year][metadata.date.month].entries[metadata.entryIndex].cid = metadata.monthlyGcCid
    })
  })
  return tempIndex
}

export {
  monthlyWorkFlow,
  getEntriesFromIndexByMonth,
  organizeFilesToPVSystems,
  checkAndUpdatePastGCs,
  getPastDailyGCs,
  getDIDsFromIndex,
  updateDailyGCs,
  updateMonthlyGCs,
  updateIndex,
  getIndexFile
}