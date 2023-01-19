import { ORG_INSTALLER_ROLE_NAMESPACE } from "@config/switchboard";
import { getAppRoleDefinitions } from "@libs/iam_client_lib/utils/app_role_utils";
import { parseRequestorFields } from "@utils/iam-client-lib/parse_requestor_fields";

const filterProjectsForUser = async (roles, projects, userDID, iamClient) => {
  if(!iamClient || !iamClient.domainsService) return []
  const filtered = await Promise.all(projects.map(async project => {
    const appName = project.name;
    const {
      APP_ELECTRICIAN_ROLE_NAMESPACE,
      APP_INSTALLER_ROLE_NAMESPACE,
    } = getAppRoleDefinitions(appName);

    const isElectrician = (roles.includes(APP_ELECTRICIAN_ROLE_NAMESPACE));
    const isInstaller = (roles.includes(APP_INSTALLER_ROLE_NAMESPACE));
    if (isInstaller || isElectrician) {
      return project
    } else {
      const dids = await iamClient.domainsService.getDIDsByRole(APP_INSTALLER_ROLE_NAMESPACE)
      const availableProjects = await Promise.all(dids.map(async did => {
        const isAssignedElectrician = await isDIDAssignedElectrician(did, userDID, iamClient)
        if(isAssignedElectrician) {
          return project
        } else {
          return undefined
        }
      }))
      return (availableProjects.filter(obj => obj !== undefined).length > 0) ? project : undefined
    }
  }))
  return filtered.filter(obj => obj !== undefined)
};

const isDIDAssignedElectrician = async (did, userDid, iamClient) => {
  const doc = await iamClient.didRegistry.getDidDocument({ did: did, includeClaims: true })
  const service = doc.service.find(claim => claim.claimType === ORG_INSTALLER_ROLE_NAMESPACE)
  if (service?.requestorFields !== undefined) {
    const requestorFields = parseRequestorFields(service, "data")
    return requestorFields.installer_electrician_business_relationship_did === userDid
  } else {
    return false
  }
}

export {
  filterProjectsForUser,
  isDIDAssignedElectrician
}
