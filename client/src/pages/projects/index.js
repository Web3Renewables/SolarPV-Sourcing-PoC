import Layout from "@layouts/index";
import { withSessionSsr, getUserFromSession } from "@auth/utils";
import ViewProjects from "@components/projects/view_projects";
import { useSession } from "@auth/hooks";

export const getServerSideProps = withSessionSsr(getUserFromSession());

const Projects = ({ user }) => {
  useSession();
  const { roles, did } = user;
  
  return (
    <Layout>
      <ViewProjects roles={roles} did={did} />
    </Layout>
  );
};

export default Projects;
