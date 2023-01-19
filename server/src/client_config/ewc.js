const ENERGY_WEB_RPC_URL = "https://rpc.energyweb.org/";
const ENERGY_WEB_CHAIN_ID = 246;
const ENERGY_WEB_BLOCK_EXPLORER_URL = "https://explorer.energyweb.org";
const ENERGY_WEB_CACHE_SERVER_URL = "https://identitycache.energyweb.org/v1/";

const energyWebChain = {
  id: ENERGY_WEB_CHAIN_ID,
  name: "EWC",
  network: "EWC",
  rpcUrls: {
    default: ENERGY_WEB_RPC_URL,
  },
  blockExplorers: {
    default: { url: ENERGY_WEB_BLOCK_EXPLORER_URL },
  },
  testnet: false,
  didPrefix: "did:ethr:ewc:"
};

const EWC_CONFIG = {
  ENERGY_WEB_RPC_URL,
  ENERGY_WEB_CHAIN_ID,
  ENERGY_WEB_BLOCK_EXPLORER_URL,
  ENERGY_WEB_CACHE_SERVER_URL,
  energyWebChain,
}

export default EWC_CONFIG