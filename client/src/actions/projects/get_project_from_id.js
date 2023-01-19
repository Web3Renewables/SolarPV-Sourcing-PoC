import { getAllProjects } from "@actions/projects";
const getProjectFromId = async (appId, iamClient) => {
  const projects = await getAllProjects(iamClient);
  return projects.find(project => project.id == appId)
}

export default getProjectFromId;