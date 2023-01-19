import { initWithPrivateKeySigner, setCacheConfig, setChainConfig, VerifiableCredentialsServiceBase } from "iam-client-lib"
import { decodeAndParseJWT, sortNewestByCreatedAt } from "../utils.js";

/**
 * Gets the iam-client-lib objects to interact with the energy web chain and volta
 * @param {string} rpcUrl RPC Url of the blockchain
 * @param {number} chainId Chain Id of the blockchain
 * @param {string} cacheServerUrl Address of the cache server
 * @param {string} walletKey Private wallet key of the Web3Renewables Owner
 * @param {IpfsConfig} ipfsConfig IPFS Config for saving to infura
 * @returns 
 */
const getIamClient = async (rpcUrl, chainId, cacheServerUrl, walletKey, ipfsConfig) => {
  setChainConfig(chainId, { rpcUrl: rpcUrl });
  setCacheConfig(chainId, { url: cacheServerUrl });
  const { signerService, connectToCacheServer } = await initWithPrivateKeySigner(walletKey, rpcUrl)
  const { connectToDidRegistry, domainsService, assetsService, verifiableCredentialsService } = await connectToCacheServer();
  const { claimsService, didRegistry } = await connectToDidRegistry(ipfsConfig);

  return {
    domainsService,
    assetsService,
    claimsService,
    didRegistry,
    did: signerService.did,
    verifiableCredentialsService
  }
}

/**
 * For each app in the orgainzation, collect each PV System DID. With each PV System DID, verify the claims and collect the data.
 * @param {{domainsService: DomainsService, assetsService: AssetsService, claimsService: ClaimsService, didRegistry: DidRegistry, did: string}} iamClient Object to interact with the energy web chain or volta
 * @param {string} rootOrg Root Organization in which all applications fall under
 * @param {string} pvSystemName Name of the pv-system role (e.g., pv-system)
 * @param {string} electricianName Name of electrician role (e.g., electrician)
 * @param {string} orgElectricianRoleNamespace Organization level electrician role namespace
 * @returns {{app: Object, pvSystemCreds: Object, electricianCreds: Object}}
 */
const validClaims = async (iamClient, rootOrg, pvSystemName, electricianName) => {
  // Get all "projects" of an organization
  const apps = await iamClient.domainsService.getAppsOfOrg(rootOrg)
  //For each App, get the PV-system Role DIDs
  const valid = await Promise.all(
    apps.map(async (app) => {
      try {
        // Create the role namespace
        const pvSystemRoleNamespace = `project-${pvSystemName}.roles.${app.namespace}`
        const electricianRoleNamespace = `project-${electricianName}.roles.${app.namespace}`
        const installerRolenamespace = `project-installer.roles.${app.namespace}`
        const orgInstallerNamespace = `installer.roles.${rootOrg}`

        // Get all dids by the role namespace
        const dids = (await iamClient.claimsService.getClaimsByIssuer({
          did: iamClient.did,
          isAccepted: true,
          namespace: pvSystemRoleNamespace,
        })).map(obj => obj.subject);

        const installerAppDocument = (await iamClient.claimsService.getClaimsByIssuer({
          did: iamClient.did,
          isAccepted: true,
          namespace: installerRolenamespace,
        })).sort(sortNewestByCreatedAt)

        const insiallerAppRoleClaim = (!installerAppDocument || !installerAppDocument.length) ? undefined : installerAppDocument[0]
        const installerDid = (!installerAppDocument || !installerAppDocument.length) ? undefined : installerAppDocument[0].subject

        if (!dids || dids.length == 0) return
        if (!insiallerAppRoleClaim || !installerDid) return

        const installerDocument = (await iamClient.claimsService.getClaimsByIssuer({
          did: iamClient.did,
          isAccepted: true,
          namespace: orgInstallerNamespace,
        })).sort(sortNewestByCreatedAt).find(doc => doc.subject === installerDid)

        const installerRoleClaim = (!installerDocument) ? undefined : decodeAndParseJWT(installerDocument.issuedToken)
        const electriciansDids = (!installerRoleClaim.installer_electrician_business_relationship_did) ? [] : [installerRoleClaim.installer_electrician_business_relationship_did]

        // Get all DID Documents for each DID
        const pvSystemCreds = (await getValidCredentials(iamClient, dids, pvSystemRoleNamespace)).filter(obj => obj !== undefined)

        if (!pvSystemCreds || !pvSystemCreds.length) return

        return {
          app,
          pvSystemCreds,
          electriciansDids,
          installerDid
        }
      } catch (e) {
        console.log(e.message)
      }
    })
  )

  // Not testable at the moment!
  // Makes sure there is only one pv system per app (project)
  const mapped = await Promise.all(valid.map(async obj => {
    if (!obj) return
    if (obj.pvSystemCreds.length > 1) {
      // Get the history of each pv system
      try {
        let newest = { cred: undefined, timestamp: undefined }

        for (const item in pvSystemCreds) {
          const asset = await iamClient.assetsService.getAssetById({ id: item.did, })
          if (!newest.timestamp || newest.timestamp < new Date(asset.createdAt)) {
            newest = { cred: item, timestamp: asset.createdAt }
          }
        }
        // Find the most recently created and return it
        return {
          app: obj.app,
          pvSystemCreds: newest.cred,
          electriciansDids: obj.electriciansDids
        }
      } catch (e) {
        console.log(`More than one PV System error: ${e.messaage}`)
      }
    } else {
      // Already checked if they were an empty array (whole object became undefined, then filtered
      // therefore, can only be 1 or more than 1)
      return {
        app: obj.app,
        pvSystemCreds: obj.pvSystemCreds[0],
        electriciansDids: obj.electriciansDids,
        installerDid: obj.installerDid
      }
    }
  }))

  return mapped.filter(obj => obj !== undefined)
}

