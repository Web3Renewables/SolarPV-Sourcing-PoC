import { ENERGY_WEB_CHAIN_ID, ENERGY_WEB_RPC_URL, ENERGY_WEB_CACHE_SERVER_URL } from "@config/ewc";
import { VOLTA_CHAIN_ID, VOLTA_RPC_URL, VOLTA_CACHE_SERVER_URL } from "@config/volta";

export const iamClientLibConfigVolta = {
  enrolmentUrl: "",
  cacheServerUrl: VOLTA_CACHE_SERVER_URL,
  chainRpcUrl: VOLTA_RPC_URL,
  chainId: VOLTA_CHAIN_ID,
};

export const iamClientLibConfigEnergyWebChain = {
  enrolmentUrl: "",
  cacheServerUrl: ENERGY_WEB_CACHE_SERVER_URL,
  chainRpcUrl: ENERGY_WEB_RPC_URL,
  chainId: ENERGY_WEB_CHAIN_ID,
};

export const PROVIDER_TYPE = "ProviderType";
