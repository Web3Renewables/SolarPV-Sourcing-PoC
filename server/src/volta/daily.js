import { getIamClient } from "../utils/helpers/iam-client.js"
import { WALLET_PRIVATE_KEY, RPC_URL, CHAIN_ID, VOLTA_CACHE_SERVER_URL, getInfuraIPFSConfig, ORG_ELECTRICIAN_ROLE_NAMESPACE } from "./constants.js"
import { executeWorkflow } from "../utils/daily_aggregate.js"

const voltaDaily = async () => {
  const web3StorageToken = process.env.WEB3_STORAGE_API_KEY
  console.log(">>> Connecting to Volta Test Network")
  const iamClient = await getIamClient(RPC_URL, CHAIN_ID, VOLTA_CACHE_SERVER_URL, WALLET_PRIVATE_KEY, getInfuraIPFSConfig())

  if (!iamClient.domainsService || !iamClient.assetsService || !iamClient.claimsService || !iamClient.didRegistry) {
    console.log(">>> Could not login to network")
    return
  }

  const orgNamespace = `${process.env.NEXT_PUBLIC_SWITCHBOARD_ORG_NAME}.${process.env.NEXT_PUBLIC_SWITCHBOARD_ROOT_NAMESPACE}`

  console.log(">>> Executing workflow...")

  return await executeWorkflow(
    iamClient, 
    orgNamespace, 
    web3StorageToken,
    process.env.DECRYPTION_KEY, 
    false, 
    ORG_ELECTRICIAN_ROLE_NAMESPACE,
    process.env.DEVELOPMENT_INDEX_PRIVATE_KEY,
    process.env.DEVELOPMENT_INDEX_ADDRESS,
    process.env.INDEX_FILE_NAME
  )  
}

export default voltaDaily