/**
 * Collects PV System Verifiable Credentials and verifys there are not any malicious claims
 * @param {{domainsService: DomainsService, assetsService: AssetsService, claimsService: ClaimsService, didRegistry: DidRegistry, did: string}} iamClient Object to interact with the energy web chain or volta
 * @param {string[]} dids PV System DIDs to collect credentials
 * @param {string} claimRoleNamespace Namespace to collect credentials form (e.g., project-pv-system.roles.<app>.<apps>,<global_org_namespace>)
 * @returns {{did: String, credential: RoleEIP191JWT | VerifiableCredential<RoleCredentialSubject>}[]}
 */
const getValidCredentials = async (iamClient, dids, claimRoleNamespace) => {
  return await Promise.all(
    dids.map(
      async (did) => {
        try {
          // Get credential, return if undefined
          const credential = await iamClient.claimsService.fetchCredential(did, claimRoleNamespace)
          if (!credential) return

          const valid = credential.eip191Jwt
            ? await manualVerifyRoleEIP191JWT(iamClient, credential, claimRoleNamespace)
            : await manualVerifyVC(credential)

          if (!valid || !valid.isVerified) return

          return {
            did,
            credential,
            revoked: valid.revoked
          }
        } catch (e) {
          console.log(`Credential retrieval and verification failed for ${did}. Reason: ${e.message}.`)
        }
      }
    )
  )
}

/**
 * Verifies that a role credential is valid by checking JWT Token valid and issuer acutally issued claim
 * @param {{domainsService: DomainsService, assetsService: AssetsService, claimsService: ClaimsService, didRegistry: DidRegistry, did: string}} iamClient 
 * @param {VerifiableCredential<RoleCredentialSubject> | RoleEIP191JWT} credential 
 * @param {string} claimRoleNamespace Role namespace
 * @returns 
 */
const manualVerifyRoleEIP191JWT = async (iamClient, credential, claimRoleNamespace) => {
  const { payload, eip191Jwt } = credential;
  if (!payload || !eip191Jwt) return {}

  const issuerDID = payload?.iss;
  if (!issuerDID) return {}

  // Verify Issuer
  const issuerClaims = await iamClient.claimsService.getClaimsByIssuer({
    did: issuerDID,
    isAccepted: true,
  })
  const issuerVerified = issuerClaims.some(claim => claim.claimType === claimRoleNamespace)

  // Verify Token
  const proofVerified = await iamClient.didRegistry.verifyPublicClaim(
    eip191Jwt,
    issuerDID
  );
  if (!proofVerified) return {}

  // Check expired
  const isExpired = payload?.exp && (payload?.exp * 1000 < Date.now())
  if (isExpired) return {}

  // Check if revoked
  const revoked = await iamClient.verifiableCredentialsService.isRevoked(payload);

  return {
    isVerified: issuerVerified && proofVerified && !isExpired,
    revoked: revoked
  }
}

/**
 * Verifies that a role credential is valid on-chain
 * @param {{domainsService: DomainsService, assetsService: AssetsService, claimsService: ClaimsService, didRegistry: DidRegistry, verifiableCredentialsService: VerifiableCredentialsServiceBase, did: string}} iamClient 
 * @param {VerifiableCredential<RoleCredentialSubject> | RoleEIP191JWT} credential 
 * @param {string} claimRoleNamespace Role namespace
 * @returns 
 */
const manualVerifyVC = async (iamClient, credential, claimRoleNamespace) => {
  let issuerDID = vc.issuer;
  if (!issuerDID) return

  // Verify Issuer
  issuerDID = typeof issuerDID === "string" ? issuerDID : issuerDID.id
  const issuerClaims = await iamClient.claimsService.getClaimsByIssuer({
    did: issuerDID,
    isAccepted: true,
  })
  let issuerVerified = issuerClaims.some(claim => claim.claimType === claimRoleNamespace)

  // Verify Token
  let proofVerified = false
  try {
    proofVerified = await iamClient.verifiableCredentialsService.verify(credential)
  } catch { }

  if (vc.credentialStatus) {
    try {
      await iamClient.claimsService._statusVerifier.verifyCredentialStatus(vc.credentialStatus);
    } catch { issuerVerified = false }
  }

  // Check if revoked
  const revoked = await iamClient.verifiableCredentialsService.isRevoked(payload);

  return {
    isVerified: issuerVerified && proofVerified && !isExpired,
    revoked: revoked
  }
}

export {
  getIamClient,
  validClaims,
}