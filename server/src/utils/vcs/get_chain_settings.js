import didEhtrResolverPkg from '@ew-did-registry/did-ethr-resolver';
import didResolverInterface from '@ew-did-registry/did-resolver-interface'
const { ProviderTypes } = didResolverInterface
const { VoltaAddress1056, ethrReg } = didEhtrResolverPkg;

const NETWORK_URL = 'https://volta-rpc.energyweb.org/';

const providerSettings = {
  uriOrInfo: NETWORK_URL,
  type: ProviderTypes.HTTP,
};

// construct the IResolverSettings
const resolverSettings = {
  providerSettings,
  abi: ethrReg.abi,
  address: VoltaAddress1056
};

export {
  providerSettings,
  resolverSettings,
  NETWORK_URL
}