import {
  ORG_INSTALLER_ROLE_NAMESPACE,
  ORG_ELECTRICIAN_ROLE_NAMESPACE,
  ADMIN_ROLE_NAMESPACE,
  ORG_NAMESPACE,
  DATA_FIELD,
} from "@config/switchboard";

import {
  APPS_NAMESPACE,
  getAppRoleDefinitions,
  APP_INSTALLER_ROLE_NAME,
  APP_ELECTRICIAN_ROLE_NAME,
  APP_PV_SYSTEM_ROLE_NAME,
  APP_SYSTEM_OWNER_ROLE_NAME,
} from "@libs/iam_client_lib/utils/app_role_utils"

import { RegistrationTypes } from "iam-client-lib";

const version = 1;

const handleProjectCreation = async (iamClient, projectKey, projectLabel, installerDID, progressCallback) => {
  // - Creates a new project for an installer
  //     - Creates the app in switchboard
  //     - Creates the roles under the app
  //     - Assigns the installer to the installer role

  const appRoleDefinitions = getAppRoleDefinitions(projectKey)

  return new Promise(async function (resolve) {
    progressCallback(1, 3)
    const createAppErrorLog = await createAppNamespace(iamClient, projectKey, projectLabel, appRoleDefinitions);

    progressCallback(2, 3)
    const createRolesErrorLog = await createProjectRoles(iamClient, appRoleDefinitions);

    progressCallback(3, 3)
    const assignInstallerToAppErrorLog = await assignInstallerToAppRole(iamClient, installerDID, appRoleDefinitions)

    resolve([...createAppErrorLog, ...createRolesErrorLog, ...assignInstallerToAppErrorLog])
  });



};

// Get all apps - getAppsOfOrg

const createAppNamespace = async (iamClient, projectKey, projectLabel, appRoleDefinitions) => {
  const messageLog = []

  const {
    APP_NAMESPACE
  } = appRoleDefinitions

  const apps = await iamClient.domainsService.getAppsOfOrg(ORG_NAMESPACE);

  const appAlreadyExists = apps.find((app) => app.namespace === APP_NAMESPACE);

  if (!appAlreadyExists) {
    try {
      await iamClient.domainsService.createApplication({
        appName: projectKey,
        namespace: APPS_NAMESPACE,
        data: {
          appName: projectLabel
        },
        returnSteps: false, // Indicates whether to run steps immediately (false) or return steps that can be executed later (true)
      });
    } catch (e) {
      messageLog.push(MessageIAM.APP_UNKOWN(projectKey, e.message))
    }
  } else {
    messageLog.push(MessageIAM.APP_ALREADY_EXISTS(projectKey))
  }

  return messageLog
}

const createProjectRoles = async (iamClient, appRoleDefinitions) => {
  const messageLog = []

  const {
    APP_NAMESPACE,
    APP_ELECTRICIAN_ROLE_NAMESPACE,
    APP_INSTALLER_ROLE_NAMESPACE,
    APP_PV_SYSTEM_ROLE_NAMESPACE,
    APP_SYSTEM_OWNER_NAMESPACE,
    APP_ROLES_NAMESPACE
  } = appRoleDefinitions

  const appInstallerExists = await iamClient.domainsService.checkExistenceOfDomain({
    domain: APP_INSTALLER_ROLE_NAMESPACE,
  });
  const appElectricianExists = await iamClient.domainsService.checkExistenceOfDomain({
    domain: APP_ELECTRICIAN_ROLE_NAMESPACE,
  });
  const appPVSystemExists = await iamClient.domainsService.checkExistenceOfDomain({
    domain: APP_PV_SYSTEM_ROLE_NAMESPACE,
  });
  const appSystemOwnerExists = await iamClient.domainsService.checkExistenceOfDomain({
    domain: APP_SYSTEM_OWNER_NAMESPACE,
  });

  if (!appInstallerExists) {
    try {
      await createAppInstallerRole(iamClient, APP_INSTALLER_ROLE_NAME, APP_ROLES_NAMESPACE)
    } catch (e) {
      messageLog.push(MessageIAM.ROLE_UNKOWN(APP_INSTALLER_ROLE_NAME, e.message))
    }
  } else {
    messageLog.push(MessageIAM.ROLE_ALREADY_EXISTS(APP_INSTALLER_ROLE_NAME))
  }

  // APP ELECTRICIAN
  if (!appElectricianExists) {
    try {
      await createAppElectricianRole(iamClient, APP_ELECTRICIAN_ROLE_NAME, APP_ROLES_NAMESPACE, APP_INSTALLER_ROLE_NAMESPACE)
    } catch (e) {
      messageLog.push(MessageIAM.ROLE_UNKOWN(APP_ELECTRICIAN_ROLE_NAME, e.message))
    }
  } else {
    messageLog.push(MessageIAM.ROLE_ALREADY_EXISTS(APP_ELECTRICIAN_ROLE_NAME))
  }

  // APP PV_SYSTEM
  if (!appPVSystemExists) {
    try {
      await createAppPVSystemRole(iamClient, APP_PV_SYSTEM_ROLE_NAME, APP_ROLES_NAMESPACE)
    } catch (e) {
      messageLog.push(MessageIAM.ROLE_UNKOWN(APP_PV_SYSTEM_ROLE_NAME, e.message))
    }
  } else {
    messageLog.push(MessageIAM.ROLE_ALREADY_EXISTS(APP_PV_SYSTEM_ROLE_NAME))
  }

  // APP SYSTEM_OWNER
  if (!appSystemOwnerExists) {
    try {
      await createAppSystemOwnerRole(iamClient, APP_SYSTEM_OWNER_ROLE_NAME, APP_ROLES_NAMESPACE)
    } catch (e) {
      messageLog.push(MessageIAM.ROLE_UNKOWN(APP_SYSTEM_OWNER_ROLE_NAME, e.message))
    }
  } else {
    messageLog.push(MessageIAM.ROLE_ALREADY_EXISTS(APP_SYSTEM_OWNER_ROLE_NAME))
  }

  return messageLog;
}

