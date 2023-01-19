import { Button, Input, Select, Modal, Form, message, notification, Progress } from "antd";
import { useContext, useState } from "react";
import { VALID_PROJECT_REGEX, VALID_TEXT_REGEX } from "@utils/forms";
import DashboardCard from "@components/dashboard/card";
import { useInstallerDIDs } from "@utils/hooks";
import { handleProjectCreation, MessageIAMTypes } from "@actions/owner";
import { getEmbeddedObjectFromClaim } from "@utils/iam-client-lib";
import { IamClientContext } from "@providers/iam_client_lib";

const OwnerButton = () => {
  const [modal, setModal] = useState(false)
  const [submitDisabled, setSubmitDisabled] = useState(false)
  const [form] = Form.useForm();
  const installers = useInstallerDIDs()
  const { iamClient } = useContext(IamClientContext)
  const [progress, setProgress] = useState(0)

  const projectNotification = (description, type) => {
    const args = {
      description: description,
      duration: 0,
    };
    switch (type) {
      case MessageIAMTypes.ERROR:
        args.message = "Create Project Error!"
        notification.error(args);
        break;
      case MessageIAMTypes.WARNING:
        args.message = "Create Project Warning!"
        notification.warning(args);
        break;
      default:
        args.message = "Successfully Created Project!"
        notification.success(args);
        break;
    }
  };

  const progressCallback = (current, total) => {
    const percent = Math.floor((current / total) * 100)
    setProgress(percent)
  }

  const handleOk = async (values) => {
    setSubmitDisabled(true)
    handleProjectCreation(iamClient, values.project_key, values.project_name, installers[values.installer].subject, progressCallback).then((errors) => {
      errors.forEach((error) => projectNotification(error.message, error.type))
      if (!errors.length) { projectNotification("Successfully created project, project roles, and assigned the installer!", MessageIAMTypes.SUCCESS) }
      closeModal()
    })
  }

  const handleCancel = (e) => {
    closeModal()
  }

  const onFinishFailed = (error) => {
    console.log(error)
    message.error("Please ensure all your inputs are valid.")
  }

  const closeModal = () => {
    setSubmitDisabled(false)
    setModal(false)
    setProgress(0)
    form.resetFields()
  }

  return (
    <>
      <DashboardCard title="Create a new Project">
        <Button onClick={() => setModal(true)}>Create New Project</Button>
      </DashboardCard>
      <Modal title="Create a New Project"
        visible={modal}
        onOk={async () => form.submit()}
        onCancel={handleCancel}
        okButtonProps={{ disabled: submitDisabled, loading: submitDisabled }}
      >
        <Form
          labelAlign="left"
          form={form}
          onFinish={handleOk}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Project Name"
            name="project_name"
            rules={[
              { required: true, message: "Please enter a project name!" },
              { pattern: VALID_TEXT_REGEX, message: "Please enter a valid project name1" }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Project Key"
            name="project_key"
            rules={[
              { required: true, message: "Please enter a project key!" },
              { pattern: VALID_PROJECT_REGEX, message: "Please enter a valid project key!" }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Installer"
            name="installer"
            rules={[
              { required: true, message: "Please select a project installer!" },
            ]}
          >
            <Select>
              {installers.map((claim, idx) => {
                const parsed = getEmbeddedObjectFromClaim(claim)
                return (
                  <Select.Option key={idx} value={idx}>
                    {parsed.payload?.installer_business_name ?? claim.subject}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
        </Form>
        <Progress percent={progress} />
      </Modal>
    </>
  )
}

export default OwnerButton;