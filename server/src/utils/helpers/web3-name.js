import * as Name from 'w3name'
import bs58 from 'bs58'
import { fetchFileList, putFiles } from './web3-storage.js'
import fetch from 'node-fetch'

const createInitialIndexFile = async (web3storage, originalFileName, web3RenewablesDID, production) => {
  return new Promise((resolve, reject) => {
    const indexJsonObject = getInitialFormat(web3RenewablesDID, production)

    putFiles(web3storage, [{ fileName: originalFileName, data: indexJsonObject }])
      .then((value) => {
        if (!value) {
          reject("Could not upload index file")
        } else {
          createInitialIndex(value)
            .then(resolve(value))
            .catch((reason) => reject(reason))
        }
      })
      .catch((reason) => reject(reason))
  })
}

const updateDailyIndex = async (web3storage, privateKey, nameAddress, originalFileName, newCid, gcs, yesterday, rawInverterCid) => {
  // Get/Parse the old file
  const revision = await parseIndex(nameAddress)
  const oldCid = revision.value.slice(6)

  const res = await fetch(`https://${oldCid}.ipfs.w3s.link/${originalFileName}`)
  if (!res.ok) throw new Error("Index file does not exist, please create it first!")

  const data = await res.json()

  // Add the new data to the file
  const newData = updateDailyObject(data, yesterday.startDateUtc.toISO(), newCid, gcs, rawInverterCid)

  // Save the data onto Web3 Storage and get CID (no directory wrapping)
  const newIndexFileCID = await putFiles(web3storage, [{ fileName: originalFileName, data: newData }])

  if (!newIndexFileCID) throw new Error("Could not upload new index file")

  await updateIPNSPointer(newIndexFileCID, privateKey)

  return newIndexFileCID
}

/**
 * Adds the new Monthly GCs to the Web3 Renewables Index
 * @param {Web3Storage} web3storage 
 * @param {string} privateKey 
 * @param {string} nameAddress 
 * @param {string} originalFileName 
 * @param {string} monthlyFilesCID 
 * @param {{fileName: string, cid: string, indexData: IndexDailyMetadataSchema, data: MonthlyGCSchema, vcUuid: string}[]} vcs Monthly GCs and their VC Uuid
 * @param {string} year 
 * @param {string} month 
 * @returns 
 */
const updateMonthlyIndex = async (web3storage, privateKey, nameAddress, originalFileName, monthlyFilesCID, vcs, year, month) => {
  return new Promise((resolve, reject) => {
    try {
      // Get/Parse the old file
      parseIndex(nameAddress).then((revision) => {
        const oldCid = revision.value.slice(6)
        web3storage.get(oldCid).then((res) => {
          if (!res.ok) { reject(`failed to get ${oldCid}`) }
          res.files().then(files => {
            const original = files.find(file => file.name === originalFileName)
            if (!original) reject("Index file does not exist, please create it first!")

            original.text().then(jsonString => {
              let data = JSON.parse(jsonString)
              // Add the new data to the file
              const newData = updateMonthlyOjbect(data, year, month, monthlyFilesCID, vcs)

              // Save the data onto Web3 Storage and get CID (no directory wrapping)
              putFiles(web3storage, [{ fileName: originalFileName, data: newData }]).then((newIndexFileCID) => {
                if (!newIndexFileCID) reject("Could not upload new index file")
                updateIPNSPointer(newIndexFileCID, privateKey).then(() => {
                  // Return CID to be pinned
                  resolve(newIndexFileCID);
                })
              })
            })
          })
        })
      })
    } catch (e) {
      console.log(e.message)
      reject(e.message)
    }
  })
}

/**
 * Maps a CID to a W3Name so that its contents are mutable. Make sure the CID is not wrapped in a directory
 * @param {string} cid CID of the File to be mapped to W3Name.
 */
const createInitialIndex = async (cid) => {
  const name = await Name.create()
  console.log(`>>> W3Name Private Key = ${bs58.encode(name.key.bytes)}`)
  console.log(`>>> W3Name = ${name}`)
  const value = `/ipfs/${cid}`
  const revision = await Name.v0(name, value)
  await Name.publish(revision, name.key)
}

/**
 * Maps a CID to a W3Name so that its contents are mutable. Make sure the CID is not wrapped in a directory
 * @param {string} cid CID of the updated File to be mapped to W3Name.
 * @param {string} privKey Private Key of the W3Name
 */
const updateIPNSPointer = async (cid, privKey) => {
  const nextValue = `/ipfs/${cid}`
  const name = await Name.from(bs58.decode(privKey))
  const revision = await Name.resolve(name)
  const nextRevision = await Name.increment(revision, nextValue)
  await Name.publish(nextRevision, name.key)
}

/**
 * Returns the data mapped to the W3Name Address
 * @param {string} nameAddress W3Name Address to parse the data
 * @returns 
 */
