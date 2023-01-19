import { Button, Table, Modal, notification } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import AssignElectrician from "./assign_electrician";
import { IamClientContext } from "@providers/iam_client_lib";
import { getAllElectricians } from "@actions/projects/get_all_electricians";
import { assignElectricianToProject } from "@actions/installer";
import SingleElectricianView from "./view_individial_electrician";
import { fetchProjectElectrician } from "@actions/projects/fetch_project_electrician";
import { getAppRoleDefinitions } from "@libs/iam_client_lib/utils/app_role_utils";
import { parseRequestorFields } from "@utils/iam-client-lib/parse_requestor_fields";

const dataSource = (electricians) => {
  if (electricians === undefined) return []
  console.log(electricians)
  return electricians.map((electrician) => {
    return {
      id: electrician.claim.id,
      key: electrician.claim.id,
      name: electrician.parsed.electrician_full_name,
      did: electrician.claim.sub,
    };
  });
};

const StyledTableHeader = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
`

const ViewElectricians = ({ appName, isOwner, isAdmin, isLoading = false }) => {
  const [showAddElectricianModal, setShowAddElectricianModal] = useState(false)
  const [viewedElectrician, setViewedElectrician] = useState({ show: false, electrician: undefined })
  const [orgElectricians, setOrgElectricians] = useState([])
  const [projectElectricians, setProjectElectricians] = useState([])
  const [assignSelected, setAssignSelected] = useState()
  const [assignLoading, setAssignLoading] = useState()
  const { iamClient } = useContext(IamClientContext)

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "DID",
      dataIndex: "did",
      key: "did",
    },
    {
      title: "",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <div style={{ display: 'flex', justifyContent: 'right' }}>
          <Button onClick={() => setViewedElectrician({ show: true, electrician: projectElectricians.find(projectElectrician => projectElectrician.claim.did === record.did) })}>View Electrician Information</Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    async function getOrgElectricians() {
      const electricians = await getAllElectricians(iamClient);
      setOrgElectricians(electricians);
    }
    if (isOwner) {
      getOrgElectricians();
    }
    getProjectElectricians()
  }, [iamClient]);

  const getProjectElectricians = async () => {
    const {APP_INSTALLER_ROLE_NAMESPACE} = getAppRoleDefinitions(appName)
      const electrician = await fetchProjectElectrician(iamClient, APP_INSTALLER_ROLE_NAMESPACE)
      if(!electrician) {
        setProjectElectricians([])
        return
      }
      const parsed = parseRequestorFields(electrician, "data")
      const formatted = {
        claim: electrician,
        parsed: parsed
      }
      console.log(formatted)
      setProjectElectricians([formatted]);
  }

  const handleOk = async (e) => {
    setAssignLoading(true)
    const status = await assignElectricianToProject(iamClient, assignSelected, appName)
    showStatus(status)
    setShowAddElectricianModal(false)
    setAssignSelected(undefined)
    setAssignLoading(false)
  };

  const handleOkViewElectrician = (e) => {
    setViewedElectrician({ show: false, electrician: undefined })
  }

  const showStatus = (status) => {
    if (status.success) {
      const args = {
        message: "Assigned the Electrician!",
        description: "The electrician just needs to publish their verifiable credential to their DID document!",
        duration: 0,
      };
      notification.success(args)
    } else {
      const args = {
        message: "Could not assign electrician!",
        description: status.data,
        duration: 0,
      };
      notification.error(args)
    }
  }

  const handleCancel = (e) => {
    setShowAddElectricianModal(false)
    setAssignSelected(undefined)
    setAssignLoading(false)
  }

  return (
    <div>
      <Table
        dataSource={dataSource(projectElectricians)}
        columns={columns}
        bordered
        title={() => 
          <StyledTableHeader>
            <h1>Electricians</h1>
            {/* {isOwner ? <Button onClick={() => setShowAddElectricianModal(true)} icon={<PlusOutlined />}>Add Electrician</Button> : null} */}
          </StyledTableHeader>
          
        }
        isLoading={isLoading}
      />
      <Modal
        title="Add an Electrician"
        visible={showAddElectricianModal}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Add"
        okButtonProps={{
          disabled: assignSelected === undefined,
          icon: <PlusOutlined />,
          loading: assignLoading
        }}
      >
        <AssignElectrician electricians={orgElectricians} setSelected={setAssignSelected} selected={assignSelected} />
      </Modal>
      <Modal
        title={viewedElectrician?.electrician?.parsed.electrician_full_name ?? "Electrician"}
        visible={viewedElectrician.show}
        onOk={handleOkViewElectrician}
        onCancel={handleOkViewElectrician}
        okText="Close"
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <SingleElectricianView electrician={viewedElectrician?.electrician ?? ""} />
      </Modal>
    </div>
  );
}

export default ViewElectricians;
