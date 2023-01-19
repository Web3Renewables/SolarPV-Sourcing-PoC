import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from "react";
import Layout from "@layouts/index";
import { withSessionSsr, getUserFromSession } from "@auth/utils";
import { getAppRoleDefinitions } from '@libs/iam_client_lib/utils/app_role_utils'
import ErrorView from '@components/layouts/error';
import NotAuthorizedView from '@components/layouts/not_authorized';
import ViewElectricians from '@components/projects/view_electricians';
import { IamClientContext } from '@providers/iam_client_lib';
import { LoadingView } from '@utils/page/loading';
import getProjectFromId from '@actions/projects/get_project_from_id';
import isProjectOwner from '@actions/projects/get_project_owner';
import { ADMIN_ROLE_NAMESPACE } from '@config/switchboard';
import { getAllProjectElectricians } from '@actions/projects/get_all_electricians';
import { useSession } from "@auth/hooks";

export const getServerSideProps = withSessionSsr(getUserFromSession())

const ProjectElectriciansPage = ({ user }) => {

    useSession();
    const router = useRouter()

    const { did, roles } = user;
    const { appId } = router.query
    const { iamClient } = useContext(IamClientContext)

    const [pageInfo, setPageInfo] = useState({
        isLoading: true,
        isOwner: false,
        isAdmin: false,
        project: undefined,
        projectElectricians: []
    })

    useEffect(() => {
        if ((!did)) {
            router.push("/login");
        }
        const getProject = async () => {
            const project = await getProjectFromId(appId, iamClient)
            if (project !== undefined) {
                const { APP_INSTALLER_ROLE_NAMESPACE } = getAppRoleDefinitions(project.name)
                const owner = isProjectOwner(APP_INSTALLER_ROLE_NAMESPACE, roles)
                const admin = roles.includes(ADMIN_ROLE_NAMESPACE)

                setPageInfo({
                    isLoading: false,
                    isOwner: owner,
                    isAdmin: admin,
                    project: project,
                })
            } else {
                // Project DNE
                setPageInfo({
                    isLoading: true,
                    isOwner: false,
                    isAdmin: false,
                    project: undefined,
                    projectElectricians: []
                })
            }
        }
        getProject()
    }, [iamClient]);

    const getView = () => {
        if (pageInfo.isLoading) {
            return LoadingView
        } else if (!pageInfo.isLoading && !pageInfo.isOwner && !pageInfo.isAdmin) {
            return <NotAuthorizedView />
        } else if (pageInfo.isOwner || pageInfo.isAdmin) {
            return <ViewElectricians appName={pageInfo.project.name} isOwner={pageInfo.isOwner} isAdmin={pageInfo.isAdmin}/>
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

export default ProjectElectriciansPage; 