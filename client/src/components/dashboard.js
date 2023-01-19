import DashboardCard from '@components/dashboard/card'
import styled from 'styled-components';
import { ADMIN_ROLE_NAMESPACE, ORG_ELECTRICIAN_ROLE_NAMESPACE, ORG_INSTALLER_ROLE_NAMESPACE } from '@config/switchboard';

import OwnerButton from './layouts/owner_button';
import { useOwner } from '@utils/hooks';

const ContentStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: auto;
`

const NoRolesView = (
  <ContentStyled>
      <DashboardCard title="Register as Installer" href="/installers/register" url="Register Installer" />
      <DashboardCard title="Register as Electrician" href="/electricians/register" url="Register Electrician" />
      <DashboardCard title="Register as Qualified Builder" href="/builders/register" url="Register Builder" />
  </ContentStyled>
)

const AdminView =  (
  <ContentStyled>
    <DashboardCard title="View Projects" href="/projects" url="View All Projects" />
  </ContentStyled>
)

const OwnerView = (
  <ContentStyled>
    <DashboardCard title="View Projects" href="/projects" url="View All Projects" />
    <OwnerButton />
  </ContentStyled>
)

const InstallerView = (
  <ContentStyled>
    <DashboardCard title="View Projects" href="/projects" url="View My Projects" />
  </ContentStyled>
);

const ElectricianView = (
  <ContentStyled>
    <DashboardCard title="View Projects" href="/projects" url="View My Projects" />
  </ContentStyled>
);

const Dashboard = ({ user }) => {
  const { roles, address } = user;
  const owner = useOwner(address)

  if (!roles) { return };

  const hasNoRoles = (roles === []);
  const isAdmin = (roles.includes(ADMIN_ROLE_NAMESPACE));
  const isElectrician = (roles.includes(ORG_ELECTRICIAN_ROLE_NAMESPACE));
  const isInstaller = (roles.includes(ORG_INSTALLER_ROLE_NAMESPACE));

  if (hasNoRoles) return NoRolesView;
  if (owner) return OwnerView;
  if (isAdmin) return AdminView;
  if (isElectrician) return ElectricianView;
  if (isInstaller) return InstallerView;

  return NoRolesView;
};

export default Dashboard;
