import { ADMIN_ROLE_NAMESPACE, ORG_ELECTRICIAN_ROLE_NAMESPACE } from "@config/switchboard"
import { enrollToRole } from "@actions/utils"

export const registerElectricianToOrg = async (iamClient, did, data) => {
  // - Apply for the electrician role
  //     - (Eventually) Save parts of input to ceramic
  //     - Call IAM-Client-Lib method to request enrollent as an electrician in organizaion
  return enrollToRole(iamClient, did, data, ORG_ELECTRICIAN_ROLE_NAMESPACE, ADMIN_ROLE_NAMESPACE)
}