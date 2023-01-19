import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from "react";
import Layout from "@layouts/index";
import { withSessionSsr, getUserFromSession } from "@auth/utils";
import { getAppRoleDefinitions } from '@libs/iam_client_lib/utils/app_role_utils'
import ErrorView from '@components/layouts/error';
import NotAuthorizedView from '@components/layouts/not_authorized';
import Warning from '@components/layouts/warning';
import { IamClientContext } from '@providers/iam_client_lib';
import { LoadingView } from '@utils/page/loading';
import getProjectFromId from '@actions/projects/get_project_from_id';
import isProjectOwner from '@actions/projects/get_project_owner';
import { ADMIN_ROLE_NAMESPACE, ORG_ELECTRICIAN_ROLE_NAMESPACE } from '@config/switchboard';
import { useSession } from "@auth/hooks";
import getPVSystem from '@actions/projects/get_pv_system_from_project';
import ViewAsset from '@components/projects/view_asset/view_asset';
import { decryptSystemOwner } from "@actions/system_owner";
import { ClaimState } from "@libs/iam_client_lib/enums"
import { decryptPVSystemData } from '@actions/projects/decrypt_pv_system_data';

export const getServerSideProps = withSessionSsr(getUserFromSession())

const ViewAssetPage = ({ user }) => {

  useSession();
  const router = useRouter()

  const { did, roles, csrfToken } = user;
  const { appId } = router.query
  const { iamClient } = useContext(IamClientContext)

  const [pageInfo, setPageInfo] = useState({
    isInstaller: false,
    isLoading: true,
    isOwner: false,
    isAdmin: false,
    project: undefined,
    pvSystem: undefined,
  })

  const [systemOwner, setSystemOwner] = useState({ state: ClaimState.LOADING, data: undefined })
  const [pvSystemEncrypted, setPVSystemEncrypted] = useState({ state: ClaimState.LOADING, data: undefined })

  useEffect(() => {
    if ((!did)) {
      router.push("/login");
    }
    const getProject = async () => {
      if(pageInfo.project !== undefined) return
      const project = await getProjectFromId(appId, iamClient)
      if (project !== undefined) {
        const { APP_INSTALLER_ROLE_NAMESPACE, APP_PV_SYSTEM_ROLE_NAMESPACE, APP_SYSTEM_OWNER_NAMESPACE } = getAppRoleDefinitions(project.name)
        const owner = isProjectOwner(APP_INSTALLER_ROLE_NAMESPACE, roles)
        const admin = roles.includes(ADMIN_ROLE_NAMESPACE)

        const pvSystem = await getPVSystem(APP_PV_SYSTEM_ROLE_NAMESPACE, iamClient, admin, did, roles.includes(APP_INSTALLER_ROLE_NAMESPACE), appId, APP_INSTALLER_ROLE_NAMESPACE)
        setPageInfo({
          isInstaller: roles.includes(APP_INSTALLER_ROLE_NAMESPACE),
          isLoading: false,
          isOwner: owner,
          isAdmin: admin,
          project: project,
          pvSystem: pvSystem,
        })
        if(roles.includes(APP_INSTALLER_ROLE_NAMESPACE)) {
          fetchSystemOwner()
          const encrypted = await decryptPVSystemData(window.ethereum, appId, did)
          if(encrypted  === null) {
            setPVSystemEncrypted({state: ClaimState.UNPUBLISHED})
          } else if(!encrypted) {
            setPVSystemEncrypted({state: ClaimState.DECRYPTION_DENIED})
          } else {
            setPVSystemEncrypted({state: ClaimState.COMPLETE, data: encrypted})
          }
        } else {
          setSystemOwner({state: ClaimState.INVALID_ROLE})
          setPVSystemEncrypted({state: ClaimState.INVALID_ROLE})
        }
      } else {
        // Project DNE
        setPageInfo({
          isInstaller: false,
          isLoading: true,
          isOwner: false,
          isAdmin: false,
          project: undefined,
          pvSystem: undefined,
        })
      }
    }
    getProject()
  }, [iamClient.did]);

  const fetchSystemOwner = async () => {
    try {      
      const systemOwnerEncrypted = await decryptSystemOwner(window.ethereum, appId, did)
      // System Owner has not published VC
      if (systemOwnerEncrypted === null) {
        setSystemOwner({ state: ClaimState.UNPUBLISHED })
        return
      } else if (!systemOwnerEncrypted) {
        setSystemOwner({ state: ClaimState.DECRYPTION_DENIED })
        return
      } else {
        setSystemOwner({state: ClaimState.COMPLETE, data: systemOwnerEncrypted})
      }
    } catch (e) {
      console.log(e)
      setSystemOwner({ state: ClaimState.UNPUBLISHED })
    }
  }

  const getView = () => {
    if (pageInfo.isLoading) {
      return LoadingView
    } else if (!pageInfo.isLoading && !pageInfo.isOwner && !pageInfo.isAdmin && !roles.includes(ORG_ELECTRICIAN_ROLE_NAMESPACE) || pageInfo.pvSystem === null) {
      return <NotAuthorizedView />
    } else if (pageInfo.pvSystem !== undefined) {
      return <ViewAsset
        csrfToken={csrfToken}
        did={did}
        appId={appId}
        pvSystem={pageInfo.pvSystem}
        systemOwner={systemOwner} 
        roles={roles}
        isInstaller={pageInfo.isInstaller}
        isAdmin={pageInfo.isAdmin}
        pvSystemEncrypted={pvSystemEncrypted}/>
    } else if (pageInfo.pvSystem == undefined) {
      return <Warning message={"This project does not have an asset created!"} goTo={`/projects/${appId}/`} goToMessage="Go to Project Dashboard" />
    } else {
      return <ErrorView />
    }
  }

  return did && (
    <Layout style={{ alignItems: 'stretch' }}>
      {getView()}
    </Layout>
  );


}

export default ViewAssetPage; 