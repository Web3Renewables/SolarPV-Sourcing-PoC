import { useRef, useContext } from 'react';
import {
    Form,
    Divider,
    message,
} from 'antd';

import { 
    submitButton, 
    StyledContainer, 
    StyledTitle, 
    reformatFormObjectDates,
    filterDictionaryByKeys,
    seperateByPrivateAttribute
} from '@utils/forms';

import {
    QaulifyingBuilder,
    BuildingContractor,
    InstallerKey,
    ElectricianKey,
    BusinessRelationshipKey,
    installerGeneralFields,
    electricianLicenseFields,
    businessRelationshipFields
} from '@utils/forms/fields'

import { IamClientContext } from '@providers/iam_client_lib';
import { registerInstallerToOrg } from '@actions/installer';
import { registerContractorToOrg } from '@actions/contractor';
import GenericInstallerInformation from './general_installer';
import ElectricianLicenseForm from './electrician_license';
import BusinessRelationShipForm from './business_relationship';
import FullBuildingContractorForm from './full_contractor_form';


const InstallerRegistrationForm = ({did, disableForm, csrfToken}) => {
    const [form] = Form.useForm();
    const formRef = useRef()
    const { iamClient } = useContext(IamClientContext)

    const error = () => {
        message.error("Please correctly enter all of the required information")
    }

    const onFinish = async (values) => {
        const dataObject = reformatFormObjectDates(values, 'YYYY-MM-DD')
        const contractorClaimData = filterDictionaryByKeys(dataObject, [QaulifyingBuilder, BuildingContractor, 'prefix'])
        const installerClaimData = filterDictionaryByKeys(dataObject, [InstallerKey, ElectricianKey, BusinessRelationshipKey, 'prefix'])

        registerInstallerData(installerClaimData)
        if(contractorClaimData.building_contractor_radio === 'yes') {
            registerContractorData(contractorClaimData)
        }
    };

    const registerInstallerData = async (data) => {
        const {privateData, publicData} = seperateByPrivateAttribute(data, [installerGeneralFields, electricianLicenseFields, businessRelationshipFields])
        const iamResponse = await registerInstallerToOrg(iamClient, did, publicData, privateData, csrfToken)
        if (iamResponse.success) {
            message.success(iamResponse.message)
        } else {
            message.error(iamResponse.message)
        }
    }

    const registerContractorData = async (data) => {
        const iamResponse = await registerContractorToOrg(iamClient, did, data)
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
            <StyledTitle level={2}>Installer Registration</StyledTitle>
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
                    electrician_enforcement_action_radio: 'no',
                    building_contractor_enforcement_action_radio: 'no',
                    building_contractor_radio: 'no'
                }}
                ref={formRef}
                onFinishFailed={onFinishFailed}
                name="installer-registration"
            >
                <GenericInstallerInformation form={form}/>
                <Divider />
                <ElectricianLicenseForm form={form} />
                <BusinessRelationShipForm form={form}/>
                <Divider />
                <FullBuildingContractorForm form={form}/>
                {submitButton}
            </Form>
        </StyledContainer>
    )


}

export default InstallerRegistrationForm;