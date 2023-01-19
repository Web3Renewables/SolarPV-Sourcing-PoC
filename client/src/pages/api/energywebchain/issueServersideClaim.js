import { withSession } from "@auth/utils";
import { ADMIN_ROLE_NAMESPACE, ORG_INSTALLER_ROLE_NAMESPACE } from "@config/switchboard";
import { issueServerSideClaim, getIamClient, getDIDsByRole } from "@utils/iam-client-lib/server_side_helper";
import { getAppRoleDefinitions } from "@libs/iam_client_lib/utils/app_role_utils";
import { RegistrationTypes } from "iam-client-lib";
import { chainConfig as config } from "@config/environment";

import {
  ProviderType,
  initWithMetamask,
  setCacheConfig,
  setChainConfig,
} from "iam-client-lib";

const { chainRpcUrl, chainId, cacheServerUrl } = config;

setChainConfig(chainId, { rpcUrl: chainRpcUrl });
setCacheConfig(chainId, { url: cacheServerUrl });

async function handler(req, res) {
  return res.status(401).end()
  const user = req.session?.user;
  const body = req.body

  if (!user || user.isLogggedIn === false || user.roles === undefined) {
    res.status(401).end();
    return
  }

  const isInstaller = user.roles.includes(ORG_INSTALLER_ROLE_NAMESPACE)
  const isAdmin = user.roles.includes(ADMIN_ROLE_NAMESPACE)
  if (!(isAdmin || isInstaller)) {
    res.status(401).end();
    return
  }

  if (req.method == 'POST') {
    try {
      const { claimsService, domainsService } = await getIamClient()
      
      if (body === undefined || body === null) {
        res.status(400).json({ "error": "Please specify a body for the role claim" });
        return
      }

      const { appName, subject, data, claimType } = JSON.parse(body)
      const { APP_INSTALLER_ROLE_NAMESPACE, APP_PV_SYSTEM_ROLE_NAMESPACE, APP_SYSTEM_OWNER_NAMESPACE } = getAppRoleDefinitions(appName)

      if (!user.roles.includes(APP_INSTALLER_ROLE_NAMESPACE)) {
        res.status(401).json({ "error": "You do not own this project!" });
        return
      }

      switch (claimType) {
        case APP_PV_SYSTEM_ROLE_NAMESPACE:
          const existingPv = getDIDsByRole(domainsService, APP_PV_SYSTEM_ROLE_NAMESPACE)
          if (existingPv.length > 0) {
            res.status(403).json({ "error": "Already registered a PV system to this project!" });
            return
          }
          await issueServerSideClaim(claimsService, subject, APP_PV_SYSTEM_ROLE_NAMESPACE, [{ key: 'data', value: JSON.stringify(data) }], [RegistrationTypes.OffChain])
          break;
        case APP_SYSTEM_OWNER_NAMESPACE:
          const existingSystemOwner = getDIDsByRole(domainsService, APP_SYSTEM_OWNER_NAMESPACE)
          if (existingSystemOwner.length > 0) {
            res.status(403).json({ "error": "Already registered a system owner to this project!" });
            return
          }
          await issueServerSideClaim(claimsService, subject, APP_SYSTEM_OWNER_NAMESPACE, [{ key: 'data', value: JSON.stringify(data) }])
          break;
        default:
          res.status(400).json({ "error": "Please specifiy a valid claim type: PV system or system owner (formatted to correct app namespace)" });
          return
      }
      res.status(200).json({ "message": `Issued ${claimType}! to ${subject}` });
    } catch (e) {
      console.log(e.message)
      res.status(500).json({ "error": "Bad Request" });
    }
  } else {
    res.status(405).json({ "error": "Invalid request method" });
  }
}

export default withSession(handler)