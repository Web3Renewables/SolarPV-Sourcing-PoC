import {
    Form,
    Input,
    Radio,
} from 'antd';
const { TextArea } = Input;

import { InvalidTextMessage, VALID_TEXT_REGEX, getFormItem, StyledContainer, StyledTitle  } from "@utils/forms"
import { buildingContractorLicenseFields } from '@utils/forms/fields';

const BuildingContractorForm = () => {

    return (
        <StyledContainer>
            {Object.values(buildingContractorLicenseFields).map(obj => {
                return getFormItem(obj)
            })}
            <Form.Item
                label={buildingContractorLicenseFields.EnforcementActionRadio.label}
                style={{ justifyContent: 'center' }}
                data-testid={buildingContractorLicenseFields.EnforcementActionRadio.key}
                name={buildingContractorLicenseFields.EnforcementActionRadio.key}
                rules={[{ required: buildingContractorLicenseFields.EnforcementActionRadio.required, },]}>
                <Radio.Group>
                    <Radio value="yes" data-testid={`${buildingContractorLicenseFields.EnforcementActionRadio.key}_yes`}> Yes </Radio>
                    <Radio value="no" data-testid={`${buildingContractorLicenseFields.EnforcementActionRadio.key}_no`}> No </Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                noStyle
                style={{ justifyContent: 'center' }}
                shouldUpdate={(prevValues, currentValues) => prevValues.building_contractor_enforcement_action_radio !== currentValues.building_contractor_enforcement_action_radio}>
                {({ getFieldValue }) => getFieldValue(buildingContractorLicenseFields.EnforcementActionRadio.key) === 'yes' ? (
                    <Form.Item
                        name={buildingContractorLicenseFields.EnforcementAction.key}
                        label={buildingContractorLicenseFields.EnforcementAction.label}
                        data-testid={buildingContractorLicenseFields.EnforcementAction.key}
                        style={{ justifyContent: 'center' }}
                        rules={[
                            { required: buildingContractorLicenseFields.EnforcementAction.required, message: buildingContractorLicenseFields.EnforcementAction.requirementMessage },
                            { pattern: VALID_TEXT_REGEX, message: InvalidTextMessage }
                        ]}
                    >
                        <TextArea
                            style={{ resize: 'none' }}
                            autoSize={{ maxRows: 4 }}
                        />
                    </Form.Item>
                ) : null}
            </Form.Item>
        </StyledContainer>
    )
}

export default BuildingContractorForm;