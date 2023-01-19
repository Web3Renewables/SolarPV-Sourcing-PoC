import didPkg from '@ew-did-registry/did';
import didEhtrResolverPkg from '@ew-did-registry/did-ethr-resolver';
import keysPkg from '@ew-did-registry/keys';
import didDocumentPkg from '@ew-did-registry/did-document'
import { providerSettings, resolverSettings } from './get_chain_settings.js';
const { Keys } = keysPkg;
const { Operator, EwSigner, getProvider } = didEhtrResolverPkg;
const { Methods } = didPkg
const { DIDDocumentFull } = didDocumentPkg


const resolveDID = async (privateKey, chainName) => {
  const keys = new Keys({ privateKey: privateKey });
  const address = keys.getAddress();
  const did = `did:${Methods.Erc1056}:${chainName}:${address}`;
  const signer = EwSigner.fromPrivateKey(keys.privateKey, providerSettings);
  const operator = new Operator(signer, resolverSettings);
  const document = new DIDDocumentFull(did, operator);
  return document
}

export {
  resolveDID
}