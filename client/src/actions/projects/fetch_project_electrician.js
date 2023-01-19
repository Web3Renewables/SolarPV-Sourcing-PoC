import { parseRequestorFields } from "@utils/iam-client-lib/parse_requestor_fields"
const { ORG_ELECTRICIAN_ROLE_NAMESPACE, ORG_INSTALLER_ROLE_NAMESPACE } = require("@config/switchboard")

const fetchProjectElectrician = async (iamClient, appInstallerRoleNamespace) => {
  const installers = await iamClient.domainsService.getDIDsByRole(appInstallerRoleNamespace)
  if (installers.length == 0) return undefined
  const installerServices = await iamClient.didRegistry.getServices({ did: installers[0].subject })
  const claim = installerServices.find(claim => claim.claimType === ORG_INSTALLER_ROLE_NAMESPACE)
  if (!claim) return undefined
  const installerRequestorFields = parseRequestorFields(claim, 'data')
  const services = await iamClient.didRegistry.getServices({ did: installerRequestorFields.installer_electrician_business_relationship_did })
  const electricianService = services.find(claim => claim.claimType === ORG_ELECTRICIAN_ROLE_NAMESPACE)
  if(!electricianService) return undefined
  return electricianService
}

export {
  fetchProjectElectrician
}