import {
  ADMIN_ROLE_NAMESPACE,
  ORG_ELECTRICIAN_ROLE_NAMESPACE,
  ORG_INSTALLER_ROLE_NAMESPACE,
  ORG_BUILDER_ROLE_NAMESPACE,
  ORG_CONTRACTOR_ROLE_NAMESPACE,
} from "../constants.js";

async function destroyOrgRoles(domainsService) {
  console.log("Destroying ORG Roles...");

  const orgAdminExists = await domainsService.checkExistenceOfDomain({
    domain: ADMIN_ROLE_NAMESPACE,
  });
  const orgInstallerExists = await domainsService.checkExistenceOfDomain({
    domain: ORG_INSTALLER_ROLE_NAMESPACE,
  });
  const orgElectricianExists = await domainsService.checkExistenceOfDomain({
    domain: ORG_ELECTRICIAN_ROLE_NAMESPACE,
  });
  const orgBuilderExists = await domainsService.checkExistenceOfDomain({
    domain: ORG_BUILDER_ROLE_NAMESPACE,
  });
  const orgContractorExists = await domainsService.checkExistenceOfDomain({
    domain: ORG_CONTRACTOR_ROLE_NAMESPACE,
  });

  // ORG ADMIN
  if (orgAdminExists) {
    await domainsService.deleteRole({
      namespace: ADMIN_ROLE_NAMESPACE,
    });
    console.log(`--- destroyed role ${ADMIN_ROLE_NAMESPACE}.`);
  } else {
    console.log(`${ADMIN_ROLE_NAMESPACE} does not exist.`);
  }

  // ORG INSTALLER
  if (orgInstallerExists) {
    await domainsService.deleteRole({
      namespace: ORG_INSTALLER_ROLE_NAMESPACE,
    });
    console.log(`--- destroyed role ${ORG_INSTALLER_ROLE_NAMESPACE}.`);
  } else {
    console.log(`${ORG_INSTALLER_ROLE_NAMESPACE} does not exist.`);
  }

  // ORG ELECTRICIAN
  if (orgElectricianExists) {
    await domainsService.deleteRole({
      namespace: ORG_ELECTRICIAN_ROLE_NAMESPACE,
    });
    console.log(`--- destroyed role ${ORG_ELECTRICIAN_ROLE_NAMESPACE}.`);
  } else {
    console.log(`${ORG_ELECTRICIAN_ROLE_NAMESPACE} does not exist.`);
  }

  // ORG BUILDER
  if (orgBuilderExists) {
    await domainsService.deleteRole({
      namespace: ORG_BUILDER_ROLE_NAMESPACE,
    });
    console.log(`--- destroyed role ${ORG_BUILDER_ROLE_NAMESPACE}.`);
  } else {
    console.log(`${ORG_BUILDER_ROLE_NAMESPACE} does not exist.`);
  }

  // ORG CONTRACTOR
  if (orgContractorExists) {
    await domainsService.deleteRole({
      namespace: ORG_CONTRACTOR_ROLE_NAMESPACE,
    });
    console.log(`--- destroyed role ${ORG_CONTRACTOR_ROLE_NAMESPACE}.`);
  } else {
    console.log(`${ORG_CONTRACTOR_ROLE_NAMESPACE} does not exist.`);
  }
}

export default destroyOrgRoles;
