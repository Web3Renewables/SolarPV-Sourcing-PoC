import "../styles/globals.css";
import "antd/dist/antd.css";

import { SWRConfig } from "swr";
import Providers from "@providers/index";

const App = ({ Component, pageProps }) => (
  <Providers>
    <SWRConfig
      value={{
        refreshInterval: 10000,
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  </Providers>
);

export default App;
