import connect from "./connect.js";
import createRootOrg from "./orgs/create_root_org.js";
import createOrgRoles from "./roles/create_org_roles.js";

/**
 * Creates org, apps and roles for switchboard
 * Assumes that the domain is already registered
 * For description of roles, see https://energyweb.atlassian.net/wiki/spaces/EWTS/pages/2960228364/SB+setup
 * https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key
 * Before running this script, values for root domain and private key of its owner should be set in `.env.local`
 */
(async function() {
  console.log("Deploying.......");

  const { orgOwnerDid, orgOwnerAddress, domainsService } = await connect();

  await createRootOrg(domainsService);

  await createOrgRoles(domainsService, orgOwnerDid);

  console.log("Done deploying!");
})();
