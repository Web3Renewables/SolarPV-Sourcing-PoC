import { render, screen } from "@testing-library/react";
import {
  ADMIN_ROLE_NAMESPACE,
  ORG_INSTALLER_ROLE_NAMESPACE,
  ORG_ELECTRICIAN_ROLE_NAMESPACE,
} from "@config/switchboard";
import Dashboard from "./dashboard";

jest.mock('next/link');
jest.mock('@utils/hooks', () => {
   return {
    __esModule: true,
    useOwner: jest.fn(() => false),
  };
});

const mockUserNoRoles = {
  roles: [],
};
const mockUserAdminRole = {
  roles: [ADMIN_ROLE_NAMESPACE],
};
const mockUserInstallerRole = {
  roles: [ORG_INSTALLER_ROLE_NAMESPACE],
};
const mockUserElectrician = {
  roles: [ORG_ELECTRICIAN_ROLE_NAMESPACE],
};

describe("no roles", () => {
  test("renders correct buttons", () => {
    render(<Dashboard user={mockUserNoRoles} />);

    expect(screen.getByText("Register as Installer")).toBeInTheDocument();
    expect(screen.getByText("Register as Electrician")).toBeInTheDocument();
    expect(screen.getByText("Register as Qualified Builder")).toBeInTheDocument();
  });
});

describe("admin role", () => {
  test("renders correct buttons", () => {
    render(<Dashboard user={mockUserAdminRole} />);

    expect(screen.getByText("View Projects")).toBeInTheDocument();
  });
});

describe("installer role", () => {
  test("renders correct buttons", () => {
    render(<Dashboard user={mockUserInstallerRole} />);

    expect(screen.getByText("View Projects")).toBeInTheDocument();
  });
});

describe("electrician role", () => {
  test("renders correct buttons", () => {
    render(<Dashboard user={mockUserElectrician} />);

    expect(screen.getByText("View Projects")).toBeInTheDocument();
  });
});
