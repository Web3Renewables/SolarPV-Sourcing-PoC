import { getVerifiedObjects } from "./users.js"

const verifyGranularCertificateVC = async (privateKey, didStore, chainName, claimUrl) => {
  const verifierObject = getVerifiedObjects(privateKey, didStore, chainName)
  return verifierObject.verifierClaims.verifyPublicProof(claimUrl)
}

export default verifyGranularCertificateVC