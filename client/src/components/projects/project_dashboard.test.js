import { act, render, screen } from "@testing-library/react";
import { ORG_NAMESPACE, ADMIN_ROLE_NAMESPACE } from "@config/switchboard";
import { getAppRoleDefinitions } from '@libs/iam_client_lib/utils/app_role_utils'
import ProjectDashboard from "./project_dashboard";

const mockProjectName = "project";
const mockProjectNamespace = `project.apps.${ORG_NAMESPACE}`;

const mockInstallerRoles = [
  `project-installer.roles.project.apps.${ORG_NAMESPACE}`,
  `installer.roles.${ORG_NAMESPACE}`,
];

const mockWrongInstallerRoles = [
  `project-installer.roles.bad.apps.${ORG_NAMESPACE}`,
  `installer.roles.${ORG_NAMESPACE}`,
];

const mockElectricianRoles = [
  `project-electrician.roles.project.apps.${ORG_NAMESPACE}`,
  `electrician.roles.${ORG_NAMESPACE}`,
];

const mockWrongElectricianRoles = [
  `project-electrician.roles.bad.apps.${ORG_NAMESPACE}`,
  `electrician.roles.${ORG_NAMESPACE}`,
];

const mockAdminRoles = [
  `admin.roles.${ORG_NAMESPACE}`,
];

const mockProject = {
  id: 416,
  name: mockProjectName,
  owner: "0x9Cd3d45ACd43b4e504c41Ce2023b6408b5Fa1961",
  namespace: mockProjectNamespace,
  namehash:
    "0xae6d9241ad154c3955b7055f04044e7d1f089697f5cb9734905866718a1dd9ef",
  definition: {
    appName: "project0",
  },
}

//user={user} appId={appId} projectInfo={projectInfo}
const mockUserNoRoles = { roles: [] }
const mockUserAdmin = { roles: mockAdminRoles }
const mockUserInstaller = { roles: mockInstallerRoles }
const mockUserElectrician = { roles: mockElectricianRoles }
const mockUserInstallerIncorrectProject = { roles: mockWrongInstallerRoles }
const mockUserElectricianIncorrectProject = { roles: mockWrongElectricianRoles }

const mockProjectInfoNoPVSystem = { appRoleDefinition: getAppRoleDefinitions(mockProject.name), pvSystem: undefined }
const mockProjectInfoNoPVSystemOrAppDefinition = { appRoleDefinition: undefined, pvSystem: undefined }
const mockProjectInfoFull = { appRoleDefinition: getAppRoleDefinitions(mockProject.name), pvSystem: { defined: true } }

describe("no roles", () => {
  test("shows no project information", async () => {

    render(
      <ProjectDashboard
        user={mockUserNoRoles}
        appId={mockProject.id}
        projectInfo={mockProjectInfoNoPVSystem}
        assignedElectrician={false}
      />
    )

    expect(await screen.findByText("Sorry, you are not authorized to access this page.")).toBeInTheDocument();
  });
});

describe("electrician role", () => {
  test("assigned but pv not registered", async () => {

    render(
      <ProjectDashboard
        user={mockUserElectrician}
        appId={mockProject.id}
        projectInfo={mockProjectInfoNoPVSystem}
        assignedElectrician={true}
      />
    )

    expect(await screen.findByText("PV System has not yet been registered!")).toBeInTheDocument();
  });

  test("assigned and pv system registered", async () => {
    render(
      <ProjectDashboard
        user={mockUserElectrician}
        appId={mockProject.id}
        projectInfo={mockProjectInfoFull}
        assignedElectrician={true}
      />
    )

    expect(await screen.findAllByText("View Asset Information")).not.toBe(undefined)
  });

  test("not assigned but exists", async () => {
    render(
      <ProjectDashboard
        user={mockUserElectricianIncorrectProject}
        appId={mockProject.id}
        projectInfo={mockProjectInfoFull}
        assignedElectrician={false}
      />
    )
    
    expect(await screen.findByText("Sorry, you are not authorized to access this page.")).toBeInTheDocument();
  });
});

describe("admin role", () => {
  test("view project information", async () => {
    render(
      <ProjectDashboard
        user={mockUserAdmin}
        appId={mockProject.id}
        projectInfo={mockProjectInfoFull}
        assignedElectrician={false}
      />
    )

    expect(await screen.findAllByText("View Asset Information")).not.toBe(undefined);
  });

  test("view project information - no pv system registered", async () => {
    render(
      <ProjectDashboard
        user={mockUserAdmin}
        appId={mockProject.id}
        projectInfo={mockProjectInfoNoPVSystem}
        assignedElectrician={false}
      />
    )

    expect(await screen.findByText("PV System has not yet been registered!")).not.toBe(undefined);
  });
});

describe("installer role", () => {
  test("loading their project - no pv system", async () => {
    render(
      <ProjectDashboard
        user={mockUserInstaller}
        appId={mockProject.id}
        projectInfo={mockProjectInfoNoPVSystem}
        assignedElectrician={false}
      />
    )

    expect(await screen.findAllByText("Create New Asset")).not.toBe(undefined)
    expect(await screen.findAllByText("View Electricians")).not.toBe(undefined)
  });

  test("loading their project - pv system", async () => {
    render(
      <ProjectDashboard
        user={mockUserInstaller}
        appId={mockProject.id}
        projectInfo={mockProjectInfoFull}
        assignedElectrician={false}
      />
    )
    expect(await screen.findAllByText("View Electricians")).not.toBe(undefined)
    expect(await screen.findAllByText("View Asset Information")).not.toBe(undefined)
  });

  test("loading someone else's project", async () => {
    render(
      <ProjectDashboard
        user={mockUserInstallerIncorrectProject}
        appId={mockProject.id}
        projectInfo={mockProjectInfoFull}
        assignedElectrician={false}
      />
    )
    expect(await screen.findByText("Sorry, you are not authorized to access this page.")).toBeInTheDocument();
  });
});
