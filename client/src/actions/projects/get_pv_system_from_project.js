import { ORG_INSTALLER_ROLE_NAMESPACE } from "@config/switchboard";
import { parseRequestorFields } from "@utils/iam-client-lib/parse_requestor_fields";
import jwtDecode from "jwt-decode";

const getPVSystem = async (appPVSystemRoleNamespace, iamClient, isAdmin, userDid, isInstaller, appId = null, installerNamespace) => {
  if (iamClient.claimsService === undefined || iamClient.domainsService === undefined) {
    return undefined;
  }

  try {
    if (isAdmin) {
      const claims = await iamClient.claimsService.getClaimsByIssuer({
        did: userDid,
        isAccepted: true,
        namespace: appPVSystemRoleNamespace,
      });
      if(!claims.length) return
      const claimData = jwtDecode(claims[0].issuedToken).claimData
      return {...claimData, subject: claims[0].subject}

    } else if (isInstaller) {
      const assetClaim = (await iamClient.claimsService.getClaimsByRequester({
        did: userDid,
        isAccepted: true,
      })).find(claim => claim.claimType === appPVSystemRoleNamespace)
      if(!assetClaim) return
      const claimData = jwtDecode(assetClaim.issuedToken).claimData
      return {...claimData, subject: assetClaim.subject}
    } else {
      // If they are an electrician
      // Check if they are the assigned electrician (fine on client side since this data is public, however, just gates access slightly)
      const dids = await iamClient.domainsService.getDIDsByRole(appPVSystemRoleNamespace)
      if(dids.length == 0) return null
      
      const claims = await iamClient.didRegistry.getServices({did: dids[0]})
      const installerClaim = claims.find(claim => claim.claimType === ORG_INSTALLER_ROLE_NAMESPACE)
      if(!installerClaim) return null
      const requestorFields = parseRequestorFields(installerClaim, 'data')
      if(requestorFields.installer_electrician_business_relationship_did !== userDid) return null
      if(appId == null) return null
      const res = await fetch("/api/database/getProjectAssetDID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          appId: appId
        })
      })
      if(!res.ok) return null
      const { did } = await res.json()
      const services = await iamClient.didRegistry.getServices({did: did})
      const claim = services.find(claim => claim.claimType === appPVSystemRoleNamespace)
      if(!claim) return null
      return {...claim, subject: claim.sub}
    }
  } catch (error) {
    console.log(error)
    return undefined
  }

}

export default getPVSystem;