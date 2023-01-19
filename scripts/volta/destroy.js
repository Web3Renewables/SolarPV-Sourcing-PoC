import connect from "./connect.js";
import destroyRootOrg from "./orgs/destroy_root_org.js";
import destroyOrgRoles from "./roles/destroy_org_roles.js";

/**
 * Destroys org, apps and roles for switchboard
 * Before running this script, values should be set in `.env.local`
 */
(async function() {
  console.log("Cleaning up.......");

  const { domainsService } = await connect();

  await destroyOrgRoles(domainsService);

  await destroyRootOrg(domainsService);

  console.log("Done cleanup!");
})();
