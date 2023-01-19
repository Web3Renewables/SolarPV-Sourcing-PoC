import { useRouter } from 'next/router'
import { useEffect, useContext, useState } from "react";
import { IamClientContext } from '@providers/iam_client_lib';
import Layout from "@layouts/index";
import { withSessionSsr, getUserFromSession } from "@auth/utils";
import ProjectDashboard from "@components/projects/project_dashboard";
import { getAppRoleDefinitions } from '@libs/iam_client_lib/utils/app_role_utils'
import getPVSystem from '@actions/projects/get_pv_system_from_project';
import getProjectFromId from '@actions/projects/get_project_from_id';
import { LoadingView } from '@utils/page/loading';
import { useSession } from "@auth/hooks";
import { ADMIN_ROLE_NAMESPACE } from '@config/switchboard';
import { isDIDAssignedElectrician } from '@actions/projects';

export const getServerSideProps = withSessionSsr(getUserFromSession())

const ProjectPage = ({ user }) => {

  useSession();
  const [projectInfo, setProjectInfo] = useState(undefined)
  const { iamClient } = useContext(IamClientContext);
  const [assignedElectrician, setAssignedElectrician] = useState(undefined)

  const router = useRouter()
  const { did, roles } = user;
  const { appId } = router.query

  useEffect(() => {
    const getProject = async () => {
      const project = await getProjectFromId(appId, iamClient)
      if (project !== undefined) {
        const appRoleDefinition = getAppRoleDefinitions(project.name)
        checkAssignedInstaller(appRoleDefinition)
        const pvSystem = await getPVSystem(appRoleDefinition.APP_PV_SYSTEM_ROLE_NAMESPACE, iamClient, roles.includes(ADMIN_ROLE_NAMESPACE), did, roles.includes(appRoleDefinition.APP_INSTALLER_ROLE_NAMESPACE), appId, appRoleDefinition.APP_INSTALLER_ROLE_NAMESPACE)
        const systemOwnerExists = (await iamClient.domainsService.getDIDsByRole(appRoleDefinition.APP_SYSTEM_OWNER_NAMESPACE)).length > 0;
        
        setProjectInfo({ appRoleDefinition: appRoleDefinition, pvSystem: pvSystem, systemOwnerExists: systemOwnerExists })
      }
    }
    getProject()
  }, [iamClient, appId]);

  const checkAssignedInstaller = async ({APP_INSTALLER_ROLE_NAMESPACE}) => {
    if(roles.includes(ADMIN_ROLE_NAMESPACE) || roles.includes(APP_INSTALLER_ROLE_NAMESPACE) || roles.length === 0) {
      setAssignedElectrician(false)
      return
    }
    if(!iamClient || !iamClient.domainsService) return
    const dids = await iamClient.domainsService.getDIDsByRole(APP_INSTALLER_ROLE_NAMESPACE)
    const assignments = await Promise.all(dids.map(async installerDid => {
      return await isDIDAssignedElectrician(installerDid, did, iamClient)
    }))
    if(assignments.length == 0) setAssignedElectrician(false)
    setAssignedElectrician(assignments[0])
  }

  return did && (
    <Layout>
      {
      projectInfo === undefined
      ? LoadingView
      : <ProjectDashboard user={user} appId={appId} projectInfo={projectInfo} assignedElectrician={assignedElectrician} />
      }
    </Layout>
  );


}

export default ProjectPage;