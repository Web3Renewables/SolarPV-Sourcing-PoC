import { ROOT_NAMESPACE, ORG_NAME, ORG_NAMESPACE } from "../constants.js";

// console.log(await domainsService.getSubdomains({ domain: "brayden.ewc" })); // ['org.brayden.ewc', 'app1.brayden.ewc']
// console.log(await domainsService.getOrgHierarchy("org.brayden.ewc"));
// console.log(await domainsService.getAppsOfOrg('org.brayden.ewc'))
// console.log(await domainsService.getAllowedRolesByIssuer(did))

async function createRootOrg(domainsService) {
  const orgAlreadyExists = await domainsService.checkExistenceOfDomain({
    domain: ORG_NAMESPACE,
  });

  if (orgAlreadyExists) {
    console.log(`${ORG_NAMESPACE} already exists.`);
    return;
  }

  console.log(`Creating ${ORG_NAMESPACE}...`);

  const res = await domainsService.createOrganization({
    orgName: ORG_NAME,
    namespace: ROOT_NAMESPACE,
    data: {
      orgName: ORG_NAME, // A more descriptive name for the org
      // logoUrl: 'string',
      // websiteUrl: 'string',
      // description: 'string',
    },
    returnSteps: false, // Indicates whether to run steps immediately (false) or return steps that can be executed later (true)
  });

  console.log(`+++ Created ${ORG_NAMESPACE}.`);
  return res;
}

export default createRootOrg;
