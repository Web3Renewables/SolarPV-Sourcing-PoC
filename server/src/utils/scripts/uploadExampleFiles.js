import { readFile } from 'fs/promises';
import { Web3Storage } from 'web3.storage'
import { saveRawAndGCs } from '../helpers/web3-storage.js';

const uploadExampleFiles = async () => {

  // const data = JSON.parse(
  //   await readFile(
  //     new URL('../examples/createGCOutputExample.json', import.meta.url)
  //   )
  // )
  // const web3Storage = new Web3Storage({ token: process.env.WEB3_STORAGE_API_KEY })
  // await saveRawAndGCs(data, web3Storage)
}