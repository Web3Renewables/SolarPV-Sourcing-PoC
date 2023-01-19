import { ORG_ELECTRICIAN_ROLE_NAMESPACE } from "@config/switchboard"
import { getAppRoleDefinitions } from "@libs/iam_client_lib/utils/app_role_utils"

const getAllElectricians = async (iamClient) => {
  return await getAllOfRole(iamClient, ORG_ELECTRICIAN_ROLE_NAMESPACE)
}

const getAllProjectElectricians = async (iamClient, appName) => {
  const {APP_ELECTRICIAN_ROLE_NAMESPACE} = getAppRoleDefinitions(appName)
  return await getAllOfRole(iamClient, APP_ELECTRICIAN_ROLE_NAMESPACE)
}

const getAllOfRole = async (iamClient, role) => {
  const dids = await iamClient.domainsService.getDIDsByRole(role)
  const claims = await Promise.all(dids.map(did => iamClient.didRegistry.getDidDocument({ did: did, includeClaims: true })))
  return claims.map(doc => {
    const claim = doc.service.find(claim => claim.claimType === ORG_ELECTRICIAN_ROLE_NAMESPACE)
    console.log(claim)
    if (claim === undefined ) return undefined
    return {
      claim: claim,
      parsed: JSON.parse(claim.requestorFields[0].value)
    }

  })
}

export { getAllElectricians, getAllProjectElectricians }