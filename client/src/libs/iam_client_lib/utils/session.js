import { PROVIDER_TYPE } from "../constants";
import { PUBLIC_KEY, IS_ETH_SIGNER } from "iam-client-lib";

export function isSessionActive() {
  if (typeof window === 'undefined') { return false }
  return (
    localStorage.getItem(PROVIDER_TYPE) &&
    localStorage.getItem(PUBLIC_KEY) &&
    localStorage.getItem(IS_ETH_SIGNER)
  );
}

export async function storeSession(signerService) {
  localStorage.setItem(PROVIDER_TYPE, signerService.providerType);
  localStorage.setItem(IS_ETH_SIGNER, signerService.isEthSigner.toString());
  localStorage.setItem(PUBLIC_KEY, await signerService.publicKey());
}

export function clearSession() {
  localStorage.removeItem(PROVIDER_TYPE);
  localStorage.removeItem(PUBLIC_KEY);
  localStorage.removeItem(IS_ETH_SIGNER);
}
