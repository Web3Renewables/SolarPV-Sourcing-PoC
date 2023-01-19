import {
  ROLETYPES,
  INSTALLER,
  ELECTRICIAN,
  PV_SYSTEM,
  ADMIN_ROLE_NAMESPACE,
  ORG_INSTALLER_ROLE_NAMESPACE,
  ORG_ELECTRICIAN_ROLE_NAMESPACE,
  APP_ELECTRICIAN_ROLE_NAMESPACE,
  APP_INSTALLER_ROLE_NAMESPACE,
  APP_PV_SYSTEM_ROLE_NAMESPACE,
  APP_ROLES_NAMESPACE,
  PROJECT_PREFIX,
} from "../constants.js";

async function createAppRoles(domainsService) {
  const appRoleType = ROLETYPES.APP;
  const version = 1;
  const appInstallerRoleName = `${PROJECT_PREFIX}${INSTALLER}`;
  const appElectricianRoleName = `${PROJECT_PREFIX}${ELECTRICIAN}`;
  const appPVSystemRoleName = `${PROJECT_PREFIX}${PV_SYSTEM}`;

  console.log("Creating APP Roles...");

  const appInstallerExists = await domainsService.checkExistenceOfDomain({
    domain: APP_INSTALLER_ROLE_NAMESPACE,
  });
  const appElectricianExists = await domainsService.checkExistenceOfDomain({
    domain: APP_ELECTRICIAN_ROLE_NAMESPACE,
  });
  const appPVSystemExists = await domainsService.checkExistenceOfDomain({
    domain: APP_PV_SYSTEM_ROLE_NAMESPACE,
  });

  // APP INSTALLER
  if (appInstallerExists) {
    console.log(`${APP_INSTALLER_ROLE_NAMESPACE} already exists.`);
  } else {
    await domainsService.createRole({
      roleName: appInstallerRoleName,
      namespace: APP_ROLES_NAMESPACE,
      data: {
        roleName: appInstallerRoleName,
        roleType: appRoleType,
        version,
        enrolmentPreconditions: [
          {
            type: "role",
            conditions: [ORG_INSTALLER_ROLE_NAMESPACE],
          },
        ],
        requestorFields: [],
        issuerFields: [],
        metadata: {},
        issuer: { issuerType: "ROLE", roleName: ADMIN_ROLE_NAMESPACE },
        revoker: { revokerType: "ROLE", roleName: ADMIN_ROLE_NAMESPACE },
      },
      returnSteps: false,
    });
    console.log(
      `+++ ${appInstallerRoleName} role ${APP_INSTALLER_ROLE_NAMESPACE} is created`
    );
  }

  // APP ELECTRICIAN
  if (appElectricianExists) {
    console.log(`${APP_ELECTRICIAN_ROLE_NAMESPACE} already exists.`);
  } else {
    await domainsService.createRole({
      roleName: appElectricianRoleName,
      namespace: APP_ROLES_NAMESPACE,
      data: {
        roleName: appElectricianRoleName,
        roleType: appRoleType,
        version,
        enrolmentPreconditions: [
          {
            type: "role",
            conditions: [ORG_ELECTRICIAN_ROLE_NAMESPACE],
          },
        ],
        requestorFields: [],
        issuerFields: [],
        metadata: {},
        issuer: { issuerType: "ROLE", roleName: APP_INSTALLER_ROLE_NAMESPACE },
        revoker: {
          revokerType: "ROLE",
          roleName: APP_INSTALLER_ROLE_NAMESPACE,
        },
      },
      returnSteps: false,
    });
    console.log(
      `+++ ${appElectricianRoleName} role ${APP_ELECTRICIAN_ROLE_NAMESPACE} is created`
    );
  }

  // APP PV_SYSTEM
  if (appPVSystemExists) {
    console.log(`${APP_PV_SYSTEM_ROLE_NAMESPACE} already exists.`);
  } else {
    await domainsService.createRole({
      roleName: appPVSystemRoleName,
      namespace: APP_ROLES_NAMESPACE,
      data: {
        roleName: appPVSystemRoleName,
        roleType: appRoleType,
        version,
        enrolmentPreconditions: [],
        requestorFields: [],
        issuerFields: [],
        metadata: {},
        issuer: { issuerType: "ROLE", roleName: ADMIN_ROLE_NAMESPACE },
        revoker: { revokerType: "ROLE", roleName: ADMIN_ROLE_NAMESPACE },
      },
      returnSteps: false,
    });
    console.log(
      `+++ ${appPVSystemRoleName} role ${APP_PV_SYSTEM_ROLE_NAMESPACE} is created`
    );
  }
}

export default createAppRoles;
