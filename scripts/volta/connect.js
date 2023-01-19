import { initWithPrivateKeySigner } from "iam-client-lib";
import {
  WALLET_PRIVATE_KEY,
  RPC_URL,
} from "./constants.js";

const connect = async () => {
  if (!WALLET_PRIVATE_KEY) {
    throw new Error("Need to provide env.WALLET_PRIVATE_KEY!");
  }

  const {
    signerService,
    connectToCacheServer,
  } = await initWithPrivateKeySigner(WALLET_PRIVATE_KEY, RPC_URL);
  const { did: orgOwnerDid, address: orgOwnerAddress } = signerService;

  console.log("Connecting to EnergyWeb Cache server...");
  const { domainsService } = await connectToCacheServer();

  if (!domainsService) {
    throw new Error("Issue connecting to the EnergyWeb Cache server.");
  }

  console.log("Connected.");

  return { orgOwnerDid, orgOwnerAddress, domainsService };
};

export default connect;
