import {
  mockDataField,
  ROLETYPES,
  ADMIN,
  INSTALLER,
  ELECTRICIAN,
  BUILDER,
  CONTRACTOR,
  ORG_ROLES_NAMESPACE,
  ADMIN_ROLE_NAMESPACE,
  ORG_ELECTRICIAN_ROLE_NAMESPACE,
  ORG_INSTALLER_ROLE_NAMESPACE,
  ORG_BUILDER_ROLE_NAMESPACE,
  ORG_CONTRACTOR_ROLE_NAMESPACE,
} from "../constants.js";

async function createOrgRoles(domainsService, orgOwnerDid) {
  const orgRoleType = ROLETYPES.ORG;
  const version = 1;
  const orgAdminRoleName = ADMIN;
  const orgInstallerRoleName = INSTALLER;
  const orgElectricianRoleName = ELECTRICIAN;
  const orgBuilderRoleName = BUILDER;
  const orgContractorRoleName = CONTRACTOR;

  console.log("Creating ORG Roles...");

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
    console.log(`${ADMIN_ROLE_NAMESPACE} already exists.`);
  } else {
    await domainsService.createRole({
      roleName: orgAdminRoleName,
      namespace: ORG_ROLES_NAMESPACE,
      data: {
        roleName: orgAdminRoleName,
        roleType: orgRoleType,
        version,
        enrolmentPreconditions: [],
        requestorFields: [mockDataField],
        issuerFields: [],
        metadata: {},
        issuer: { issuerType: "DID", did: [orgOwnerDid] },
        revoker: { revokerType: "DID", did: [orgOwnerDid] },
      },
      returnSteps: false,
    });
    console.log(
      `+++ ${orgAdminRoleName} role ${ADMIN_ROLE_NAMESPACE} is created`
    );
  }

  // ORG INSTALLER
  if (orgInstallerExists) {
    console.log(`${ORG_INSTALLER_ROLE_NAMESPACE} already exists.`);
  } else {
    await domainsService.createRole({
      roleName: orgInstallerRoleName,
      namespace: ORG_ROLES_NAMESPACE,
      data: {
        roleName: orgInstallerRoleName,
        roleType: orgRoleType,
        version,
        enrolmentPreconditions: [],
        requestorFields: [mockDataField],
        issuerFields: [],
        metadata: {},
        issuer: { issuerType: "ROLE", roleName: ADMIN_ROLE_NAMESPACE },
        revoker: { revokerType: "ROLE", roleName: ADMIN_ROLE_NAMESPACE },
      },
      returnSteps: false,
    });
    console.log(
      `+++ ${orgInstallerRoleName} role ${ORG_INSTALLER_ROLE_NAMESPACE} is created`
    );
  }

  // ORG ELECTRICIAN
  if (orgElectricianExists) {
    console.log(`${ORG_ELECTRICIAN_ROLE_NAMESPACE} already exists.`);
  } else {
    await domainsService.createRole({
      roleName: orgElectricianRoleName,
      namespace: ORG_ROLES_NAMESPACE,
      data: {
        roleName: orgElectricianRoleName,
        roleType: orgRoleType,
        version,
        enrolmentPreconditions: [],
        requestorFields: [mockDataField],
        issuerFields: [],
        metadata: {},
        issuer: { issuerType: "ROLE", roleName: ADMIN_ROLE_NAMESPACE },
        revoker: { revokerType: "ROLE", roleName: ADMIN_ROLE_NAMESPACE },
      },
      returnSteps: false,
    });
    console.log(
      `+++ ${orgElectricianRoleName} role ${ORG_ELECTRICIAN_ROLE_NAMESPACE} is created`
    );
  }

  // ORG BUILDER
  if (orgBuilderExists) {
    console.log(`${ORG_BUILDER_ROLE_NAMESPACE} already exists.`);
  } else {
    await domainsService.createRole({
      roleName: orgBuilderRoleName,
      namespace: ORG_ROLES_NAMESPACE,
      data: {
        roleName: orgBuilderRoleName,
        roleType: orgRoleType,
        version,
        enrolmentPreconditions: [],
        requestorFields: [mockDataField],
        issuerFields: [],
        metadata: {},
        issuer: { issuerType: "ROLE", roleName: ADMIN_ROLE_NAMESPACE },
        revoker: { revokerType: "ROLE", roleName: ADMIN_ROLE_NAMESPACE },
      },
      returnSteps: false,
    });
    console.log(
      `+++ ${orgBuilderRoleName} role ${ORG_BUILDER_ROLE_NAMESPACE} is created`
    );
  }

  // ORG CONTRACTOR
  if (orgContractorExists) {
    console.log(`${ORG_CONTRACTOR_ROLE_NAMESPACE} already exists.`);
  } else {
    await domainsService.createRole({
      roleName: orgContractorRoleName,
      namespace: ORG_ROLES_NAMESPACE,
      data: {
        roleName: orgContractorRoleName,
        roleType: orgRoleType,
        version,
        enrolmentPreconditions: [],
        requestorFields: [mockDataField],
        issuerFields: [],
        metadata: {},
        issuer: { issuerType: "ROLE", roleName: ADMIN_ROLE_NAMESPACE },
        revoker: { revokerType: "ROLE", roleName: ADMIN_ROLE_NAMESPACE },
      },
      returnSteps: false,
    });
    console.log(
      `>>> ${orgContractorRoleName} role ${ORG_CONTRACTOR_ROLE_NAMESPACE} is created`
    );
  }
}

export default createOrgRoles;
