import { useContext, useState } from "react";
import { IamClientContext } from "@providers/iam_client_lib";
import { message, Modal, Typography, Spin, Space } from "antd";
import { claimToNameMap } from "@config/switchboard";

const VCModal = ({ modal, setModal, did }) => {

  const { iamClient } = useContext(IamClientContext)
  const [progress, setProgress] = useState(false)
  const claim = modal.claim

  const handleOk = async () => {
    setProgress(true)
    try {
      console.log(claim)
      const ipfsUri = await iamClient.claimsService.publishPublicClaim({
        claim: {
          token: claim.issuedToken,
          claimType: claim.claimType,
        },
        registrationTypes: claim.registrationTypes,
      });
      message.success(`Published VC!`)
    } catch (err) {
      console.log(err)
      message.error(`Could not publish VC: ${err.message}`)
    }
    setProgress(false)
    setModal({ visible: false, claim: {} })
  }

  const handleCancel = () => {
    setModal({ visible: false, claim: {} })
  }

  return (
    <Modal title={claimToNameMap(claim.claimType)} visible={modal.visibile} onOk={handleOk} onCancel={handleCancel} okButtonProps={{ loading: progress }}>
      <Typography.Text>To complete enrollment into the {"\""}{claim.claimType}{"\""} role, you must add your verifiable credential to your DID document. This will make the data pertaining to the role public and permenant.</Typography.Text>
    </Modal>
  )
}

export default VCModal;
