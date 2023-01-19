import styled from "styled-components";
import { Layout } from "antd";

import Header from "@components/header";
import Footer from "@components/footer";

// old height: calc(100vh - 110px); // 64px header + 46px footer
const StyledLayoutContainer = styled(Layout.Content)`
  height: calc(100vh - 134px); // 64px header + 70px footer
  display: flex;
  padding: 24px;
  background-color: #fff;
  flex-direction: column;
  overflow: auto;
`;

const MainLayout = ({ children, selected }) => (
  <Layout>
    <Header selected={selected} />

    <StyledLayoutContainer>
      <main>{children}</main>
    </StyledLayoutContainer>

    <Footer />
  </Layout>
);

export default MainLayout;
