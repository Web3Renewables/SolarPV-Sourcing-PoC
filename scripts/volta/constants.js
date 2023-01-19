import VOLTA_CONFIG from "../../client/src/config/volta.js";
import SWITCHBOARD from "../../client/src/config/switchboard.js";

export const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;

export const ROLETYPES = {
  ORG: "org",
  APP: "app",
};

// https://github.com/energywebfoundation/ew-credentials/blob/develop/packages/credential-governance/src/types/domain-definitions.ts#L36
export const mockDataField = {
  fieldType: "text",
  label: "data",
  required: true,
}

export const {
  VOLTA_CHAIN_ID: CHAIN_ID,
  VOLTA_RPC_URL: RPC_URL,
} = VOLTA_CONFIG;

export const {
  ROOT_NAMESPACE,
  ORG_NAME,
  ORG_NAMESPACE,
  ADMIN,
  INSTALLER,
  ELECTRICIAN,
  BUILDER,
  PV_SYSTEM,
  CONTRACTOR,
  ADMIN_ROLE_NAMESPACE,
  ORG_INSTALLER_ROLE_NAMESPACE,
  ORG_ELECTRICIAN_ROLE_NAMESPACE,
  ORG_BUILDER_ROLE_NAMESPACE,
  ORG_CONTRACTOR_ROLE_NAMESPACE,
  ORG_ROLES_NAMESPACE,
} = SWITCHBOARD;
