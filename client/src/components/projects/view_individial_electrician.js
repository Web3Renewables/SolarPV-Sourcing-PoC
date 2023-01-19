import { Typography } from "antd";
import styled from "styled-components";
import { electricianRegisterFields } from "@utils/forms/fields";
import { capitalize, reformatFieldsToItemKeys } from "@utils/forms";

const StyledDataContainer = styled.div`
display: flex;
flex-direction: row;
align-items: baseline;
overflow: auto
`

const StyledText = styled(Typography.Text)`
margin-left: 3px;
margin-right: 3px;
`

const DataEntryView = (electrician, key) => {
  const mappedFields = reformatFieldsToItemKeys(electricianRegisterFields)
  if(mappedFields[key] === undefined) return null

  return (
    <StyledDataContainer key={key}>
      <Typography.Title level={5} key={`${key}_label`}>{mappedFields[key].label}: </Typography.Title>
      <StyledText key={`${key}_data`}>{capitalize(electrician.parsed[key])}</StyledText>
    </StyledDataContainer>
  )
}

const SingleElectricianView = ({ electrician }) => {
  console.log(electrician)
  return (
    <>{Object.keys(electrician.parsed).map(key => {
      return DataEntryView(electrician, key)
    })}</>
  )
}

export default SingleElectricianView;