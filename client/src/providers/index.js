import SessionProvider from "./session";
import IamClientProvider from "./iam_client_lib";
import GlobalModalProvider from "./gloabl_modal_provider";

const Providers = ({ children }) => (
  <SessionProvider>
    <IamClientProvider>
      <GlobalModalProvider>
        {children}
      </GlobalModalProvider>
    </IamClientProvider>
  </SessionProvider>
);

export default Providers;
