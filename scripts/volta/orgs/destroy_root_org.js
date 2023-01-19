import { ORG_NAMESPACE } from "../constants.js";

async function destroyRootOrg(domainsService) {
  console.log(`Destroying ${ORG_NAMESPACE}...`);

  const orgAlreadyExists = await domainsService.checkExistenceOfDomain({
    domain: ORG_NAMESPACE,
  });

  if (orgAlreadyExists) {
    await domainsService.deleteOrganization({
      namespace: ORG_NAMESPACE,
      returnSteps: false,
    });

    console.log(`--- Destroyed ${ORG_NAMESPACE}.`);
  } else {
    console.log(`${ORG_NAMESPACE} does not exist.`);
  }
}

export default destroyRootOrg;
