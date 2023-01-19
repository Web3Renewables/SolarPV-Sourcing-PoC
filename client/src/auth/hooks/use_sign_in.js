import { useCallback, useContext } from "react";
import { keccak256 } from "ethereumjs-util";
const Web3 = require('web3');
import { useRouter } from "next/router";
import { SessionContext } from "@providers/session";
import { IamClientContext } from "@providers/iam_client_lib";
import connect from "@libs/iam_client_lib/connect";
import { login } from "@auth/utils";

const useSignIn = (ethereum) => {
  const router = useRouter();
  const { setIsLoading, isSessionActive, storeSession } = useContext(
    SessionContext
  );
  const { iamClient, setIamClient } = useContext(IamClientContext);
  const hasActiveSession = isSessionActive();

  const signIn = async () => {
    if (!hasActiveSession) {
      setIsLoading(true);

      try {
        let client;
        if(!iamClient || !iamClient.did) {
          if(iamClient !== undefined && iamClient.signerService !== undefined) {
            await iamClient.signerService.closeConnection()
          }
          client = await connect();
        } else {
          client = iamClient
          client.did = iamClient.signerService.did
          client.address = iamClient.signerService.address
        }

        const nonceRes = await fetch("/api/auth/getNonce", {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({address: client.address})
        })
        if(!nonceRes.ok) {return}
        const nonce = (await nonceRes.json()).nonce

        const signedMessage = keccak256(Buffer.from(nonce)).toString('hex')
        const web3 = new Web3(ethereum)
        const signature = await web3.eth.personal.sign(signedMessage, client.address)

        const res = await login({
          did: client.did,
          address: client.address,
          signature,
        });

        if (res.ok) {
          setIamClient(client);

          storeSession(client.signerService);
          router.push("/");
        }
      } catch (err) {
        console.error(err);
      }

      setIsLoading(false);
    }
  };

  return useCallback(async () => {
    return await signIn();
  }, [signIn]);
};

export default useSignIn;