const assignInstallerToAppRole = async (iamClient, installerDID, appRoleDefinitions) => {
  const messageLog = []

  const {
    APP_INSTALLER_ROLE_NAMESPACE
  } = appRoleDefinitions

  try {
    await iamClient.claimsService.issueClaim({
      claim: {
        claimType: APP_INSTALLER_ROLE_NAMESPACE,
        claimTypeVersion: 1,
        issuerFields: [],
      },
      subject: installerDID,
      registrationTypes: [RegistrationTypes.OnChain, RegistrationTypes.OffChain]
    });
  } catch (e) {
    messageLog.push(MessageIAM.INSTALLER_ASSIGNMENT(APP_INSTALLER_ROLE_NAMESPACE, installerDID, e.message))
    console.log(e)
  }
  return messageLog;
}

const createAppInstallerRole = async (iamClient, appInstallerRoleName, roleAppNamespace) => {
  // APP INSTALLER
  await iamClient.domainsService.createRole({
    roleName: appInstallerRoleName,
    namespace: roleAppNamespace,
    data: {
      roleName: appInstallerRoleName,
      roleType: "app",
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
}

const createAppElectricianRole = async (iamClient, appElectricianRoleName, roleAppNamespace, appInstallerRoleNamespace) => {
  await iamClient.domainsService.createRole({
    roleName: appElectricianRoleName,
    namespace: roleAppNamespace,
    data: {
      roleName: appElectricianRoleName,
      roleType: "app",
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
      issuer: { issuerType: "ROLE", roleName: appInstallerRoleNamespace },
      revoker: {
        revokerType: "ROLE",
        roleName: appInstallerRoleNamespace,
      },
    },
    returnSteps: false,
  });
}

const createAppPVSystemRole = async (iamClient, appPVSystemRoleName, roleAppNamespace) => {
  await iamClient.domainsService.createRole({
    roleName: appPVSystemRoleName,
    namespace: roleAppNamespace,
    data: {
      roleName: appPVSystemRoleName,
      roleType: "app",
      version,
      enrolmentPreconditions: [],
      requestorFields: [DATA_FIELD],
      issuerFields: [],
      metadata: {},
      issuer: { issuerType: "ROLE", roleName: ADMIN_ROLE_NAMESPACE },
      revoker: { revokerType: "ROLE", roleName: ADMIN_ROLE_NAMESPACE },
    },
    returnSteps: false,
  });
}

const createAppSystemOwnerRole = async (iamClient, appSystemOwnerRoleName, roleAppNamespace) => {
  await iamClient.domainsService.createRole({
    roleName: appSystemOwnerRoleName,
    namespace: roleAppNamespace,
    data: {
      roleName: appSystemOwnerRoleName,
      roleType: "app",
      version,
      enrolmentPreconditions: [],
      requestorFields: [DATA_FIELD],
      issuerFields: [],
      metadata: {},
      issuer: { issuerType: "ROLE", roleName: ADMIN_ROLE_NAMESPACE },
      revoker: { revokerType: "ROLE", roleName: ADMIN_ROLE_NAMESPACE },
    },
    returnSteps: false,
  });
}

const MessageIAMTypes = {
  WARNING: "warning",
  SUCCESS: "success",
  ERROR: "error"
}

const MessageIAM = {
  ROLE_ALREADY_EXISTS: (role) => { return { role: role, message: `${role} role already exists!`, type: MessageIAMTypes.WARNING } },
  ROLE_UNKOWN: (role, errorMessage) => { return { role: role, message: `${role} role could not be created. Error: ${errorMessage}!`, type: MessageIAMTypes.ERROR } },
  APP_ALREADY_EXISTS: (app) => { return { app: app, message: `${app} project already exists!`, type: MessageIAMTypes.WARNING } },
  APP_UNKOWN: (app, errorMessage) => { return { app: app, message: `${app} project could not be created. Error: ${errorMessage}!`, type: MessageIAMTypes.ERROR } },
  INSTALLER_ASSIGNMENT: (app, installer, errorMessage) => { return { app: app, installer: installer, message: `${installer} could not be assigned to ${app}! Error: ${errorMessage}`, type: MessageIAMTypes.ERROR } }
}

export {
  handleProjectCreation,
  MessageIAMTypes
}