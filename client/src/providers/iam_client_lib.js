import { createContext, useState } from "react";

const defaultIamClient = {
  did: null,
  address: null,
  domainsService: undefined,
  signerService: undefined,
  claimsService: undefined,
  didRegistry: undefined,
  assetsService: undefined,
}
export const IamClientContext = createContext(defaultIamClient);

const IamClientProvider = ({ children }) => {
  const [iamClient, setIamClient] = useState(defaultIamClient);

  return (
    <IamClientContext.Provider
      value={{
        iamClient,
        setIamClient,
      }}
    >
      {children}
    </IamClientContext.Provider>
  );
};

export default IamClientProvider;
