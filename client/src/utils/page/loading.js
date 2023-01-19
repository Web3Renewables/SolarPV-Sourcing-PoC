import styled from "styled-components"
import { Spin } from "antd"

const ContentStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: auto;
`

const LoadingView = (
  <ContentStyled>
    <Spin size="large" />
  </ContentStyled>
)

export {
  LoadingView
}