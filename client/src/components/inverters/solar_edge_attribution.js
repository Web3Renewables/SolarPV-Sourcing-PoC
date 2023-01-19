import { Typography } from "antd";
import styled from "styled-components";

const StyledContainer = styled.div`
display: flex;
flex-direction: column;
`

const PoweredBySolarEdge = () => {

  return <StyledContainer>
    <Typography.Text strong>Powered by</Typography.Text>
    <a href="https://www.solaredge.com/" target="_blank" rel="noreferrer">
      <img src="/solar_edge_logo.svg" width="150px" alt="Solar Edge Logo" />
    </a>
  </StyledContainer>
}

export default PoweredBySolarEdge;