import * as Name from 'w3name'
import { Web3Storage } from "web3.storage"
import { getIamClient } from "../utils/helpers/iam-client.js"
import { WALLET_PRIVATE_KEY, RPC_URL, CHAIN_ID, ENERGY_WEB_CACHE_SERVER_URL, getInfuraIPFSConfig } from "./constants.js"
import { createInitialIndexFile } from "../utils/helpers/web3-name.js"

// Create the initial file
const createInitialIndex = async () => {
  console.log(">>> Connecting to EWC Test Network")
  const iamClient = await getIamClient(RPC_URL, CHAIN_ID, ENERGY_WEB_CACHE_SERVER_URL, WALLET_PRIVATE_KEY, getInfuraIPFSConfig())

  if (!iamClient.domainsService || !iamClient.assetsService || !iamClient.claimsService || !iamClient.didRegistry) {
    console.log(">>> Could not login to network")
    return
  }

  const web3Token = process.env.WEB3_STORAGE_API_KEY
  const web3Storage = new Web3Storage({ token: web3Token })
  const newIndexCID = await createInitialIndexFile(web3Storage, process.env.INDEX_FILE_NAME, iamClient.did, true)
  console.log(`>>> Base CID = ${newIndexCID}`)
}

const readIndex = async () => {
  const web3Token = process.env.WEB3_STORAGE_API_KEY
  const ipnsAddress = process.env.PRODUCTION_INDEX_ADDRESS
  const ipnsPrivateKey = process.env.PRODUCTION_INDEX_PRIVATE_KEY

  const name = Name.parse(ipnsAddress)
  const revision = await Name.resolve(name)
  console.log('Resolved value:', revision.value)

  const web3Storage = new Web3Storage({ token: web3Token })
  const cid = revision.value.slice(6)
  const res = await web3Storage.get(cid)
  const files = await res.files()

  if (!res.ok) { reject(`failed to get ${oldCid}`) }
  const original = files.find(file => file.name === process.env.INDEX_FILE_NAME)
  if (!original) reject("Index file does not exist, please create it first!")
  const text = await original.text()
  const json = JSON.parse(text)
  console.log(json)
}

createInitialIndex()