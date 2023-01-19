import { initWithPrivateKeySigner } from "iam-client-lib"
import { getInfuraIPFSConfig } from "@libs/iam_client_lib/utils/infura_config"
import { chainConfig as config } from "@config/environment";
import { RegistrationTypes } from "iam-client-lib"

const getIamClient = async () => {
  const { signerService, connectToCacheServer } = await initWithPrivateKeySigner(process.env.WALLET_PRIVATE_KEY, config.chainRpcUrl)
  const { connectToDidRegistry, domainsService, assetsService } = await connectToCacheServer();
  const { claimsService, didRegistry } = await connectToDidRegistry(getInfuraIPFSConfig());
  
  return {
    domainsService,
    assetsService,
    claimsService,
    didRegistry,
    serverDid: signerService.did
  }
}

const getDIDsByRole = async (domainsService, roleNamespace) => {
  return await domainsService.getDIDsByRole(roleNamespace);
}

const issueServerSideClaim = async (claimsService, subject, claimType, issuerFields, registrationTypes = [RegistrationTypes.OnChain, RegistrationTypes.OffChain]) => {
  await claimsService.issueClaim({
    claim: {
      claimType: claimType,
      claimTypeVersion: 1,
      issuerFields: issuerFields,
    },
    subject: subject,
    registrationTypes: registrationTypes
  })

}

export {
  getIamClient,
  getDIDsByRole,
  issueServerSideClaim,
}