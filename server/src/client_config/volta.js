const VOLTA_RPC_URL = "https://volta-rpc.energyweb.org/";
const VOLTA_CHAIN_ID = 73799;
const VOLTA_BLOCK_EXPLORER_URL = "https://volta-explorer.energyweb.org";
const VOLTA_CACHE_SERVER_URL = "https://identitycache-dev.energyweb.org/v1";

const voltaChain = {
  id: VOLTA_CHAIN_ID,
  name: "Volta",
  network: "volta",
  rpcUrls: {
    default: VOLTA_RPC_URL,
  },
  blockExplorers: {
    default: { url: VOLTA_BLOCK_EXPLORER_URL },
  },
  testnet: true,
  didPrefix: "did:ethr:volta:"
};

const VOLTA_CONFIG = {
  VOLTA_RPC_URL,
  VOLTA_CHAIN_ID,
  VOLTA_BLOCK_EXPLORER_URL,
  VOLTA_CACHE_SERVER_URL,
  voltaChain,
}

export default VOLTA_CONFIG