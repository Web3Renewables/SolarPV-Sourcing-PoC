import { Empty } from 'antd';
import styled from 'styled-components';

import DashboardCard from '@components/dashboard/card'
import { ADMIN_ROLE_NAMESPACE } from '@config/switchboard';
import NotAuthorizedView from '@components/layouts/not_authorized';
import { LoadingView } from '@utils/page/loading';

const ContentStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: auto;
`

const NoRolesView = (
  <ContentStyled>
      <NotAuthorizedView />
  </ContentStyled>
)

const AdminView = (appId, pvSystem) => (
  <ContentStyled>
    {
      pvSystem === undefined ? <Empty description="PV System has not yet been registered!"/>
      : <DashboardCard title="View Asset Information" href={`/projects/${appId}/pvSystem`} url="View Asset Information" />
    }
  </ContentStyled>
)

const InstallerView = (appId, pvSystem, systemOwnerExists) => (
  <ContentStyled>
    {pvSystem !== undefined 
      ? AssetExistsView(appId, systemOwnerExists) 
      : <DashboardCard title="Create New Asset" href={`/projects/${appId}/createAsset`} url="Create New Asset" />}  
      <DashboardCard title="View Electricians" href={`/projects/${appId}/electricians`} url="View Electricians" />
  </ContentStyled>
);

const AssetExistsView = (appId, systemOwnerExists) => (
  <>
    {systemOwnerExists ? null : <DashboardCard title="Create New Asset" href={`/projects/${appId}/createAsset`} url="Create New Asset" />}
    <DashboardCard title="View Asset Information" href={`/projects/${appId}/pvSystem`} url="View Asset Information" />
  </>
)

const ElectricianView = (appId, pvSystem) => (
  <ContentStyled>
    {
      pvSystem === undefined ? <Empty description="PV System has not yet been registered!"/>
      : <DashboardCard title="View Asset Information" href={`/projects/${appId}/pvSystem`} url="View Asset Information" />
    }
  </ContentStyled>
);

const ProjectDashboard = ({ user, appId, projectInfo, assignedElectrician}) => {  
  const { roles } = user;
  const { appRoleDefinition, pvSystem , systemOwnerExists} = projectInfo

  const {APP_ELECTRICIAN_ROLE_NAMESPACE, APP_INSTALLER_ROLE_NAMESPACE } = appRoleDefinition  

  const hasNoRoles = (roles === []);
  const isAdmin = (roles.includes(ADMIN_ROLE_NAMESPACE));
  const isInstaller = (roles.includes(APP_INSTALLER_ROLE_NAMESPACE));
  const isElectrician = (roles.includes(APP_ELECTRICIAN_ROLE_NAMESPACE) || assignedElectrician);

  if (assignedElectrician === undefined) return LoadingView
  if (hasNoRoles) return NoRolesView;
  if (isAdmin) return AdminView(appId, pvSystem);
  if (isInstaller) return InstallerView(appId, pvSystem, systemOwnerExists);
  if (isElectrician) return ElectricianView(appId, pvSystem);
  
  return NoRolesView;
};

export default ProjectDashboard;
