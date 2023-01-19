import { Typography, Card, Empty } from "antd";
import styled from "styled-components";
import { capitalize, reformatFieldsToItemKeys, capitalizeAll } from "@utils/forms";

const StyledDataContainer = styled.div`
display: flex;
flex-direction: column;
align-items: baseline;
margin: 4px;
`
const StyledCard = styled(Card)`
flex: 1;
overflow: auto;
margin-left: 10px;
@media (max-width: 768px) {
  margin: 10px;
}
`

const DataEntryView = (parsedData, key, fieldsObject,reRenderableKeys) => {
  const mappedFields = reformatFieldsToItemKeys(fieldsObject)
  if (mappedFields[key] === undefined) return null

  let value = parsedData[key]
  if(reRenderableKeys.includes(key)) {
    value = value.replaceAll("_", " ")
    value = capitalizeAll(value)
  }

  return (
    <StyledDataContainer key={key}>
      <Typography.Text strong key={`${key}_label`}>{mappedFields[key].label}: </Typography.Text>
      <Typography.Text key={`${key}_data`}>{capitalize(value)}</Typography.Text>
    </StyledDataContainer>
  )
}

const getView = (parsedData, fieldsObject, reRenderableKeys) => {
  if (!parsedData) return <Empty />
  if (!fieldsObject) return <Empty />
  return Object.keys(parsedData)?.map(key => {
    return DataEntryView(parsedData, key, fieldsObject, reRenderableKeys)
  })
}

const DisplayJSON = ({ parsedData, fieldsObject, reRenderableKeys = []}) => {
  if (parsedData === undefined) {
    return (
      <Empty />
    )
  } else {
    return (
      getView(parsedData, fieldsObject, reRenderableKeys)
    )
  }
}

export default DisplayJSON;