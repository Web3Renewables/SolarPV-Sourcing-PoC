import { Modal, Card, Typography, notification  } from 'antd'
import { useState } from 'react';
import styled from 'styled-components';

const StyledCard = styled(Card)`
display: flex;
flex-direction: row;
`

const EditPVSystemRoleModal = ({ visible, setEditPVSystemeModal, did, status, reloadIndexCallback, csrfToken }) => {

  const ACTIVE = "Active"
  const REVOKED = "Revoked"

  const oppositeStatus = status === ACTIVE || status === undefined || status === null ? REVOKED : ACTIVE

  const notificationArgs = {
    key: "role_change",
    message: "Role Change",
    duration: 0,
  }

  const [submitLoading, setSubmitLoading] = useState(false)

  const executeAction = async () => {
    setSubmitLoading(true)
    const res = await fetch("/api/index/updatePVSystemRole", {
      method: "POST",
      body: JSON.stringify({ did: did, setStatus: oppositeStatus, csrfToken: csrfToken })
    })
    if (!res.ok) {
      const resJson = await res.json()
      notification.open({...notificationArgs, type:"error", description: resJson.error,});
      setSubmitLoading(false)
    } else {
      const resJson = await res.json()
      notification.open({...notificationArgs, type:"success", description: resJson.message,});
      setSubmitLoading(false)
      setEditPVSystemeModal(false)
      reloadIndexCallback()
    }

  }

  return (
    <Modal
      title="Edit PV System Role"
      visible={visible}
      onCancel={() => setEditPVSystemeModal(false)}
      onOk={async () => executeAction()}
      okButtonProps={{ disabled: submitLoading, loading: submitLoading }}>
      
      <Typography.Paragraph>Are you sure you would like to set the status of {did} to {oppositeStatus} in the Web3 Renewables index?</Typography.Paragraph>

    </Modal >
  )
}

export default EditPVSystemRoleModal;