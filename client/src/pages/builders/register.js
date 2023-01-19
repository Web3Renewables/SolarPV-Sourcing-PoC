import { useEffect } from "react";
import Layout from "@layouts/index";
import { useRouter } from 'next/router';
import { withSessionSsr, getUserFromSession } from "@auth/utils";
import { useSession } from "@auth/hooks";
import { usePendingRoleClaim } from '@utils/register/hooks';
import { ORG_BUILDER_ROLE_NAMESPACE } from '@config/switchboard';
import QualifyingBuilderRegistrationForm from "@components/forms/register_builder";
import { openNotification } from "@utils/page/notification";


export const getServerSideProps = withSessionSsr(getUserFromSession())

const BuilderRegistration = ({ user }) => {

    useSession();
    const router = useRouter();
    const { did, roles } = user;
    const pendingRoleClaim = usePendingRoleClaim(did, ORG_BUILDER_ROLE_NAMESPACE)

    useEffect(() => {
        if ((!did)) {
            router.push("/login");
        }
        if (roles.includes(ORG_BUILDER_ROLE_NAMESPACE)) {
            openNotification("Qualified Builder Request", "You are already a verified qualified builder!", "qualified_builder_registration")
        } else if (pendingRoleClaim) {
            openNotification("Qualified Builder Request", "You already have a pending request to become a verified qualified builder!", "qualified_builder_registration")
        }
    }, [pendingRoleClaim]);

    return did && (
        <Layout>
            <QualifyingBuilderRegistrationForm did={did} disableForm={pendingRoleClaim || roles.includes(ORG_BUILDER_ROLE_NAMESPACE)} />
        </Layout>
    );


}

export default BuilderRegistration;