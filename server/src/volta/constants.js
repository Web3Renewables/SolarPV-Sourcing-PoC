import VOLTA_CONFIG from "../client_config/volta.js";
import {
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
} from "../client_config/switchboard.js";
import { getInfuraIPFSConfig } from "../client_config/infura_config.js"

const WALLET_PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;

const {
  VOLTA_CHAIN_ID: CHAIN_ID,
  VOLTA_RPC_URL: RPC_URL,
  VOLTA_CACHE_SERVER_URL
} = VOLTA_CONFIG;

export {
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
  getInfuraIPFSConfig,
  WALLET_PRIVATE_KEY,
  CHAIN_ID,
  RPC_URL,
  VOLTA_CACHE_SERVER_URL
}
