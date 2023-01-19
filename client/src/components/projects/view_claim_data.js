import { Spin, Typography, Card, Empty, Button } from "antd"
import styled from "styled-components"
import DisplayJSON from "@components/layouts/display_json"
import { ClaimState } from '@libs/iam_client_lib/enums'

const StyledCard = styled(Card)`
flex: 1;
overflow: auto;
margin-left: 10px;
height: 100%;
@media (max-width: 768px) {
  margin: 10px;
}
`

const StyledSpinContainer = styled.div`
display: flex;
justify-content: space-evenly;
margin-top: 30px;
`

const StyledButtonContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-evenly;
`

const StyledCardless = styled.div`
margin-top: 20px;
`

const ClaimDisplay = ({ data, level = 4, title = "temp", fieldsObject, refreshPage = () => { }, unpublishedDescription, reRenderableKeys = [], children, isInstaller = false, includeCard = true }) => {

  const getComponent = () => {
    switch (data.state) {
      case ClaimState.LOADING:
        return (
          <StyledSpinContainer>
            <Spin size="medium" />
          </StyledSpinContainer>
        )
      case ClaimState.DECRYPTION_DENIED:
        if (isInstaller) {
          return (
            <StyledButtonContainer>
              <Typography.Text>Due to Metmask restrictions, please refresh the page if you would like to decrypt the system owner information</Typography.Text>
              <Button onClick={() => refreshPage()}>Refresh</Button>
            </StyledButtonContainer>
          )
        } else {
          return <Empty description={"You are not the installer that encrypted this message."} />
        }
      case ClaimState.UNPUBLISHED:
        return <Empty description={unpublishedDescription} />
      case ClaimState.COMPLETE:
        return <DisplayJSON parsedData={data.data} fieldsObject={fieldsObject} reRenderableKeys={reRenderableKeys} />
      case ClaimState.INVALID_ROLE:
        return <Empty description={"You are not the installer that encrypted this message."} />
      default:
        return <Empty />
    }
  }

  return (
    includeCard ? (
      <StyledCard >
        <Typography.Title level={level}>{title}</Typography.Title>
        {getComponent()}
        {children}
      </StyledCard>
    ) : (
      <StyledCardless>
        <Typography.Title level={level}>{title}</Typography.Title>
        {getComponent()}
        {children}
      </StyledCardless>
    )

  )
}

export default ClaimDisplay;