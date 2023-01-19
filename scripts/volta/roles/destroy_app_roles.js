import {
  APP_ELECTRICIAN_ROLE_NAMESPACE,
  APP_INSTALLER_ROLE_NAMESPACE,
  APP_PV_SYSTEM_ROLE_NAMESPACE,
} from "../constants.js";

async function destroyAppRoles(domainsService) {
  console.log("Destroying APP Roles...");

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
    await domainsService.deleteRole({
      namespace: APP_INSTALLER_ROLE_NAMESPACE,
    });
    console.log(`--- destroyed role ${APP_INSTALLER_ROLE_NAMESPACE}.`);
  } else {
    console.log(`${APP_INSTALLER_ROLE_NAMESPACE} does not exist.`);
  }

  // APP ELECTRICIAN
  if (appElectricianExists) {
    await domainsService.deleteRole({
      namespace: APP_ELECTRICIAN_ROLE_NAMESPACE,
    });
    console.log(`--- destroyed role ${APP_ELECTRICIAN_ROLE_NAMESPACE}.`);
  } else {
    console.log(`${APP_ELECTRICIAN_ROLE_NAMESPACE} does not exist.`);
  }

  // APP PV_SYSTEM
  if (appPVSystemExists) {
    await domainsService.deleteRole({
      namespace: APP_PV_SYSTEM_ROLE_NAMESPACE,
    });
    console.log(`--- destroyed role  ${APP_PV_SYSTEM_ROLE_NAMESPACE}.`);
  } else {
    console.log(`${APP_PV_SYSTEM_ROLE_NAMESPACE} does not exist.`);
  }
}

export default destroyAppRoles;
