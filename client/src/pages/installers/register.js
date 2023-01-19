import { useEffect } from "react";
import Layout from "@layouts/index";
import { useRouter } from 'next/router';
import { withSessionSsr, getUserFromSession } from "@auth/utils";
import { useSession } from "@auth/hooks";
import { usePendingRoleClaim } from '@utils/register/hooks';
import { ORG_INSTALLER_ROLE_NAMESPACE } from '@config/switchboard';
import InstallerRegistrationFrom from "@components/forms/register_installer"
import { openNotification } from "@utils/page/notification";

export const getServerSideProps = withSessionSsr(getUserFromSession())

const InstallerRegistration = ({ user }) => {

    useSession();
    const router = useRouter();
    const { did, roles, csrfToken } = user;
    const pendingRoleClaim = usePendingRoleClaim(did, ORG_INSTALLER_ROLE_NAMESPACE)

    useEffect(() => {
        if ((!did)) {
            router.push("/login");
        }
        if (roles.includes(ORG_INSTALLER_ROLE_NAMESPACE)) {
            openNotification("Installer Request", "You are already a verified installer!", "installer_request")
        } else if (pendingRoleClaim) {
            openNotification("Installer Request", "You already have a pending request to become a verified installer!", "installer_request")
        }
    }, [pendingRoleClaim]);

    return did && (
        <Layout>
            <InstallerRegistrationFrom did={did} disableForm={pendingRoleClaim || roles.includes(ORG_INSTALLER_ROLE_NAMESPACE)} csrfToken={csrfToken} />
        </Layout>
    );


}

export default InstallerRegistration;