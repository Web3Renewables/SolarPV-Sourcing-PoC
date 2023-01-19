import { useEffect } from "react";
import Layout from "@layouts/index";
import { useRouter } from 'next/router';
import { withSessionSsr, getUserFromSession } from "@auth/utils";
import Dashboard from "@components/dashboard";
import { useSession } from "@auth/hooks";
import { Spin } from "antd";
import styled from "styled-components";

export const getServerSideProps = withSessionSsr(getUserFromSession())

const StyledSpinnerContainer = styled.div`
position: absolute;
margin-left: auto;
margin-right: auto;
left: 0;
right: 0;
text-align: center;
flex: 1;
`

const App = ({ user }) => {
  const { isConnected } = useSession();

  const router = useRouter();
  const { did } = user;

  useEffect(() => {
    if ((!did)) {
      router.push("/login");
    }
  }, []);

  return did && (
    <Layout selected="dashboard">
      {isConnected ? <Dashboard user={user} /> : (
        <StyledSpinnerContainer>
          <Spin size="large"/>
        </StyledSpinnerContainer>
      )}
    </Layout>
  );
};

export default App;
