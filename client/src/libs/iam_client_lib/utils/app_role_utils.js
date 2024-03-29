import { ORG_NAMESPACE, INSTALLER, ELECTRICIAN, PV_SYSTEM, SYSTEM_OWNER, MRETS } from '@config/switchboard'

const APPS_NAMESPACE = `apps.${ORG_NAMESPACE}`;
const PROJECT_PREFIX = "project-";

// project-installer
const APP_INSTALLER_ROLE_NAME = `${PROJECT_PREFIX}${INSTALLER}`;
const APP_ELECTRICIAN_ROLE_NAME = `${PROJECT_PREFIX}${ELECTRICIAN}`;
const APP_PV_SYSTEM_ROLE_NAME = `${PROJECT_PREFIX}${PV_SYSTEM}`;
const APP_SYSTEM_OWNER_ROLE_NAME = `${PROJECT_PREFIX}${SYSTEM_OWNER}`;
const APP_MRETS_PV_SYSTEM_ROLE_NAME = `${PROJECT_PREFIX}${MRETS}`;

const getAppRoleDefinitions = (appName) => {
    // app1.apps.org.brayden.ewc
    const APP_NAMESPACE = `${appName}.${APPS_NAMESPACE}`
    // roles.app1.apps.org.brayden.ewc
    const APP_ROLES_NAMESPACE = `roles.${APP_NAMESPACE}`

    // project-electrician.roles.app1.apps.org.brayden.ewc
    const APP_ELECTRICIAN_ROLE_NAMESPACE = `${APP_ELECTRICIAN_ROLE_NAME}.${APP_ROLES_NAMESPACE}`;
    const APP_INSTALLER_ROLE_NAMESPACE = `${APP_INSTALLER_ROLE_NAME}.${APP_ROLES_NAMESPACE}`;
    const APP_PV_SYSTEM_ROLE_NAMESPACE = `${APP_PV_SYSTEM_ROLE_NAME}.${APP_ROLES_NAMESPACE}`;
    const APP_SYSTEM_OWNER_NAMESPACE = `${APP_SYSTEM_OWNER_ROLE_NAME}.${APP_ROLES_NAMESPACE}`;
    const APP_MRETS_ROLE_NAMESPACE = `${APP_MRETS_PV_SYSTEM_ROLE_NAME}.${APP_ROLES_NAMESPACE}`;

    return {
        APP_NAMESPACE,
        APP_ELECTRICIAN_ROLE_NAMESPACE,
        APP_INSTALLER_ROLE_NAMESPACE,
        APP_PV_SYSTEM_ROLE_NAMESPACE,
        APP_SYSTEM_OWNER_NAMESPACE,
        APP_ROLES_NAMESPACE,
        APP_MRETS_ROLE_NAMESPACE
    }
}

export {
    getAppRoleDefinitions
}


module.exports = {
    APPS_NAMESPACE,
    APP_INSTALLER_ROLE_NAME,
    APP_ELECTRICIAN_ROLE_NAME,
    APP_PV_SYSTEM_ROLE_NAME,
    APP_SYSTEM_OWNER_ROLE_NAME,
    APP_MRETS_PV_SYSTEM_ROLE_NAME,
    getAppRoleDefinitions
}
