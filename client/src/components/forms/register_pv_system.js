import { useRef, useContext, useState } from 'react';
import { Form, message, notification, Button } from 'antd'
import { IamClientContext } from '@providers/iam_client_lib';
import {
  StyledContainer,
  StyledTitle,
  reformatFormObjectDates,
  filterDictionaryByKeys,
  filterDictionaryExcludeKeys,
  tailLayout
} from '@utils/forms';
import { PVSystemKey, SystemOwnerKey } from '@utils/forms/fields';
import PVSystemDIDForm from './pv_system_did';
import SystemOwnerDIDForm from './system_owner_did';
import { executePVSystemRegistration, executeSystemOwnerRegistration } from '@actions/installer';
import { didPrefix } from '@config/environment';

const RegisterPVSystem = ({ did, disableSystemOwner, disablePVSystem, appId, csrfToken }) => {
  const [pvSystemForm] = Form.useForm();
  const [systemOwnerForm] = Form.useForm();
  const systemOwnerFormRef = useRef()
  const pvSystemFormRef = useRef()
  const { iamClient } = useContext(IamClientContext)
  const [pvSystemLoading, setPVSystemLoading] = useState(false)
  const [systemOwnerLoading, setSystemOwnerLoading] = useState(false)

  const error = () => {
    message.error("Please correctly enter all of the required information")
  }

  const onPVSystemFinish = async (values) => {
    const OFF_CHAIN_KEYS = ["_api_key", "_meter_serial_number", "_latitidue_of_production_device", "_longitude_of_production_device"]
    const dataObject = reformatFormObjectDates(values, 'YYYY-MM-DD')
    const pvSystemData = filterDictionaryByKeys(dataObject, [PVSystemKey])
    const pvSystemDataOnChain = filterDictionaryExcludeKeys(pvSystemData, OFF_CHAIN_KEYS)
    const pvSystemDataOffChain = filterDictionaryByKeys(pvSystemData, OFF_CHAIN_KEYS)
    setPVSystemLoading(true)
    try {
      const keyB64 = await window.ethereum.request({
        method: 'eth_getEncryptionPublicKey',
        params: [(did.replace(didPrefix, ""))],
      })
      await executePVSystemRegistration(iamClient, pvSystemDataOnChain, pvSystemDataOffChain, appId, keyB64, csrfToken)
      notification.success({
        key: "pv_system_registration_success",
        message: "PV System Registration",
        description: "Successfully registered PV System!",
        duration: 0
      })
    } catch (e) {
      notification.error({
        key: "pv_system_registration_error",
        message: "Could not register PV System",
        description: e.message,
        duration: 0
      })
    }
    setPVSystemLoading(false)
  }

  const onSystemOwnerFinish = async (values) => {
    const dataObject = reformatFormObjectDates(values, 'YYYY-MM-DD')
    const systemOwnerData = filterDictionaryByKeys(dataObject, [SystemOwnerKey, 'prefix'])
    setSystemOwnerLoading(true)
    try {
      // Get user's public key
      const keyB64 = await window.ethereum.request({
        method: 'eth_getEncryptionPublicKey',
        params: [(did.replace(didPrefix, ""))],
      })
      await executeSystemOwnerRegistration(iamClient, systemOwnerData, appId, keyB64, csrfToken)
      notification.success({
        key: "pv_system_owner_registration_success",
        message: "System Owner Registration",
        description: "Successfully registered System Owner",
        duration: 0
      })
    } catch (e) {
      console.log(e)
      notification.error({
        key: "pv_system_owner_registration_error",
        message: "Could not register System Owner",
        description: e.message,
        duration: 0
      })
    }
    setSystemOwnerLoading(false)
  };

  const onFinishFailed = async (errorInfo) => {
    console.log('Failed:', errorInfo);
    error()
  };

  return (
    <StyledContainer>
      <StyledTitle level={3}>PV System Registration</StyledTitle>
      <Form
        labelCol={{ span: 4, offset: 0 }}
        wrapperCol={{ span: 8, }}
        initialValues={{ prefix: 1 }}
        labelAlign='left'
        layout="horizontal"
        onFinish={onPVSystemFinish}
        disabled={disablePVSystem}
        form={pvSystemForm}
        ref={pvSystemFormRef}
        onFinishFailed={onFinishFailed}
        name="pv-system-registration"
      >
        <PVSystemDIDForm form={pvSystemForm}/>
        <Form.Item {...tailLayout} style={{ justifyContent: 'center' }}>
          <Button data-testid="submit_button" type="primary" htmlType="submit" loading={pvSystemLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Form
        labelCol={{ span: 4, offset: 0 }}
        wrapperCol={{ span: 8, }}
        initialValues={{ prefix: 1 }}
        labelAlign='left'
        layout="horizontal"
        onFinish={onSystemOwnerFinish}
        disabled={disableSystemOwner}
        form={systemOwnerForm}
        ref={systemOwnerFormRef}
        onFinishFailed={onFinishFailed}
        name="system-owner-registration"
      >
        <StyledTitle level={3}>System Owner Information</StyledTitle>
        <SystemOwnerDIDForm />
        <Form.Item {...tailLayout} style={{ justifyContent: 'center' }}>
          <Button data-testid="submit_button" type="primary" htmlType="submit" loading={systemOwnerLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </StyledContainer>
  )

}

export default RegisterPVSystem;