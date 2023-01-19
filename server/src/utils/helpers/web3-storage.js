import fetch from "node-fetch";
import { File, Web3Storage } from 'web3.storage'
import { WEB3_STORAGE_PIN_URL } from "../../config.js"
import getInfuraIPFSConfig from "../vcs/infura_config.js";

/**
 * Saves GC and Inverter Data to IPFS
 * @param {object} gcs Array of GC Data from #createGCs()
 * @param {Web3Storage} web3Storage Web3Storage Object to interact with IPFS
 */
const saveRawAndGCs = async (gcs, web3Storage) => {
  try {
    const rawInverterCID = await putFiles(web3Storage, gcs.map(all => all.inverter))
    console.log(`>>> Raw Inverter Data saved to ${rawInverterCID}`)
  
    // Save GC to Web3.Storage
    console.log(">>> Saving GCs to Web3.storage")
    const gcFilesCID = await putFiles(web3Storage, gcs.map(all => all.gc))
    console.log(`>>> GC Data saved to ${gcFilesCID}`)
  
    return {
      rawInverterCID,
      gcFilesCID
    }
  } catch(e) {
    console.log(e.message)
    return
  }
}

/**
 * Saves files onto Web3Storage
 * @param {Web3Storage} web3Storage Web3Storage Object to interact with IPFS
 * @param {object[]} jsonObject Array of JSON Objects to save
 */
const putFiles = async (web3Storage, jsonObjects) => {
  return await web3Storage.put(makeFileObjects(jsonObjects))
}

/**
 * Pins CIDs on Web3Storage to ensure they are not deleted
 * @param {string[]} cids Web3Storage Object to interact with IPFS
 */
const pinFiles = async (cids, web3StorageToken) => {
  const req = {
    method: "POST",
    headers: {
      'Accept': "*/*",
      'Authorization': `Bearer ${web3StorageToken}`,
      'Content-Type': "application/json"
    }
  }

  console.log(">>> Pinning CIDs...")
  await Promise.all(cids.map(async cid =>  {
    const response = await fetch(WEB3_STORAGE_PIN_URL, { ...req, d: JSON.stringify({ cid: cid }) })
    if(response.status != 200) console.log(`>>> Could not pin -> ${cid}`)
    console.log(`>>> Pinned -> ${cid}`)
  }))
  console.log(">>> Pinned CIDs")
}

/**
 * Turn JSON Objects into Web3Storage Files.
 * @param {{fileName: string, data: object}[]} objects 
 * @returns {File[]}
*/
const makeFileObjects = (objects) => {
  return objects.map(obj => {
    const buffer = Buffer.from(JSON.stringify(obj.data))
    return new File([buffer], `${obj.fileName}`)
  })
}

const fetchFileList = async (cid) => {
  const files = await fetch("https://ipfs.infura.io:5001/api/v0/dag/get?arg=" + cid, {
    method: "POST",
    headers: getInfuraIPFSConfig().headers
  })
  if(!files.ok) {
    console.log(`[${files.status}] ${files.statusText}`)
    return
  }

  return (await files.json())["Links"].map(obj => {return {name: obj["Name"], hash: obj["Hash"]["/"]}})
}

export {
  saveRawAndGCs,
  putFiles,
  pinFiles,
  fetchFileList
}