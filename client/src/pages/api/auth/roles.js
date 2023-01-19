import { withSession } from "@auth/utils";
import { getIamClient } from "@utils/iam-client-lib/server_side_helper";
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

const rolesRoute = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const {domainsService, didRegistry} = await getIamClient()
        const did = req.session.user?.did
        if(!did) {
          return res
            .status(422)
            .json({ message: "Error: Invalid user DID." });
        }

        // Get the validated DID's document
        const didDoc = await didRegistry.getDidDocument({
          did: req.session.user.did,
          includeClaims: true,
        });

        let nonValidatedClaims = (!didDoc.service) ? [] : didDoc.service

        // Check if the claim in the DID document is a valid role claim
        const validClaims = await Promise.all(nonValidatedClaims.map(async (claim) => {
          if(claim.claimType === undefined) return undefined
          const validDids = await domainsService.getDIDsByRole(claim.claimType)
          const isValid = validDids.some(valid => valid === did)
          if (isValid) return claim.claimType
          return undefined
        }))

        // Filter out an undefined claims
        const roles = validClaims.filter(claim => claim !== undefined)

        if (!roles) {
          return res
            .status(422)
            .json({ message: "Error: Couldn't store roles. Invalid roles." });
        }

        req.session.user = {
          ...req.session.user,
          roles: roles,
        };

        await req.session.save();
        return res.json({ ok: true });
      } catch (_error) {
        return res.json({ ok: false });
      }
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withSession(rolesRoute);
