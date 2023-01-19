import { useRef, useContext } from 'react';
import {
    Form,
    Input,
    Radio,
    message,
} from 'antd';
const { TextArea } = Input;

import { IamClientContext } from '@providers/iam_client_lib';
import { getFormItem, submitButton, VALID_TEXT_REGEX, InvalidTextMessage, StyledContainer, StyledTitle, reformatFormObjectDates } from "@utils/forms"
import { electricianRegisterFields } from '@utils/forms/fields';
import { registerElectricianToOrg } from '@actions/electrician';

const ElectricianRegistrationFrom = ({ did, disableForm }) => {
    const [form] = Form.useForm();
    const formRef = useRef()
    const { iamClient } = useContext(IamClientContext)

    const error = () => {
        message.error('Please ensure all requirements have been met!');
    };

    const onFinish = async (values) => {
        const dataObject = reformatFormObjectDates(values, 'YYYY-MM-DD')
        const iamResponse = await registerElectricianToOrg(iamClient, did, dataObject)
        if (iamResponse.success) {
            message.success(iamResponse.message)
        } else {
            message.error(iamResponse.message)
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        error()
    };

    return (
        <StyledContainer>
            <StyledTitle level={2}>Electrician Registration</StyledTitle>
            <Form
                labelCol={{
                    span: 4,
                    offset: 0
                }}
                wrapperCol={{
                    span: 8,
                }}
                disabled={disableForm}
                labelAlign='left'
                layout="horizontal"
                onFinish={onFinish}
                form={form}
                initialValues={{
                    electrician_enforcement_action_radio: 'no',
                    prefix: '1'
                }}
                ref={formRef}
                onFinishFailed={onFinishFailed}
                name="electrician-registration"
            >
                {Object.values(electricianRegisterFields).map(obj => {
                    return getFormItem(obj)
                })}
                <Form.Item
                    label={electricianRegisterFields.EnforcementActionRadio.label}
                    style={{ justifyContent: 'center' }}
                    name={electricianRegisterFields.EnforcementActionRadio.key}
                    rules={[{ required: true, },]}>
                    <Radio.Group>
                        <Radio value="yes"> Yes </Radio>
                        <Radio value="no"> No </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    noStyle
                    style={{ justifyContent: 'center' }}
                    shouldUpdate={(prevValues, currentValues) => prevValues.electrician_enforcement_action_radio !== currentValues.electrician_enforcement_action_radio}>
                    {({ getFieldValue }) => getFieldValue('electrician_enforcement_action_radio') === 'yes' ? (
                        <Form.Item
                            name={electricianRegisterFields.EnforcementAction.key}
                            label={electricianRegisterFields.EnforcementAction.label}
                            style={{ justifyContent: 'center' }}
                            rules={[
                                { required: electricianRegisterFields.EnforcementAction.required, message: electricianRegisterFields.EnforcementAction.requirementMessage },
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
                {submitButton}
            </Form>
        </StyledContainer>
    )
}

export default ElectricianRegistrationFrom;