import styled from "styled-components";
import { Layout } from "antd";

const StyledLayoutContainer = styled(Layout.Content)`
  margin: auto;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const FullPageLoginLayout = ({ children }) => (
  <Layout>
    <StyledLayoutContainer>
      {children}
    </StyledLayoutContainer>
  </Layout>
);

export default FullPageLoginLayout;
