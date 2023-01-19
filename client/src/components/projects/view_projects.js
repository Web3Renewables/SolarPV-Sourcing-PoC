import { useEffect, useContext, useState } from "react";
import { ADMIN_ROLE_NAMESPACE } from "@config/switchboard";
import { IamClientContext } from "@providers/iam_client_lib";
import { getAllProjects, filterProjectsForUser } from "@actions/projects";
import ProjectsTable from "./projects_table";

const ViewProjects = ({ roles, did }) => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { iamClient } = useContext(IamClientContext);

  const isAdmin = roles.includes(ADMIN_ROLE_NAMESPACE);

  useEffect(() => {
    async function fetchProjects() {
      const projects = await getAllProjects(iamClient);

      if (isAdmin) {
        setProjects(projects);
      } else {
        const filteredProjects = await filterProjectsForUser(roles, projects, did, iamClient);
        setProjects(filteredProjects);
      }
      setIsLoading(false);
    }

    fetchProjects();
  }, [iamClient]);

  return <ProjectsTable projects={projects} isLoading={isLoading} />;
};

export default ViewProjects;
