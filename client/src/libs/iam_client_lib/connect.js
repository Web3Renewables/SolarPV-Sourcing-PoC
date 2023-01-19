// Setup iam-client-lib
// https://energy-web-foundation-iam-client-lib.readthedocs-hosted.com/#initialization
// Ex. https://github.com/energywebfoundation/switchboard-dapp/blob/develop/src/app/shared/services/iam.service.ts

import { chainConfig as config } from "@config/environment";
import {
  ProviderType,
  initWithMetamask,
  setCacheConfig,
  setChainConfig,
  ProviderEvent,
  PUBLIC_KEY,
  IS_ETH_SIGNER
} from "iam-client-lib";
import { PROVIDER_TYPE } from "./constants";
import disconnect from "./disconnect";

import { getInfuraIPFSConfig } from './utils/infura_config'
import { isSessionActive } from "./utils/session";

const { chainRpcUrl, chainId, cacheServerUrl } = config;

setChainConfig(chainId, { rpcUrl: chainRpcUrl });

try {
  setCacheConfig(chainId, { url: cacheServerUrl });
} catch (e) {
  console.log("should reload page")
  console.log(e)
}


async function initSignerService(providerType) {
  switch (providerType) {
    case ProviderType.MetaMask:
      return initWithMetamask();
  }
}

const logout = async (signerService) => {
  const cacheNotEmpty = localStorage.getItem(PROVIDER_TYPE) !== null && localStorage.getItem(PUBLIC_KEY) !== null && localStorage.getItem(IS_ETH_SIGNER) !== null
  if (signerService !== undefined) {
    await signerService.closeConnection()
  }
  if (isSessionActive && cacheNotEmpty) {
    await disconnect(signerService)
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });
    return res.ok
  } else {
    return false
  }
}

const connect = async (providerType = ProviderType.MetaMask) => {
  const { signerService, connectToCacheServer } = await initSignerService(providerType);
  const did = signerService.did;
  const address = signerService.address;

  signerService.on(ProviderEvent.AccountChanged, async () => {
    const status = await logout(signerService)
    if(status) {
      window.location ="/login"
    }
    
  })

  signerService.on(ProviderEvent.NetworkChanged, async () => {
    const status = await logout(signerService)
    if(status) {
      window.location = "/login"
    }
    
  })

  const { connectToDidRegistry, domainsService, assetsService } = await connectToCacheServer();

  const { claimsService, didRegistry } = await connectToDidRegistry(getInfuraIPFSConfig());

  return {
    did,
    address,
    signerService,
    domainsService,
    claimsService,
    didRegistry,
    assetsService
  }
};

export default connect;
