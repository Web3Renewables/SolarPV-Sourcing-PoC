import { createContext, useState } from "react";
import {
  isSessionActive,
  storeSession,
  clearSession,
} from "@libs/iam_client_lib/utils/session";

export const SessionContext = createContext();

const SessionProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SessionContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isSessionActive,
        storeSession,
        clearSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
