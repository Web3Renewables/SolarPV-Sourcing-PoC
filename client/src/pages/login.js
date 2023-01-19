import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { withSessionSsr, getUserFromSession } from "@auth/utils";
import Layout from "@layouts/full_page_login";
import { matchChain } from "@auth/utils/match_chain";
import { Typography } from "antd";
import { chainConfig } from "@config/environment";
import { ENERGY_WEB_CHAIN_ID } from "@config/ewc";

const ConnectButton = dynamic(() => import('@auth/connect_button'), {
  ssr: false,
})

export const getServerSideProps = withSessionSsr(getUserFromSession())

const Login = ({ user }) => {
  const router = useRouter();
  const [chainState, setChainState] = useState({disabled: true, description: ""})

  useEffect(() => {
    const startUp = async () => {
      const {correctChain, desiredChainName} = await getChainInformation()
      if ((user && user.did && correctChain)) {
        router.push("/");
      } else if (!correctChain) {
        setChainState({disabled: true, description: `Please switch your MetaMask chain to the ${desiredChainName} and refresh.`})
      } else {
        setChainState({disabled: false, description: ""})
      }
    }
    startUp()
  }, [user]);

  const getChainInformation = async () => {
    const correctChain = await matchChain()
    const desiredChainName = (chainConfig.chainId === ENERGY_WEB_CHAIN_ID) ? "Energy Web Chain" : "Volta Test Network"
    return {correctChain, desiredChainName}
  }

  return (
    <Layout>
      <ConnectButton disabled={chainState.disabled} />
      {chainState.disabled ? <Typography.Paragraph style={{padding: "10px"}}>{chainState.description}</Typography.Paragraph> : null}
    </Layout>
  )
}

export default Login