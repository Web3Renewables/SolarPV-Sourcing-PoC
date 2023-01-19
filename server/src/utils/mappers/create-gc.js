import jwtDecode from "jwt-decode"
import CryptoJS from 'crypto-js'
import fetch from "node-fetch"
import { DateTime } from 'luxon'
import { mapToGCFormat, transformDataToEmissionsAvoided } from "../mappers/transformer.js"
import { getWattTimeData } from "../helpers/watt-time.js"
import { getInverterData, getInverterTimeZone } from "../helpers/inverter.js"

/**
 * Creates the Inverter and GC Files to be saved onto IPFS
 * @param {object[]} apps Array of objects from #validClaims
 * @param {string} wattTimeToken WattTime API Token from Login
 * @param {string} decodeKey Private server key to decode encrypted data
 * @param {boolean} production Is production environemt? (i.e., Running on Energy Web Chain then 'true', if Volta then 'false')
 * @param {string} web3reneablesDID DID of the Web3Rnewbales Owner
 * @param {{startDateUtc: DateTime, endDateUtc: DateTime, inverterDateISO: string}} yesterday
 * @param {string} timestamp Timestamp of GC Issuance in ISO 8601 UTC
 * @returns 
 */
const createGCs = async (apps, wattTimeToken, decodeKey, production, web3reneablesDID, yesterday, timestamp) => {
  return await Promise.all(apps.map(async data => {
    // Parse the pvSystemCreds to get the data object stored in the 'data' attribute
    try {
      console.log(">>> Attempting to parse pvSystemObject...")
      // Check if data is in subject field
      let dataSubjectField;
      if(data.pvSystemCreds.credential.payload.claimData.requestorFields !== undefined) {
        dataSubjectField = data.pvSystemCreds.credential.payload.claimData.requestorFields.find(obj => obj.key === 'data')
      } else if (data.pvSystemCreds.credential.payload.claimData.issuerFields !== undefined && data.pvSystemCreds.credential.payload.claimData.issuerFields.length !== 0) {
        // If not in subject field, check issuer field (development compatibility)
        dataSubjectField = data.pvSystemCreds.credential.payload.claimData.issuerFields.find(obj => obj.key === 'data')
      }

      // If it does not exist at all, return
      if (!dataSubjectField || !dataSubjectField.value) return

      let pvSystemData = JSON.parse(dataSubjectField.value)
      if (!pvSystemData) return

      // Get encrypted options and decrypt it
      console.log(">>> Decrypting cyphertext...")
      
      const key = CryptoJS.enc.Hex.parse(decodeKey)
      const ivWordArray = CryptoJS.enc.Hex.parse(data.encryptedServer.iv)

      const decrypted = JSON.parse(CryptoJS.AES.decrypt(data.encryptedServer.cipherText, key, { iv: ivWordArray }).toString(CryptoJS.enc.Utf8))
      if (!decrypted) return

      const {
        pv_system_api_key,
        pv_system_latitidue_of_production_device,
        pv_system_longitude_of_production_device
      } = decrypted
      if (!pv_system_api_key) return
      if (!pv_system_latitidue_of_production_device) return
      if (!pv_system_longitude_of_production_device) return

      pvSystemData.pv_system_latitidue_of_production_device = pv_system_latitidue_of_production_device
      pvSystemData.pv_system_longitude_of_production_device = pv_system_longitude_of_production_device

      console.log(">>> Getting inverter timezone...")
      const inverterTimezoneString = await getInverterTimeZone(pvSystemData.pv_system_site_number, pv_system_api_key)
      if (!inverterTimezoneString) return

      const wattTimeStartDate = yesterday.startDateUtc.setZone(inverterTimezoneString, { keepLocalTime: true })
      const wattTimeEndDate = yesterday.endDateUtc.setZone(inverterTimezoneString, { keepLocalTime: true })
      // Check that login is still valid, call wattTime API
      console.log(">>> Calling WattTime API for location...")
      const wattTimeData = await getWattTimeData(pvSystemData.pv_system_latitidue_of_production_device, pvSystemData.pv_system_longitude_of_production_device, wattTimeStartDate.toISO(), wattTimeEndDate.toISO(), wattTimeToken)
      if (!wattTimeData) return

      // Call inverter data information
      console.log(">>> Calling inverter API...")
      let inverterData;
      switch (pvSystemData.pv_system_meter_type) {
        case "solar_edge_inverter":
          inverterData = await getInverterData(pvSystemData.pv_system_site_number, yesterday.inverterDateISO, yesterday.inverterDateISO, 'HOUR', pv_system_api_key)
      }
      if (!inverterData) return

      // Format the Data into a GC
      console.log(">>> Formatting data into GC format")
      const generationData = transformDataToEmissionsAvoided(inverterData, wattTimeData, inverterTimezoneString)
      return {
        inverter: {
          fileName: `${yesterday.startDateUtc.toISO()}_${data.pvSystemCreds.did}_raw_inverter.json`,
          data: inverterData
        },
        gc: {
          fileName: `${yesterday.startDateUtc.toISO()}_${data.pvSystemCreds.did}_gc.json`,
          data: mapToGCFormat(
            generationData,
            generationData.values.reduce((accumulator, object) => {
              if (object.energy == null) {
                return accumulator + 0
              } else {
                return accumulator + object.energy
              }
            }, 0),
            generationData.values.reduce((accumulator, object) => { return accumulator + object.emissionsAvoided }, 0),
            data.pvSystemCreds.did,
            pvSystemData,
            web3reneablesDID,
            production,
            wattTimeStartDate.toUTC().toISO(),
            wattTimeEndDate.toUTC().toISO(),
            "Daily",
            timestamp,
            inverterTimezoneString,
            data.electriciansDids,
            data.installerDid
          )
        }
      }

    } catch (e) {
      console.log(`>>> Could not parse pvSystemDID Data: ${e.message}`)
      return
    }
  }))
}

export {
  createGCs
}