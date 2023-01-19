import { useRef, useContext } from 'react';
import {
    Form,
    message,
} from 'antd';

import { 
    submitButton, 
    StyledContainer, 
    StyledTitle, 
    reformatFormObjectDates,
} from '@utils/forms';

import { IamClientContext } from '@providers/iam_client_lib';
import { registerBuilderToOrg } from '@actions/builder'
import QualifyingBuilderForm from './qualifying_builder';


const QualifyingBuilderRegistrationForm = ({did, disableForm}) => {
    const [form] = Form.useForm();
    const formRef = useRef()
    const { iamClient } = useContext(IamClientContext)

    const error = () => {
        message.error("Please correctly enter all of the required information")
    }

    const onFinish = async (values) => {
        const dataObject = reformatFormObjectDates(values, 'YYYY-MM-DD')
        console.log(dataObject)
        registerBuilderData(dataObject)
        
    };

    const registerBuilderData = async (data) => {
        const iamResponse = await registerBuilderToOrg(iamClient, did, data)
        if (iamResponse.success) {
            message.success(iamResponse.message)
        } else {
            message.error(iamResponse.message)
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        error()
    };

    return (
        <StyledContainer>
            <StyledTitle level={2}>Qualifying Builder Registration</StyledTitle>
            <Form
                labelCol={{
                    span: 4,
                    offset: 0
                }}
                wrapperCol={{
                    span: 8,
                }}
                labelAlign='left'
                layout="horizontal"
                onFinish={onFinish}
                disabled={disableForm}
                form={form}
                initialValues={{
                    prefix: '1',
                }}
                ref={formRef}
                onFinishFailed={onFinishFailed}
                name="builder-registration"
            >
                <QualifyingBuilderForm />
                {submitButton}
            </Form>
        </StyledContainer>
    )


}

export default QualifyingBuilderRegistrationForm;