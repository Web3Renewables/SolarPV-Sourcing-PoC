import didIpfsStorePkg from '@ew-did-registry/did-ipfs-store';
import getInfuraIPFSConfig from './infura_config.js';
import keyPkg from '@ew-did-registry/keys'
import didEthrResolverPkg from '@ew-did-registry/did-ethr-resolver'
import didResolverInterfacePkg from '@ew-did-registry/did-resolver-interface'
import didRegistryClaimsPkg from '@ew-did-registry/claims'
import { getIssuerObjects, getSubjectObjects } from './users.js';
import { resolverSettings } from './get_chain_settings.js';
import { v4 as uuidv4 } from 'uuid';
import { sleep } from '../utils.js';
const { DIDAttribute, Encoding } = didResolverInterfacePkg
const { DidStore } = didIpfsStorePkg
const { Operator, EwSigner } = didEthrResolverPkg
const { hashes } = didRegistryClaimsPkg
const { KeyType } = keyPkg


/**
 * Issues a batch of Verifiable Credentials for Daily Granular Certificates
 * @param {string} subjectPrivateKey Private Key of DID Subject
 * @param {string} issuerPrivateKey Private Key of DID Issuer
 * @param {string} cid CID of the Daily GC's
 * @param {{fileName: string, gc: DailyGCSchema}[]} gcs Daily GCs
 * @param {boolean} production Is production
 */
const issueBatchDailyVCs = async (subjectPrivateKey, issuerPrivateKey, cid, gcs, production = false) => {
  try {
    // Get the required parameters
    const store = new DidStore(getInfuraIPFSConfig())
    const didMethod = production ? "ewc" : "volta"
    const subject = getSubjectObjects(subjectPrivateKey, store, didMethod)
    const issuer = getIssuerObjects(issuerPrivateKey, store, didMethod)

    const mapping = []
    for (let i = 0; i < gcs.length; i++) {
      let attempts = 0
      // Create the VC Claim Data
      for (let j = 0; j < 5; j++) {
        let success = false

        const dailyClaimData = {
          timestamp: Date.now() * 1000, // Timestamp in seconds
          pvSystemDID: gcs[i].gc.data.production_device_identifier,
          cid: cid,
          fileName: gcs[i].gc.fileName,
        }

        try {
          // Create the Granular Certificate
          console.log(">>> Creating: " + gcs[i].gc.data.production_device_identifier)
          const uuid = await createGranularCertificateVC(subject, issuer, store, dailyClaimData)
          console.log(">>> Finished " + gcs[i].gc.data.production_device_identifier)
          mapping.push({ vcUuid: uuid, data: gcs[i] })
          success = true
          // Must sleep because too many sequential blockchain requests fail
        } catch (e) {
          attempts += 1
        }

        sleep(attempts*1000)
        if (success) break
      }
      if (attempts == 5) {
        console.log("Couldn't upload VC after 5 attempts")
        mapping.push({ vcUuid: 'none', data: gcs[i] })
      }
      console.log("Moving on to next...")
    }
    return mapping
  } catch (_e) {
    console.log(_e.message)
    return []
  }
}

/**
 * Issues a batch of Verifiable Credentials for Monthly Granular Certificates
 * @param {string} subjectPrivateKey Private Key of DID Subject
 * @param {string} issuerPrivateKey Private Key of DID Issuer
 * @param {string} cid CID of the Monthly GC's
 * @param {{fileName: string, cid: string, indexData: IndexMonthlyMetadataSchema, data: MonthlyGCSchema}[]} gcs Monthly GCs
 * @param {boolean} production Is production
 */
const issueBatchMonthlyVCs = async (subjectPrivateKey, issuerPrivateKey, cid, gcs, production = false) => {
  try {
    // Get the required parameters
    const store = new DidStore(getInfuraIPFSConfig())
    const didMethod = production ? "ewc" : "volta"
    const subject = getSubjectObjects(subjectPrivateKey, store, didMethod)
    const issuer = getIssuerObjects(issuerPrivateKey, store, didMethod)

    const mapping = []
    for (let i = 0; i < gcs.length; i++) {
      let attempts = 0
      // Create the VC Claim Data
      for (let j = 0; j < 5; j++) {
        let success = false

        const monthlyClaimData = {
          timestamp: Date.now() * 1000, // Timestamp in seconds
          pvSystemDID: gcs[i].data.production_device_identifier,
          cid: cid,
          fileName: gcs[i].fileName,
        }

        try {
          // Create the Granular Certificate
          console.log(">>> Creating: " + gcs[i].data.production_device_identifier)
          const uuid = await createGranularCertificateVC(subject, issuer, store, monthlyClaimData)
          console.log(">>> Finished " + gcs[i].data.production_device_identifier)
          mapping.push({ vcUuid: uuid, data: gcs[i] })
          success = true
          // Must sleep because too many sequential blockchain requests fail
        } catch (e) {
          attempts += 1
        }

        sleep(attempts*1000)
        if (success) break
      }
      if (attempts == 5) {
        console.log("Couldn't upload VC after 5 attempts")
        mapping.push({ vcUuid: 'none', data: gcs[i] })
      }
      console.log("Moving on to next...")
    }
    return mapping
  } catch (_e) {
    console.log(_e.message)
    return []
  }
}

