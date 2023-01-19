const ROOT_NAMESPACE = process.env.NEXT_PUBLIC_SWITCHBOARD_ROOT_NAMESPACE;
const ORG_NAME = process.env.NEXT_PUBLIC_SWITCHBOARD_ORG_NAME;
const ORG_NAMESPACE = `${ORG_NAME}.${ROOT_NAMESPACE}`;

const ADMIN = "admin";
const INSTALLER = "installer";
const ELECTRICIAN = "electrician";
const BUILDER = "builder";
const PV_SYSTEM = "pv-system";
const CONTRACTOR = "contractor";
const SYSTEM_OWNER = "system-owner";
const MRETS = "m-rets";

// roles.org.brayden.ewc // roles.newtestorg.iam.ewc
const ORG_ROLES_NAMESPACE = `roles.${ORG_NAMESPACE}`

// admin.roles.org.brayden.ewc
const ADMIN_ROLE_NAMESPACE = `${ADMIN}.${ORG_ROLES_NAMESPACE}`;
const ORG_INSTALLER_ROLE_NAMESPACE = `${INSTALLER}.${ORG_ROLES_NAMESPACE}`;
const ORG_ELECTRICIAN_ROLE_NAMESPACE = `${ELECTRICIAN}.${ORG_ROLES_NAMESPACE}`;
const ORG_BUILDER_ROLE_NAMESPACE = `${BUILDER}.${ORG_ROLES_NAMESPACE}`;
const ORG_CONTRACTOR_ROLE_NAMESPACE = `${CONTRACTOR}.${ORG_ROLES_NAMESPACE}`;

const claimToNameMap = (claimType) => {
  let message = "3rd Party"
  if (claimType?.includes(`project-${PV_SYSTEM}`)) {
    message = "Registered PV System"
  } else if (claimType?.includes(`project-${MRETS}`)) {
    message = "M-RETS Registration"
  } else if (claimType?.includes(`project-${ELECTRICIAN}`)) {
    message = "Assigned Electrician"
  } else if (claimType?.includes(SYSTEM_OWNER)) {
    message = "System Owner"
  } else if (claimType?.includes(CONTRACTOR)) {
    message = "Contractor"
  } else if (claimType?.includes(BUILDER)) {
    message = "Builder"
  } else if (claimType?.includes(ELECTRICIAN)) {
    message = "Electrician"
  } else if (claimType?.includes(INSTALLER)) {
    message = "Installer"
  } else if (claimType?.includes(ADMIN)) {
    message = "Admin"
  }
  return `Publish ${message} VC`
}

const DATA_FIELD = {
  fieldType: "text",
  label: "data",
  required: true,
}

const MRETS_ISSUER_FIELD = {
  fieldType: "text",
  label: "generatorId",
  required: true,
}


module.exports = {
  ROOT_NAMESPACE,
  ORG_NAME,
  ORG_NAMESPACE,
  ADMIN,
  INSTALLER,
  ELECTRICIAN,
  BUILDER,
  PV_SYSTEM,
  CONTRACTOR,
  SYSTEM_OWNER,
  MRETS,
  ADMIN_ROLE_NAMESPACE,
  ORG_INSTALLER_ROLE_NAMESPACE,
  ORG_ELECTRICIAN_ROLE_NAMESPACE,
  ORG_BUILDER_ROLE_NAMESPACE,
  ORG_CONTRACTOR_ROLE_NAMESPACE,
  ORG_ROLES_NAMESPACE,
  DATA_FIELD,
  MRETS_ISSUER_FIELD,
  claimToNameMap
}