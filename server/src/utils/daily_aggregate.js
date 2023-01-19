import admin from 'firebase-admin'
import { Web3Storage } from 'web3.storage'
import { pinFiles, saveRawAndGCs } from "./helpers/web3-storage.js"
import { loginWattTime } from "./helpers/watt-time.js"
import { validClaims } from "./helpers/iam-client.js"
import { createGCs } from "./mappers/create-gc.js"
import { AssetsService, ClaimsService, DidRegistry, DomainsService } from 'iam-client-lib'
import { updateDailyIndex } from './helpers/web3-name.js'
import { yesterday as yesterdayObj } from './utils.js'
import { issueBatchDailyVCs } from './vcs/create_vc.js'
import { getAllPVSystems } from './helpers/firebase.js'

/**
 * Calls all required functions to get all pv system information and verify it, collect inverter and WattTime data, create GCs, then post files to Web3.Storage
 * @param {{domainsService: DomainsService, assetsService: AssetsService, claimsService: ClaimsService, didRegistry: DidRegistry, did: string}} iamClient Object to interact with the energy web chain or volta
 * @param {string} orgNamespace The Root org namespace to collect the applications from
 * @param {string} web3StorageToken The Web3.Storage API Token
 * @param {string} decodeKey Private Server Key used to decode encrypted data
 * @param {boolean} production Is this a production environment, (i.e., if EWC then true, if Volta then false)
 * @param {string} orgElectricianRoleNamespace Electrician role namespace in the organization
 * @param {string} ipnsPrivate IPNS Private key that allows the caller to update the index file
 * @param {string} ipnsAddress IPNS Address that points to the latest index file
 * @returns 
 */
const executeWorkflow = async (
  iamClient,
  orgNamespace,
  web3StorageToken,
  decodeKey,
  production,
  orgElectricianRoleNamespace,
  ipnsPrivateKey,
  ipnsAddress,
  indexFileName
) => {

  console.log(`>>> Connected to network as ${iamClient.did}`)
  console.log(`>>> Getting Valid Claims...`)

  const appsInfo = await validClaims(iamClient, orgNamespace, "pv-system", "electrician", orgElectricianRoleNamespace)

  const apps = await fetchEnctypedPVSystemData(appsInfo)
  console.log(apps)

  // check that there exists at least one project
  if (!apps.length) {
    console.log(">>> No PV Systems to create GCs from.")
    return false
  }
  console.log(">>> There exists claims to create GCs")

  // // Login to WattTime
  console.log(">>> Logging into WattTime...")
  const wattTimeToken = await loginWattTime()

  if (wattTimeToken === undefined) {
    console.log(">>> could not log into WattTime")
    return
  }
  console.log(">>> Logged into WattTime")

  const yesterday = yesterdayObj()

  return await aggregateData(
    iamClient,
    apps,
    wattTimeToken,
    web3StorageToken,
    decodeKey,
    production,
    yesterday,
    ipnsAddress,
    ipnsPrivateKey,
    indexFileName
  )
}

const aggregateData = async (iamClient, apps, wattTimeToken, web3StorageToken, decodeKey, production, yesterday, ipnsAddress, ipnsPrivateKey, indexFileName) => {
  //For each app
  console.log(">>> Creating GCs")
  const timestamp = new Date().toISOString()
  const gcs = await createGCs(apps, wattTimeToken, decodeKey, production, iamClient.did, yesterday, timestamp)

  const filtered = gcs.filter(obj => obj !== undefined)

  if (!filtered.length) {
    console.log(">>> After filtering, no GCs to upload")
    return false
  }
  console.log(filtered)
  const web3Storage = new Web3Storage({ token: web3StorageToken })
  // Saving RAW Inverter Data and GCs to Web3.Storage
  const cids = await saveRawAndGCs(filtered, web3Storage)
  if (!cids) return

  const { rawInverterCID, gcFilesCID } = cids

  console.log(">>> Issuing Batch of VCs...")
  const vcs = await issueBatchDailyVCs(decodeKey, decodeKey, gcFilesCID, filtered, production)

  console.log(">>> Updating IPNS File...")
  // Create the new index file from the old one
  const newDailyIndexFileCID = await updateDailyIndex(web3Storage, ipnsPrivateKey, ipnsAddress, indexFileName, gcFilesCID, vcs, yesterday, rawInverterCID)
  if (!newDailyIndexFileCID) {
    console.log(">>> Could not update IPNS")
  } else {
    console.log(">>> Updated IPNS")
  }

  // Pin Files
  console.log(">>> Pinning Files")
  await pinFiles([rawInverterCID, gcFilesCID, newDailyIndexFileCID], web3StorageToken)
  return true
}

const fetchEnctypedPVSystemData = async (appsInfo) => {
  const app = !admin.apps || !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_WORKER)),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  }) : admin.app();
  let db = admin.database(app)

  const pvSystemObject = await getAllPVSystems(db)
  await app.delete()

  return appsInfo.map((info) => {
    const system = pvSystemObject[info.app.id]
    if(!system || !system.pvSystem) return undefined

    return {...info, encryptedServer: system.pvSystem.privateData.server}
  }).filter(obj => obj !== undefined)
}

export {
  executeWorkflow,
  fetchEnctypedPVSystemData
}