const parseIndex = async (nameAddress) => {
  const name = Name.parse(nameAddress)
  return await Name.resolve(name)
}

/**
 * Returns the formatted initial file in the Web3 Renewables Index
 * @param {string} web3RenewablesDID Web3 Renewables Owner DID
 * @param {boolean} production Is Production Environment
 * @returns 
 */
const getInitialFormat = (web3RenewablesDID, production) => {
  return {
    metadata: {
      title: "Web3 Renewables Granular Certificate Index",
      description: "Index describing the location of all GCs reporting into the Web3 Renewables Index",
      document_type: !production ? "Development" : "Production",
      web3_renewables_did: web3RenewablesDID,
      version: 1,
    },
    pvSystems: {},
    daily: {},
    monthly: {}
  }
}

/**
 * Updates an existing Web3 Renewables Index with New Daily Data
 * @param {Web3RenewablesIndex} dataObject Web3 Renewables Index Object (check schemas for definition)
 * @param {string} date Current Date in ISO 8601 UTC
 * @param {string} newCid New CID of Index File to replace old on in IPNS Record
 * @param {GCSchema[]} gcs Array of Daily Granular Certificates (check schemas for definitions)
 * @param {string} rawInverterCID Raw Inverter CID
 * @returns 
 */
const updateDailyObject = (dataObject, date, newCid, gcs, rawInverterCID) => {
  let data = dataObject
  data.daily[date] = {
    entries: gcs.map(obj => {

      return {
        rawInverterCID: rawInverterCID,
        vcUuid: obj.vcUuid,
        cid: newCid,
        fileName: obj.data.gc.fileName,
        pvSystemDID: obj.data.gc.data.production_device_identifier,
      }
    })
  }

  if (!data.pvSystems) {
    data.pvSystems = {}
  }

  gcs.forEach(obj => {
    // Gets the dates the DID has reported into, only pushes new date if not already exist
    let pvSystemObject = (!data.pvSystems[obj.data.gc.data.production_device_identifier]) ? { reporting_dates: [], status: "Active" } : data.pvSystems[obj.data.gc.data.production_device_identifier]
    if (!pvSystemObject.reporting_dates) pvSystemObject.reporting_dates = []
    if (!pvSystemObject.status) pvSystemObject.status = "Active"

    let tempList = (!pvSystemObject.reporting_dates) ? [] : pvSystemObject.reporting_dates
    if (!tempList.includes(date)) {
      tempList.push(date)
      data.pvSystems[obj.data.gc.data.production_device_identifier] = { reporting_dates: tempList, status: pvSystemObject.status }
    }
  })
  return data
}

/**
 * Updates an existing Web3 Renewables Index with New Monthly Data
 * @param {Web3RenewablesIndex} dataObject Web3 Renewables Index Object (check schemas for definition)
 * @param {string} date Current Date in ISO 8601 UTC
 * @param {string} newCid New CID of Index File to replace old on in IPNS Record
 * @param {{fileName: string, cid: string, indexData: IndexDailyMetadataSchema, data: MonthlyGCSchema, vcUuid: string}[]} vcs Monthly GCs and their VC Uuid
 * @returns 
 */
const updateMonthlyOjbect = (dataObject, year, month, monthlyFilesCID, vcs) => {
  let data = dataObject
  if (!data.monthly[year]) data.monthly[year] = {}
  if (!data.monthly[year][month]) data.monthly[year][month] = {}
  data.monthly[year][month] = {
    entries: vcs.map(obj => {
      let pvSystemObject = (!data.pvSystems[obj.data.data.production_device_identifier]) ? { reporting_dates: [], status: "Active" } : data.pvSystems[obj.data.data.production_device_identifier]
      if (!pvSystemObject.status) pvSystemObject.status = "Active"
      return {
        vcUuid: obj.vcUuid,
        cid: monthlyFilesCID,
        fileName: obj.data.fileName,
        pvSystemDID: obj.data.data.production_device_identifier,
        certificateStatus: pvSystemObject.status
      }
    })
  }
  return data
}

/**
 * Store a new index file and update the IPNS address
 * @param {Web3Storage} web3Storage Web3Storage Object
 * @param {JSONObject} index JSON Object following Index JSON Schema
 * @param {string} fileName File name of index
 * @param {string} ipnsPrivKey Private key for W3Name
 */
const storeAndUpdateIndex = async (web3Storage, index, fileName, ipnsPrivKey) => {
  const cid = await putFiles(web3Storage, [{ fileName: fileName, data: index }])
  await updateIPNSPointer(cid, ipnsPrivKey)
}

export {
  parseIndex,
  createInitialIndexFile,
  updateDailyIndex,
  updateMonthlyIndex,
  updateIPNSPointer,
  getInitialFormat,
  updateDailyObject,
  updateMonthlyOjbect,
  storeAndUpdateIndex
}