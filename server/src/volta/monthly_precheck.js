import { Web3Storage } from "web3.storage"
import { checkAndUpdatePastGCsWorkflow } from '../utils/monthly_check_update.js'

const voltaMonthlyPrecheck = async () => {
  const web3StorageToken = process.env.WEB3_STORAGE_API_KEY

  console.log(">>> (Development) Executing Monthly Precheck Workflow...")
  try {
    return await checkAndUpdatePastGCsWorkflow(
      new Web3Storage({ token: web3StorageToken }),
      process.env.WALLET_PRIVATE_KEY,
      process.env.INDEX_FILE_NAME, 
      process.env.DEVELOPMENT_INDEX_ADDRESS,
      process.env.DEVELOPMENT_INDEX_PRIVATE_KEY,
      false
    )
  } catch (e) {
    console.log(">>> Could not execute monthly precheck function.")
    console.log(e.message)
    return
  }
}

export default voltaMonthlyPrecheck