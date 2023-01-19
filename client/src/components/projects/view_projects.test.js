import { act, render, screen } from "@testing-library/react";
import { ORG_NAMESPACE, ADMIN_ROLE_NAMESPACE } from "@config/switchboard";
import ViewProjects from "./view_projects";

const mockProjectName = "project";
const mockProjectNamespace = `project.apps.${ORG_NAMESPACE}`;
const secondMockProject = `project_2.apps.${ORG_NAMESPACE}`;
const mockProjectInstallerRoles = [
  `project-installer.roles.project.apps.${ORG_NAMESPACE}`,
  `installer.roles.${ORG_NAMESPACE}`,
];
const mockProjects = [
  {
    id: 416,
    name: mockProjectName,
    owner: "0x9Cd3d45ACd43b4e504c41Ce2023b6408b5Fa1961",
    namespace: mockProjectNamespace,
    namehash:
      "0xae6d9241ad154c3955b7055f04044e7d1f089697f5cb9734905866718a1dd9ef",
    definition: {
      appName: "project0",
    },
  },
];

const allProjects = [
  {
    id: 416,
    name: mockProjectName,
    owner: "0x9Cd3d45ACd43b4e504c41Ce2023b6408b5Fa1961",
    namespace: mockProjectNamespace,
    namehash:
      "0xae6d9241ad154c3955b7055f04044e7d1f089697f5cb9734905866718a1dd9ef",
    definition: {
      appName: "project0",
    },
  },
  {
    id: 417,
    name: "temp_name_2",
    owner: "0x9Cd3d45ACd43b4e504c41Ce2023b6408b5Fa1961",
    namespace: secondMockProject,
    namehash:
      "0xae6d9241ad154c3955b7055f04044e7d1f089697f5cb9734905866718a1dd9ef",
    definition: {
      appName: "project1",
    },
  },
];

jest.mock("@actions/projects", () => {
  return {
    __esModule: true,
    ...jest.requireActual('@actions/projects'),
    getAllProjects: jest.fn((iamClient) => mockProjects),
  };
});

describe("no roles", () => {
  test("does not show project in table", async () => {
    await act(async () => render(<ViewProjects roles={[]} />));

    expect(await screen.findByText("No Data")).toBeInTheDocument();
  });
});

describe("admin role", () => {
  jest.mock("@actions/projects", () => {
    return {
      __esModule: true,
      ...jest.requireActual('@actions/projects'),
      filterProjectsForUser: jest.fn([ADMIN_ROLE_NAMESPACE], allProjects, "temp_DID", iamClient => mockProjects),
    };
  });


  test("renders project in table", async () => {
    await act(async () => render(<ViewProjects roles={[ADMIN_ROLE_NAMESPACE]} />));

    expect(await screen.findByText(mockProjectName)).toBeInTheDocument();
    expect(await screen.findByText(mockProjectNamespace)).toBeInTheDocument();
    expect(await screen.findByText("View")).toBeInTheDocument();
  });
});

describe("installer role", () => {
  jest.mock("@actions/projects", () => {
    return {
      __esModule: true,
      ...jest.requireActual('@actions/projects'),
      filterProjectsForUser: jest.fn([ADMIN_ROLE_NAMESPACE], allProjects, "temp_DID", iamClient => mockProjects),
    };
  });

  test("renders project in table", async () => {
    await act( async () => render(<ViewProjects roles={mockProjectInstallerRoles} />));

    // expect(await screen.findByText(mockProjectName)).toBeInTheDocument();
    // expect(await screen.findByText(mockProjectNamespace)).toBeInTheDocument();
    // expect(await screen.findByText("View")).toBeInTheDocument();
  });
});
