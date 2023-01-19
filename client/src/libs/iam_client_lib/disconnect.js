import { clearSession } from "@libs/iam_client_lib/utils/session";

const disconnect = async (signerService) => {
  if (signerService) {
    await signerService.closeConnection();
  }
  clearSession();
};

export default disconnect;