/**
 * Issues a batch of Verifiable Credentials for Daily Granular Certificates
 * @param {string} subjectPrivateKey Private Key of DID Subject
 * @param {string} issuerPrivateKey Private Key of DID Issuer
 * @param {{fileName: string, did: string, cid: string, vcUuid: string}[]} data Data to update VC with
 * @param {boolean} production Is production
 */
const updateBatchVCs = async (subjectPrivKey, issuerPrivKey, data, production) => {
  try {
    // Get the required parameters
    const store = new DidStore(getInfuraIPFSConfig())
    const didMethod = production ? "ewc" : "volta"
    const subject = getSubjectObjects(subjectPrivKey, store, didMethod)
    const issuer = getIssuerObjects(issuerPrivKey, store, didMethod)

    for (let i = 0; i < data.length; i++) {
      let attempts = 0
      // Create the VC Claim Data
      for (let j = 0; j < 5; j++) {
        let success = false

        const claimData = {
          timestamp: Date.now() * 1000,
          pvSystemDID: data[i].did,
          cid: data[i].cid,
          fileName: data[i].fileName
        }

        try {
          // Create the Granular Certificate
          console.log(">>> Updating: " + data[i].did)
          await createGranularCertificateVC(subject, issuer, store, claimData, data[i].vcUuid)
          console.log(">>> Finished " + data[i].did)

          success = true
          // Must sleep because too many sequential blockchain requests fail
        } catch (e) {
          attempts += 1
        }
        sleep(attempts*1000)
        if (success) break
      }
      if (attempts == 5) {
        console.log("Couldn't upload VC after 5 attempts")
      }
      console.log("Moving on to next...")
    }
  } catch (_e) {
    console.log(_e.message)
  }

}

/**
 * Creates a Verifiable Credential with the specified data and then publishes to subject's DID document.
 * @param {{userClaims: any; keys: Keys; address: string; did: string; user: EwSigner; operator: Operator; userReg: IClaimsUser}} subject VC Subject
 * @param {{userClaims: any; keys: Keys; address: string; did: string; user: EwSigner; operator: Operator; userReg: IClaimsUser}} issuer VC Issuer
 * @param {DIDStore} store DID Store (for saving/retrieving from IPFS)
 * @param {any} data Data to save in VC
 * @returns 
 */
const createGranularCertificateVC = async (subject, issuer, store, data, existingToken = undefined) => {
  if (data === undefined) { throw new Error("Data undefined. Please specify actual data to be used") }

  const token = await subject.userClaims.createPublicClaim(data);
  const issuedToken = await issuer.issuerClaims.issuePublicClaim(token)
  return await manualPublishClaim(subject, issuedToken, store, existingToken)
}

/**
 * Publish a claim to the subject's DID Document
 * @param {{userClaims: any; keys: Keys; address: string; did: string; user: EwSigner; operator: Operator; userReg: IClaimsUser}} subject VC Subject
 * @param {string} issuedToken Signed JWT Token from Issuer
 * @param {DIDStore} store DID Store (for saving/retrieving from IPFS) 
 * @param {string} existingUuid Existing claim token id to update. Default undefined (create new one)
 * @returns {string} uuid
 */
const manualPublishClaim = async (subject, issuedToken, store, existingUuid = undefined) => {
  const url = await store.save(issuedToken);
  let uuid = (!existingUuid || existingUuid === 'none') ? uuidv4() : existingUuid
  const data = {
    type: DIDAttribute.ServicePoint,
    value: {
      id: uuid,
      serviceEndpoint: url,
      hash: hashes.SHA256(issuedToken),
      hashAlg: 'SHA256',
    },
  }

  const updateData = {
    algo: KeyType.Secp256k1,
    encoding: Encoding.HEX,
    ...data,
  };
  const operator = new Operator(subject.user, resolverSettings);
  await operator.update(subject.did, DIDAttribute.ServicePoint, updateData);
  return uuid;
}

/**
 * Creates a public claim
 * @param {{userClaims: any; keys: Keys; address: string; did: string; user: EwSigner; operator: Operator; userReg: IClaimsUser}} subject VC Subject
 * @param {any} data 
 * @returns {string}
 */
const createPublicClaim = async (subject, data) => {
  return await subject.userClaims.createPublicClaim(data);
}

export {
  createGranularCertificateVC,
  createPublicClaim,
  issueBatchDailyVCs,
  issueBatchMonthlyVCs,
  updateBatchVCs
}