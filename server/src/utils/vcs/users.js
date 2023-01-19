import didPkg from '@ew-did-registry/did';
import didEhtrResolverPkg from '@ew-did-registry/did-ethr-resolver';
import keysPkg from '@ew-did-registry/keys';
import DIDRegistry from '@ew-did-registry/did-registry'
import { resolverSettings, providerSettings } from './get_chain_settings.js';
const { Keys } = keysPkg;
const { Operator, EwSigner } = didEhtrResolverPkg;
const { Methods } = didPkg


const getSubjectObjects = (privateKey, didStore, chainName) => {
  const userObject = getUserObject(privateKey, didStore, chainName)
  return {
    ...userObject,
    userClaims: userObject.userReg.claims.createClaimsUser()
  }
}

const getIssuerObjects = (privateKey, didStore, chainName) => {
  const userObject = getUserObject(privateKey, didStore, chainName)
  return {
    ...userObject,
    issuerClaims: userObject.userReg.claims.createClaimsIssuer()
  }
}

const getVerifiedObjects = (privateKey, didStore, chainName) => {
  const userObject = getUserObject(privateKey, didStore, chainName)
  return {
    ...userObject,
    verifierClaims: userObject.userReg.claims.createClaimsVerifier()
  }
}

const getUserObject = (privateKey, didStore, chainName) => {
  const keys = new Keys({ privateKey: privateKey });
  const address = keys.getAddress();
  const did = `did:${Methods.Erc1056}:${chainName}:${address}`;
  const user = EwSigner.fromPrivateKey(keys.privateKey, providerSettings);
  const operator = new Operator(user, resolverSettings);
  const userReg = new DIDRegistry.default(keys, did, operator, didStore, providerSettings);

  return {
    keys,
    address,
    did,
    user,
    operator,
    userReg
  }
}

export {
  getIssuerObjects,
  getSubjectObjects,
  getVerifiedObjects
}