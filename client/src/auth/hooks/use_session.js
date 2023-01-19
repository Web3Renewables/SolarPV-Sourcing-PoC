import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { SessionContext } from "@providers/session";
import { IamClientContext } from "@providers/iam_client_lib";
import connect from "@libs/iam_client_lib/connect";
import disconnect from "@libs/iam_client_lib/disconnect";
import { storeRolesToSession } from "@auth/utils";
import { clearSession } from "@libs/iam_client_lib/utils/session";
import { matchChain } from "@auth/utils/match_chain";
const Web3 = require("web3")

const useSession = () => {
  const router = useRouter();
  const { iamClient, setIamClient } = useContext(IamClientContext);
  const { isLoading, isSessionActive, storeSession } = useContext(
    SessionContext
  );
  const [hasActiveSession, setHasActiveSession] = useState(false);
  const hasSessionParamsInLocalStorage = isSessionActive();

  let { did, address } = iamClient;
  let roles = [];

  const clearSessionAndCookies = async () => {
    clearSession()
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });
    if (res.ok) {
      router.push("/login")
    }
  }

  const reconnectToSession = async () => {
    const correctChain = await matchChain()
    if (!correctChain) {
      return await clearSessionAndCookies()
    }

    const res = await fetch("/api/auth/user", { credentials: "include" });
    if (res.ok) {
      const { did: sessionDid, address: sessionAddress } = (await res.json()).user;

      const web3 = new Web3(Web3.givenProvider)
      const accounts = await web3.eth.getAccounts()
      // Check if the current account is the same one saved in local storage
      if (!accounts.length || accounts[0].toLowerCase() !== sessionAddress.toLowerCase()) {
        // If not, clear cache, cookies, and send user to login page.
        return await clearSessionAndCookies()
      }

      if (!iamClient || !iamClient.did) {
        const {
          domainsService,
          signerService,
          claimsService,
          didRegistry,
          assetsService
        } = await connect();

        setIamClient({
          did: sessionDid,
          address: sessionAddress,
          domainsService,
          signerService,
          claimsService,
          didRegistry,
          assetsService
        });
        await storeRolesToSession();
        storeSession(signerService);
      } else {
        await storeRolesToSession();
        storeSession(iamClient.signerService);
      }

      setHasActiveSession(true);
    } else {
      setHasActiveSession(false);
      router.push("/login");
    }
  };

  // Fetch user when page loads
  useEffect(() => {
    if (hasSessionParamsInLocalStorage) {
      reconnectToSession();
    }

    // If it does not have params in local storage but ended up here,
    // send to login
    if (hasSessionParamsInLocalStorage == null) {
      clearSessionAndCookies()
    }

    return async () => {
      if (iamClient !== undefined && iamClient.signerService !== undefined) {
        await iamClient.signerService.closeConnection()
      }
    }
  }, []);

  const isConnecting = !!isLoading;
  const isConnected = !!(!isLoading && hasActiveSession);

  const logout = async () => {
    if (iamClient.signerService !== undefined) {
      await disconnect(iamClient.signerService);
    }
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (res.ok) {
      window.location = "/login"
    }
  };

  return {
    isConnected,
    logout,
    isConnecting,
    user: {
      did,
      address,
      roles,
    },
  };
};

export default useSession;
