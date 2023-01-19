import { Web3Storage } from "web3.storage"
import { updateDailyIndex, updateIPNSPointer, createInitialIndexFile, getInitialFormat } from "../helpers/web3-name.js"
import { putFiles, saveRawAndGCs } from "..//helpers/web3-storage.js"
import { readFileAsJSON } from "../utils.js"

const updateIndexTest = async () => {
  const web3Token = process.env.WEB3_STORAGE_API_KEY
  const ipnsAddress = process.env.DEVELOPMENT_INDEX_ADDRESS
  const ipnsPrivateKey = process.env.DEVELOPMENT_INDEX_PRIVATE_KEY
  const web3Storage = new Web3Storage({ token: web3Token })

  const gcs = readFileAsJSON("./src/mocks/gc.json")
  const rawCids = await saveRawAndGCs(gcs, web3Storage)
  const {rawInverterCID, gcFilesCID} = rawCids

  const testCid = await updateDailyIndex(web3Storage, ipnsPrivateKey, ipnsAddress, "daily_index.json", gcFilesCID, gcs, "2022-08-30")
  console.log(testCid)
}

const resetIndexToOriginalDocument = async () => {
  const ipnsPrivateKey = process.env.DEVELOPMENT_INDEX_PRIVATE_KEY
  const cid = await updateIPNSPointer("bafybeiabnfstdmfmz4fjjf3e5lit5eyglya6yqcsnnyijrdsxg6cwxhmqe", ipnsPrivateKey)
}

const addOriginalDocumentBack = async () => {
  const web3Token = process.env.WEB3_STORAGE_API_KEY
  const ipnsAddress = process.env.DEVELOPMENT_INDEX_ADDRESS
  const ipnsPrivateKey = process.env.DEVELOPMENT_INDEX_PRIVATE_KEY
  const web3Storage = new Web3Storage({ token: web3Token })

  const indexJson = getInitialFormat("did:ethr:volta:0x224CbA4ae8D27Ba69793CFeFe042682B81eA77c5", false)
  const cid = await putFiles(web3Storage, [{fileName: process.env.INDEX_FILE_NAME, data: indexJson}])
  await updateIPNSPointer(cid, ipnsPrivateKey)
}

addOriginalDocumentBack()