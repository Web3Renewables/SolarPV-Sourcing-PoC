import { storeAndUpdateIndex } from "./helpers/web3-name.js"
import { getDIDsFromIndex, getIndexFile, checkAndUpdatePastGCs } from "./monthly_aggregate.js"

/**
 * Checks all past GCs against the current system's status. Then updates past GCs with new status if necessary
 * @param {Web3Storage} web3Storage Web3Storage Class Instance
 * @param {string} walletPrivateKey Private Key of VC issuer
 * @param {string} indexFileName Filename of Web3 Renewables index 
 * @param {string} ipnsAddress IPNS Address
 * @param {string} ipnsPrivateKey IPNS Private Key to update pointer
 * @param {boolean} production Is this a production run
 * @returns 
 */
const checkAndUpdatePastGCsWorkflow = async (
  web3Storage,
  walletPrivateKey,
  indexFileName,
  ipnsAddress,
  ipnsPrivateKey,
  production
) => {
  console.log(">>> Getting Index File...")
  // Get the index file
  const file = await getIndexFile(ipnsAddress, indexFileName, web3Storage)
  let originalIndex = JSON.parse(await file.text())

  // Check if any DIDs have had their PV System role change, if so, update the past GCs
  const dids = getDIDsFromIndex(originalIndex)
  // If no DIDs, no system has had any daily reports
  if (dids.length == 0) {
    console.log(">>> No DIDs reported for in the daily functions for the month.")
    return false
  }

  console.log(">>> Checking if any PV Systems have had role changes Changed...")
  const { index, wasIndexUpdated } = await checkAndUpdatePastGCs(dids, originalIndex, web3Storage, walletPrivateKey, walletPrivateKey, production)

  if(wasIndexUpdated) {
    console.log(">>> Storing new index file and upating IPNS...")
    await storeAndUpdateIndex(web3Storage, index, indexFileName, ipnsPrivateKey)
    console.log(">>> Finsihed checking past GCs workflow.")
    return true
  } else {
    console.log(">>> Index does not need to be updated.")
    console.log(">>> Finsihed checking past GCs workflow.")
    return false
  }
}

export {
  checkAndUpdatePastGCsWorkflow
}