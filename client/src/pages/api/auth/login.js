import { withSession } from "@auth/utils";
import { ecrecover, fromRpcSig, pubToAddress, keccak256, hashPersonalMessage, toBuffer } from "ethereumjs-util";
import { didPrefix, chainConfig as config } from "@config/environment";
import { getIamClient } from "@utils/iam-client-lib/server_side_helper";
import { v4 as uuidv4 } from 'uuid';
const admin = require('firebase-admin');
import { readUserData, writeUserData } from '@libs/firebase';

import {
  ProviderType,
  initWithMetamask,
  setCacheConfig,
  setChainConfig,
} from "iam-client-lib";

const { chainRpcUrl, chainId, cacheServerUrl } = config;

setChainConfig(chainId, { rpcUrl: chainRpcUrl });
setCacheConfig(chainId, { url: cacheServerUrl });

const app = !admin.apps.length ? admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_WORKER)),
  databaseURL: process.env.FIREBASE_DATABASE_URL
}) : admin.app();
let db = admin.database(app)

const loginRoute = async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const { didRegistry, domainsService } = await getIamClient()
        const { did, address, signature } = req.body;

        // Get Nonce from Firebase
        const nonceObj = await readUserData(db, address)
        if(nonceObj === null) {
          return res
            .status(401)
            .json({ message: "Could not retrieve nonce." })
        }
        console.log("retrieved nonce")
        // Create the expected signed message and get message parameters
        const signedMessage = keccak256(Buffer.from(nonceObj.nonce)).toString('hex')
        const msgBuffer = Buffer.from(signedMessage)
        const msgHash = hashPersonalMessage(msgBuffer);
        const signatureBuffer = toBuffer(signature);
        const signatureParams = fromRpcSig(signatureBuffer);

        // Recover the public from the signing information
        const publicKey = ecrecover(
          msgHash,
          signatureParams.v,
          signatureParams.r,
          signatureParams.s
        );

        // Convert the public key to a wallet address
        const addressBuffer = pubToAddress(publicKey);
        const signingAddress = `0x${addressBuffer.toString('hex').toLowerCase()}`

        // Ensure the person who signed the message matches the supposed DID
        if (signingAddress !== address.toLowerCase() || signingAddress !== did.replace(didPrefix, "").toLowerCase()) {
          return res
            .status(401)
            .json({ message: "Error: Couldn't login, invalid signature." })
        }
        console.log("verified DID")
        // Get the validated DID's document
        const didDoc = await didRegistry.getDidDocument({
          did: did,
          includeClaims: true,
        });
        console.log("retrieved DID Doc")
        let nonValidatedClaims = (!didDoc.service) ? [] : didDoc.service

        // Check if the claim in the DID document is a valid role claim
        const validClaims = await Promise.all(nonValidatedClaims.map(async (claim) => {
          if(claim.claimType === undefined) return undefined
          const validDids = await domainsService.getDIDsByRole(claim.claimType)
          const isValid = validDids.some(valid => valid === did)
          if(isValid) return claim.claimType
          return undefined
        }))
        
        // Filter out an undefined claims
        const roles = validClaims.filter(claim => claim !== undefined)
        console.log("got valid claims")

        if (!did) {
          return res
            .status(422)
            .json({ message: "Error: Couldn't login. Invalid did." });
        }

        // Update the addresses nonce in firebase to a new value
        await writeUserData(db, address, uuidv4())

        req.session.user = {
          did,
          address,
          roles,
          csrfToken: uuidv4()
        };
        await req.session.save();
        return res.json({ ok: true });
      } catch (_error) {
        console.log(_error)
        return res.json({ ok: false });
      }

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default withSession(loginRoute);
