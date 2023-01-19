import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from "react";
import Layout from "@layouts/index";
import { withSessionSsr, getUserFromSession } from "@auth/utils";
import { getAppRoleDefinitions } from '@libs/iam_client_lib/utils/app_role_utils'
import { Empty } from 'antd';
import RegisterPVSystem from '@components/forms/register_pv_system';
import getProjectFromId from '@actions/projects/get_project_from_id';
import isProjectOwner from '@actions/projects/get_project_owner';
import { IamClientContext } from '@providers/iam_client_lib';
import getPVSystem from '@actions/projects/get_pv_system_from_project';
import { LoadingView } from '@utils/page/loading';
import { openNotification } from '@utils/page/notification';
import NotAuthorizedView from '@components/layouts/not_authorized';
import ErrorView from '@components/layouts/error';
import { useSession } from "@auth/hooks";
import { ADMIN_ROLE_NAMESPACE, PV_SYSTEM } from '@config/switchboard';
import { roleClaimExists } from '@libs/iam_client_lib/utils/role_claim_exists';

export const getServerSideProps = withSessionSsr(getUserFromSession())

const FormView = (did, asset, appId, csrfToken) => {
  if (!asset) {
    return (
      <RegisterPVSystem did={did} disablePVSystem={false} disableSystemOwner={false} appId={appId} csrfToken={csrfToken} />
    )
  } else {
    return (
      <RegisterPVSystem did={did} disablePVSystem={asset.pvSystem} disableSystemOwner={asset.systemOwnerExists} appId={appId} csrfToken={csrfToken} />
    )
  }

}

const CreateAsset = ({ user }) => {

  useSession();
  const router = useRouter()

  const { did, roles, csrfToken } = user;
  const { appId } = router.query
  const { iamClient } = useContext(IamClientContext)
  const [isLoading, setLoading] = useState(true)
  const [isOwner, setIsOwner] = useState(false)
  const [asset, setAsset] = useState(undefined)

  useEffect(() => {
    if ((!did)) {
      router.push("/login");
    }
    const getProject = async () => {
      const project = await getProjectFromId(appId, iamClient)
      if (project !== undefined) {
        const { APP_INSTALLER_ROLE_NAMESPACE, APP_PV_SYSTEM_ROLE_NAMESPACE, APP_SYSTEM_OWNER_NAMESPACE } = getAppRoleDefinitions(project.name)
        const owner = isProjectOwner(APP_INSTALLER_ROLE_NAMESPACE, roles)
        // Check if pv system / owner already exists
        const pvSystem = await getPVSystem(APP_PV_SYSTEM_ROLE_NAMESPACE, iamClient, roles.includes(ADMIN_ROLE_NAMESPACE), did, roles.includes(APP_INSTALLER_ROLE_NAMESPACE), appId, APP_INSTALLER_ROLE_NAMESPACE)
        const systemOwnerExists = (await iamClient.domainsService.getDIDsByRole(APP_SYSTEM_OWNER_NAMESPACE)).length > 0;

        // Check if pv system / owner have current role requests
        const pvSystemRoleClaimExists = (await roleClaimExists(iamClient, APP_PV_SYSTEM_ROLE_NAMESPACE, did)).length > 0
        const systemOwnerRoleClaimExists = (await roleClaimExists(iamClient, APP_SYSTEM_OWNER_NAMESPACE, did)).length > 0
        setLoading(false)
        setIsOwner(owner)
        setAsset({ pvSystem: pvSystem !== undefined || pvSystemRoleClaimExists, systemOwnerExists: systemOwnerExists || systemOwnerRoleClaimExists })
        if (pvSystem !== undefined && owner) {
          openNotification("PV System Registration", "A PV System has already been registered for this project!", "pv_system_registered_already")
        } else if (pvSystemRoleClaimExists && owner) {
          openNotification("PV System Registration", "Your request to register a PV system is being processed.", "pv_system_made_claim_already")
        }
        if(systemOwnerExists && owner) {
          openNotification("System Owner Registration", "A system owner has already been registered for this project!", "system_owner_already")
        } else if (systemOwnerRoleClaimExists && owner) {
          openNotification("System Owner Registration", "Your request to register a system owner is being processed.", "system_owner_made_claim_already")
        }
      } else {
        // Project DNE
        setIsOwner(false)
      }
    }
    getProject()
  }, [iamClient]);

  const getView = () => {
    if (isLoading) {
      return LoadingView
    } else if (!isLoading && !isOwner) {
      return <NotAuthorizedView />
    } else if (isOwner) {
      return FormView(did, asset, appId, csrfToken)
    } else {
      return <ErrorView />
    }
  }

  return did && (
    <Layout>
      {getView()}
    </Layout>
  );


}

export default CreateAsset; 
