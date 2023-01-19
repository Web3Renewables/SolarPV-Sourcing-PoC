import { Form, Select, Button, Row, Col } from "antd";
import { StyledContainer, StyledTitle, tailLayout } from "@utils/forms"
import { electricianRegisterFields, InstallerKey } from "@utils/forms/fields";
import { useContext, useEffect, useState } from "react";
import { IamClientContext } from "@providers/iam_client_lib";
import { getAllElectricians } from "@actions/projects/get_all_electricians";
import { InfoCircleOutlined } from "@ant-design/icons";
import { GlobalModalContext } from "@providers/gloabl_modal_provider";
import DisplayJSON from "@components/layouts/display_json";

const BusinessRelationShipForm = () => {

  const [electricians, setElectricians] = useState([])
  const [selected, setSelected] = useState(undefined)
  const [loading, setLoading] = useState(true)
  const { iamClient } = useContext(IamClientContext)
  const { setOpen } = useContext(GlobalModalContext)

  useEffect(() => {
    if (!iamClient || !iamClient.domainsService || !iamClient.claimsService) return
    fetchElectricians()
  }, [iamClient.did])

  const fetchElectricians = async () => {
    const fetched = await getAllElectricians(iamClient)
    if (!fetched || !fetched.length) return
    setElectricians(fetched)
    setLoading(false)
  }

  const onElectricianView = () => {
    const parsedData = electricians.find(obj => obj.claim.did === selected.value)
    if (!parsedData) return
    return (
      <DisplayJSON
        reRenderableKeys={[]}
        fieldsObject={electricianRegisterFields}
        parsedData={parsedData.parsed}
      />
    )
  }

  return (
    <StyledContainer>
      <StyledTitle level={3}>Required Business Relationship: Electrical Contractor License</StyledTitle>
      <Form.Item
        label={"Electrician"}
        name={`${InstallerKey}_electrician_business_relationship_did`}
        key={`${InstallerKey}_electrician_business_relationship_did`}
        data-testid={`${InstallerKey}_electrician_business_relationship_did`}
        style={{ justifyContent: 'center' }}
        rules={[
          { required: true, message: "Please select an electrician you have a business relationship with!" },
        ]}
      >
        <Select
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
          options={electricians.map(electrician => {
            // Value = key, label = visible
            return { value: electrician.claim.did, label: electrician.parsed.electrician_full_name }
          })}
          loading={loading}
          onChange={(value, object) => setSelected(object)}
        />
      </Form.Item>
      <Form.Item {...tailLayout} style={{ justifyContent: 'center' }}>
        <Button
          shape="sqaure"
          icon={<InfoCircleOutlined />}
          disabled={selected === undefined}
          onClick={() => setOpen({ show: true, component: onElectricianView(), title: selected.label })}>
          Show Electrician Information
        </Button>
      </Form.Item>
    </StyledContainer>
  )
}

export default BusinessRelationShipForm;