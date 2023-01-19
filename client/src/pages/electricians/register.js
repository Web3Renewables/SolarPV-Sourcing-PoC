import { useEffect, useContext } from "react";
import { openNotification } from "@utils/page/notification";
import Layout from "@layouts/index";
import { useRouter } from 'next/router';
import { withSessionSsr, getUserFromSession } from "@auth/utils";
import { useSession } from "@auth/hooks";
import { usePendingRoleClaim } from '@utils/register/hooks';
import { ORG_ELECTRICIAN_ROLE_NAMESPACE } from '@config/switchboard';
import ElectricianRegistrationForm from "@components/forms/register_electrician";

export const getServerSideProps = withSessionSsr(getUserFromSession())

const ElectricianRegistration = ({ user }) => {

    useSession();
    const router = useRouter();
    const { did, roles } = user;
    const pendingRoleClaim = usePendingRoleClaim(did, ORG_ELECTRICIAN_ROLE_NAMESPACE)

    useEffect(() => {
        if ((!did)) {
            router.push("/login");
        }
        if (roles.includes(ORG_ELECTRICIAN_ROLE_NAMESPACE)) {
            openNotification("Electrician Request", "You are already a verified electrician!", "electrician_request")
        } else if (pendingRoleClaim) {
            openNotification("Electrician Request", "You already have a pending request to become a verified electrician!", "electrician_request")
        }
    }, [pendingRoleClaim]);


    return did && (
        <Layout>
            <ElectricianRegistrationForm did={did} disableForm={pendingRoleClaim || roles.includes(ORG_ELECTRICIAN_ROLE_NAMESPACE)} />
        </Layout>
    );
}

export default ElectricianRegistration;