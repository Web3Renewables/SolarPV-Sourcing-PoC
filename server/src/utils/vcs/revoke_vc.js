import revokactionPkg from '@ew-did-registry/revocation';
import didRegistryClaimsPkg from '@ew-did-registry/claims'
import ethers from 'ethers'
const { CredentialRevocation } = revokactionPkg
const { utils } = ethers
const offChainContractAddress = "0x4BfA9Bd28Bdb1D62b737223b50FE41C03BdC7973"

/**
 * Revokes an off-chain verifiable credential
 * @param {EWSigner} revoker Revoking Account
 * @param {string} credential JWT Issued Token
 */
const revokeGranularCertificateVC = async (revoker, credential) => {
  const credRegistry = new CredentialRevocation(revoker, offChainContractAddress)
  return credRegistry.revokeCredential(credential)
}

/**
 * Retrieves the wallet addresses that revoked the specific credential
 * @param {EWSigner} revoker Revoking Account
 * @param {string} credential JWT Issued Token
 */
const getRevokations = async (revoker, credential) => {
  const credRegistry = new CredentialRevocation(revoker, offChainContractAddress)
  const credentialHash = utils.keccak256(utils.toUtf8Bytes(credential));
  const result = await credRegistry._revocationRegistry.getRevocations(
    credentialHash
  );
  const { 0: revokers, 1: timeStamps } = result;
  const revokedTimeStamp = [];
  for (let i = 0; i <= timeStamps.length; i++) {
    const revTimestampInt = parseInt(timeStamps[i]?._hex, 16)
    if(!isNaN(revTimestampInt)) {
      revokedTimeStamp[i] = (revTimestampInt).toString();
    }
  }
  return [revokers, revokedTimeStamp];
}

export {
  revokeGranularCertificateVC,
  getRevokations
}