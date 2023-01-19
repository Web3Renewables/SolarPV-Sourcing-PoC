import { ADMIN_ROLE_NAMESPACE, ORG_BUILDER_ROLE_NAMESPACE } from "@config/switchboard"
import { enrollToRole } from "@actions/utils"

export const registerBuilderToOrg = async (iamClient, did, data) => {
  // - Apply for the Builder role
  //     - (Eventually) Save parts of input to ceramic
  //     - Call IAM-Client-Lib method to request enrollent as an builder in organizaion
  return enrollToRole(iamClient, did, data, ORG_BUILDER_ROLE_NAMESPACE, ADMIN_ROLE_NAMESPACE)
}