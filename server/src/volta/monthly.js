import { monthlyWorkFlow } from '../utils/monthly_aggregate.js'
import { Web3Storage } from "web3.storage"

const voltaMonthly = async () => {
  const web3StorageToken = process.env.WEB3_STORAGE_API_KEY

  console.log(">>> Executing workflow...")
  try {
    return await monthlyWorkFlow(
      process.env.DEVELOPMENT_INDEX_ADDRESS,
      process.env.DEVELOPMENT_INDEX_PRIVATE_KEY,
      new Web3Storage({ token: web3StorageToken }),
      process.env.INDEX_FILE_NAME, 
      false,
      process.env.WALLET_PRIVATE_KEY,
    )
  } catch (e) {
    console.log(">>> Could not execute monthly function.")
    console.log(e.message)
    return
  }
}

export default voltaMonthly