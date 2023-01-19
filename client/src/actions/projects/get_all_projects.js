import { ORG_NAMESPACE } from "@config/switchboard";

const getAllProjects = async (iamClient) => {
  if (!iamClient || iamClient.domainsService === undefined) {
    return [];
  }

  return await iamClient.domainsService.getAppsOfOrg(ORG_NAMESPACE);
};

export default getAllProjects;
