import { createGranularCertificateVC, resolveDID, getRevokations, revokeGranularCertificateVC, verifyGranularCertificateVC} from "../vcs/index.js"
import didIpfsStorePkg from '@ew-did-registry/did-ipfs-store';
import didEhtrResolverPkg from '@ew-did-registry/did-ethr-resolver';
import getInfuraIPFSConfig from '../vcs/infura_config.js';
import didResolverInterface from '@ew-did-registry/did-resolver-interface'
import revokactionPkg from '@ew-did-registry/revocation';
import { getSubjectObjects, getIssuerObjects } from "../vcs/users.js";
const {CredentialRevocation} = revokactionPkg
const { ProviderTypes } = didResolverInterface
const { DidStore } = didIpfsStorePkg
const { EwSigner } = didEhtrResolverPkg;

const main = async () => {
  const store = new DidStore(getInfuraIPFSConfig())
  const subjectPrivKey = process.env.VC_TEST_ACCOUNT_PRIVATE_KEY
  const issuerPrivKey = process.env.VC_TEST_ACCOUNT_PRIVATE_KEY

  // Get the subject and issuer
  const subject = getSubjectObjects(subjectPrivKey, store, "volta")
  const issuer = getIssuerObjects(issuerPrivKey, store, "volta")

  const dailyClaimData = {
    timestamp: "",
    pvSystemDID: "",
    cid: "",
    fileName: "",
  }

  // const claimUrl = await createGranularCertificateVC(subject, issuer, store, dailyClaimData)
  // console.log(claimUrl)
  // const claim = await store.get(claimUrl)
  // console.log(claim)
  const didDoc = await resolveDID(subject.keys.privateKey, "volta")
  const doc = await didDoc.read(subject.did)
  const first = doc.service[0]
  const isVerified = await verifyGranularCertificateVC(subjectPrivKey, store, "volta", first.serviceEndpoint)
  console.log(isVerified)

  //const isRevoked = await revokeGranularCertificateVC(issuer.user, claim)
  //console.log(isRevoked)
  // const revokedCreds = await getRevokations(issuer.user, claim)
  // console.log(revokedCreds)
  
}

// try {
//   const providerSettings = {
//     type: ProviderTypes.HTTP,
//     uriOrInfo: 'https://volta-rpc.energyweb.org',
// };
//   const cred = await verifyGranularCertificateVC(subjectPrivKey, store, "volta", claimUrl)
//   console.log(cred)
//   const revoker = EwSigner.fromPrivateKey(issuerPrivKey, providerSettings)
//   // await revokeCredential(revoker, JSON.stringify(cred))
//   const revokedCreds = await getRevokations(revoker, "TEST")
//   console.log(revokedCreds)
// } catch(e) {
//   console.log(e)
// }
  

main()