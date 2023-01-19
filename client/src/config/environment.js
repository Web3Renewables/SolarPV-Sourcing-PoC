import { voltaChain } from "./volta"
import { energyWebChain } from "./ewc"
import { ENERGY_WEB_CHAIN_ID, ENERGY_WEB_RPC_URL, ENERGY_WEB_CACHE_SERVER_URL } from "@config/ewc";
import { VOLTA_CHAIN_ID, VOLTA_RPC_URL, VOLTA_CACHE_SERVER_URL } from "@config/volta";

const production = process.env.NEXT_PUBLIC_PRODUCTION === "true" 

const didPrefix = production ? energyWebChain.didPrefix : voltaChain.didPrefix
const IPNSAddress = production ? process.env.NEXT_PUBLIC_PRODUCTION_INDEX_ADDRESS : process.env.NEXT_PUBLIC_DEVELOPMENT_INDEX_ADDRESS
const indexFileName = process.env.NEXT_PUBLIC_INDEX_FILE_NAME
const web3NamePrivateKey = production ? process.env.PRODUCTION_INDEX_PRIVATE_KEY : process.env.DEVELOPMENT_INDEX_PRIVATE_KEY
const chainConfig = production ? {
    enrolmentUrl: "",
    cacheServerUrl: ENERGY_WEB_CACHE_SERVER_URL,
    chainRpcUrl: ENERGY_WEB_RPC_URL,
    chainId: ENERGY_WEB_CHAIN_ID,
  } : {
    enrolmentUrl: "",
    cacheServerUrl: VOLTA_CACHE_SERVER_URL,
    chainRpcUrl: VOLTA_RPC_URL,
    chainId: VOLTA_CHAIN_ID,
  }

export {
    didPrefix,
    IPNSAddress,
    indexFileName,
    production,
    web3NamePrivateKey,
    chainConfig
}