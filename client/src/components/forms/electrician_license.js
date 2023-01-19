import {
    Form,
    Input,
    Radio,
} from 'antd';
const { TextArea } = Input;

import { InvalidTextMessage, VALID_TEXT_REGEX, getFormItem, StyledContainer, StyledTitle  } from "@utils/forms"
import { electricianLicenseFields } from '@utils/forms/fields';

const ElectricianLicenseForm = () => {

    return (
        <StyledContainer>
            <StyledTitle level={3}>Electrical Contractor License</StyledTitle>
            {Object.values(electricianLicenseFields).map(obj => {
                return getFormItem(obj)
            })}
            <Form.Item
                label={electricianLicenseFields.EnforcementActionRadio.label}
                style={{ justifyContent: 'center' }}
                name={electricianLicenseFields.EnforcementActionRadio.key}
                data-testid={electricianLicenseFields.EnforcementActionRadio.key}
                rules={[{ required: electricianLicenseFields.EnforcementActionRadio.required, },]}>
                <Radio.Group>
                    <Radio value="yes" data-testid={`${electricianLicenseFields.EnforcementActionRadio.key}_yes`}> Yes </Radio>
                    <Radio value="no" data-testid={`${electricianLicenseFields.EnforcementActionRadio.key}_no`}> No </Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                noStyle
                style={{ justifyContent: 'center' }}
                shouldUpdate={(prevValues, currentValues) => prevValues.electrician_enforcement_action_radio !== currentValues.electrician_enforcement_action_radio}>
                {({ getFieldValue }) => getFieldValue(electricianLicenseFields.EnforcementActionRadio.key) === 'yes' ? (
                    <Form.Item
                        name={electricianLicenseFields.EnforcementAction.key}
                        label={electricianLicenseFields.EnforcementAction.label}
                        data-testid={electricianLicenseFields.EnforcementAction.key}
                        style={{ justifyContent: 'center' }}
                        rules={[
                            { required: electricianLicenseFields.EnforcementAction.required, message: electricianLicenseFields.EnforcementAction.requirementMessage },
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

export default ElectricianLicenseForm;