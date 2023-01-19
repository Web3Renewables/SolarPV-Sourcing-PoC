const BALANCING_AUTHORITY_OPTIONS = [
  { key: 'Midcontinent Independent System Operator, Inc.', value: 'Midcontinent Independent System Operator, Inc.' }
]

const InputFieldTypes = {
  Text: "text",
  Phone: "phone",
  Date: "date",
  Radio: "radio",
  Upload: "upload",
  TextArea: "textarea",
  ComboBox: "combo_box",
  MretsRadio: "mrets_radio",
  Title: "title",
  CheckBoxes: "checkboxes",
  DynamicComboBox: "dynamic_combo_box",
  NotInclude: "not_include",
  CountryState: "country_state",
  ComboBoxDependencies: "combo_box_dependencies",
  AutoComplete: "autocomplete",
  Button: "button"
}

const SuffixTypes = {
  Text: "text",
  TooltipButton: "tooltip_button",
  Tooltip: "tooltip"
}

const InstallerKey = `installer`
const ElectricianKey = `electrician`
const BusinessRelationshipKey = `business_relationship`
const BuildingContractor = `building_contractor`
const QaulifyingBuilder = `qualifying_builder`
const PVSystemKey = `pv_system`
const SystemOwnerKey = `system_owner`

const createElectricianRegistrationFields = () => {
  return Object.assign({}, personalFields(ElectricianKey), licenseFields(ElectricianKey), enforcementActionRadio(ElectricianKey))
}

const createInstallerGeneralFields = () => {
  return installerPersonalFields(InstallerKey)
}

const createElectriciansLicenseFields = () => {
  return Object.assign({}, licenseFields(ElectricianKey), enforcementActionRadio(ElectricianKey));
}

const createBusinessRelationshipsFields = () => {
  return Object.assign({}, businessRelationshipPersonal(BusinessRelationshipKey), licenseFields(BusinessRelationshipKey))
}

const createBuildingContractorFields = () => {
  return Object.assign({}, licenseFields(BuildingContractor), enforcementActionRadio(BuildingContractor));
}

const createQaulifyingBuilderFields = () => {
  return Object.assign({}, personalFields(QaulifyingBuilder), licenseFields(QaulifyingBuilder));
}

const createPvSystemDIDFields = () => {
  return Object.assign({}, pvSystem(PVSystemKey));
}

const licenseFields = (key) => {
  return ({
    ClassType: {
      label: `Class Type`,
      key: `${key}_class_type`,
      required: true,
      requirementMessage: 'Please input the class type!',
      type: InputFieldTypes.Text
    },
    LicenseNumber: {
      label: `License Number`,
      key: `${key}_license_number`,
      required: true,
      requirementMessage: 'Please input the license number!',
      type: InputFieldTypes.Text
    },
    ApplicationNumber: {
      label: `Application Number`,
      key: `${key}_application_number`,
      required: true,
      requirementMessage: 'Please input the application number!',
      type: InputFieldTypes.Text
    },
    Status: {
      label: `Status`,
      key: `${key}_status`,
      required: true,
      requirementMessage: 'Please input the license status!',
      type: InputFieldTypes.ComboBox,
      options: [
        { key: 'issued', value: 'Issued' },
        { key: 'revoked', value: 'Revoked' },
      ]
    },
    EnforcementAction: {
      label: `Enforcement Action`,
      key: `${key}_enforcement_action`,
      required: true,
      requirementMessage: 'Please enter the enforcement action information!',
      type: InputFieldTypes.TextArea
    },
    ExpirationDate: {
      label: `Expiration Date`,
      key: `${key}_expiration_date`,
      required: true,
      requirementMessage: 'Please input the license\'s expiration date!',
      type: InputFieldTypes.Date
    },
    EffectiveDate: {
      label: `Effective Date`,
      key: `${key}_effective_date`,
      required: true,
      requirementMessage: 'Please input the license\'s effective date!',
      type: InputFieldTypes.Date
    },
    OriginationDate: {
      label: `Origination Date`,
      key: `${key}_origination_date`,
      required: true,
      requirementMessage: 'Please input the license\'s origination date!',
      type: InputFieldTypes.Date
    },
    PrintDate: {
      label: `Print Date`,
      key: `${key}_print_date`,
      required: false,
      requirementMessage: 'Please input the license\'s print date!',
      type: InputFieldTypes.Date
    },
  })
}

const enforcementActionRadio = (key) => {
  return ({
    EnforcementActionRadio: {
      label: `Enforcement Action`,
      key: `${key}_enforcement_action_radio`,
      required: true,
      requirementMessage: '',
      type: InputFieldTypes.Radio
    },
  })
}

const installerPersonalFields = () => {
  return ({
    BusinessName: {
      label: `Business Name`,
      key: `${InstallerKey}_business_name`,
      required: true,
      requirementMessage: `Please enter the business's name!`,
      type: InputFieldTypes.Text
    },
    BusinessAddress: {
      label: `Business Address`,
      key: `${InstallerKey}_business_address`,
      required: true,
      requirementMessage: `Please enter the business's address!`,
      type: InputFieldTypes.Text
    },
    BusinessWebsite: {
      label: `Business Website`,
      key: `${InstallerKey}_business_website`,
      required: false,
      requirementMessage: `Please enter the business's website!`,
      type: InputFieldTypes.Text
    },
    OwnerName: {
      label: `Owner Name`,
      key: `${InstallerKey}_owner_name`,
      required: true,
      requirementMessage: `Please enter the business owner's name!`,
      type: InputFieldTypes.Text
    },
    CompanyEIN: {
      label: `Company EIN`,
      key: `${InstallerKey}_company_ein`,
      required: false,
      requirementMessage: `Please enter the business's EIN!`,
      type: InputFieldTypes.Text,
      private: true
    },
    ContactPhoneNumber: {
      label: `Contact Phone Number`,
      key: `${InstallerKey}_contact_phone_number`,
      required: true,
      requirementMessage: `Please enter a phone number!`,
      type: "phone"
    },
    ContactEmailAddress: {
      label: `Contact Email Address`,
      key: `${InstallerKey}_contact_email`,
      required: true,
      requirementMessage: `Please enter an email address!`,
      type: InputFieldTypes.Text
    },
  })
}


const businessRelationshipPersonal = (key) => {
  return ({
    ElectricianName: {
      label: `Electrician's Name`,
      key: `${key}_electrician_name`,
      required: true,
      requirementMessage: 'Please input the electrician\'s name!',
      type: InputFieldTypes.Text
    }
  })
}

const personalFields = (key) => {
  return ({
    FullName: {
      label: `Full Name`,
      key: `${key}_full_name`,
      required: true,
      requirementMessage: 'Please input your full name!',
      type: InputFieldTypes.Text
    },
    Address: {
      label: `Address`,
      key: `${key}_address`,
      required: true,
      requirementMessage: 'Please input your address!',
      type: InputFieldTypes.Text
    },
    PhoneNumber: {
      label: `Phone Number`,
      key: `${key}_phone_number`,
      required: true,
      requirementMessage: 'Please input your phone number!',
      type: InputFieldTypes.Phone
    },
  })
}

const emailField = (key) => {
  return ({
    Email: {
      label: `Email Address`,
      key: `${key}_email_address`,
      required: true,
      requirementMessage: 'Please input your email address!',
      type: InputFieldTypes.Text
    },
  })
}

// Upload done seperately
const pvSystem = (key) => {
  return ({
    PVSystemCapacity: {
      label: "AC Inverter Rating (#.## kW)",
      key: `${key}_pv_system_capacity`,
      required: true,
      requirementMessage: 'Please input the AC inverter rating!',
      type: InputFieldTypes.Text
    },
    PVSystemCapacityDC: {
      label: "DC Inverter Rating (#.## kW)",
      key: `${key}_pv_system_capacity_dc`,
      required: true,
      requirementMessage: 'Please input the DC inverter rating!',
      type: InputFieldTypes.Text
    },
    MeterId: {
      label: "Meter ID",
      key: `${key}_meter_id`,
      required: true,
      requirementMessage: 'Please input the PV System\'s meter ID!',
      type: InputFieldTypes.Text
    },
    BalancingAuthority: {
      label: "Balancing Authority",
      key: `${key}_balancing_authority`,
      required: true,
      requirementMessage: "Please select a balancing authority",
      type: InputFieldTypes.ComboBox,
      options: BALANCING_AUTHORITY_OPTIONS
    },
    MeasurementBody: {
      label: "Measurement Body",
      key: `${key}_measurement_body`,
      required: true,
      requirementMessage: "Please input the measurement body!",
      type: InputFieldTypes.Text
    },
    MeterSerialNumber: {
      label: "Meter Serial Number",
      key: `${key}_meter_serial_number`,
      required: true,
      requirementMessage: "Please input the meter's serial number!",
      type: InputFieldTypes.Text,
      private: true
    },
    OnSiteMeterNumber: {
      label: "On-Site Meter Number",
      key: `${key}_on_site_meter_number`,
      required: true,
      requirementMessage: "Please input the on-site meter number!",
      type: InputFieldTypes.Text
    },
    LatitudeOfProductionDevice: {
      label: "Latitude of Production Device",
      key: `${key}_latitidue_of_production_device`,
      required: true,
      requirementMessage: "Please input the PV System's latitude!",
      type: InputFieldTypes.Text,
      suffix: {type: SuffixTypes.Tooltip, description: "Your latitude will not be shared publicly until a daily or monthly granular certificate has been published."}
    },
    LongitudeOfProductionDevice: {
      label: "Longitude of Production Device",
      key: `${key}_longitude_of_production_device`,
      required: true,
      requirementMessage: "Please input the PV System's longitude!",
      type: InputFieldTypes.Text,
      suffix: {type: SuffixTypes.Tooltip, description: "Your longitude will not be shared publicly until a daily or monthly granular certificate has been published."}
    },
    GridInterjection: {
      label: "Grid Interjection",
      key: `${key}_grid_interjection`,
      required: true,
      requirementMessage: "Please input the PV System's grid interjection!",
      type: InputFieldTypes.Text
    },
    Auxiliaries: {
      label: "Production Device Auxiliaries",
      key: `${key}_production_device_auxiliaries`,
      required: false,
      requirementMessage: 'Please input the PV System\'s auxiliaries',
      type: InputFieldTypes.Text
    },
    DataOfCommisioning: {
      label: "PV System Date of Comissioning",
      key: `${key}_production_device_date_of_comissioning`,
      required: true,
      requirementMessage: 'Please input the PV System\'s data of comissioning!',
      type: InputFieldTypes.Date
    },
    MeterType: {
      label: "Meter Type",
      key: `${key}_meter_type`,
      required: true,
      requirementMessage: "Please select the meter type!",
      type: InputFieldTypes.ComboBox,
      options: [
        { key: 'solar_edge_inverter', value: 'Solar Edge Inverter' },
      ]
    },
  })
}

const solarEdgeDependencies = (key, options) => {
  return {
    SystemAPIKey: {
      label: "System API Key",
      key: `${key}_api_key`,
      required: true,
      requirementMessage: "Please input the PV Systems API key!",
      type: InputFieldTypes.Text,
      private: true
    },
    Button: {
      label: "Load Sites from API Key",
      key: `${key}_load_sites_button`,
      type: InputFieldTypes.Button,
    },
    InverterSiteNumber: {
      label: "Inverter Site Number",
      key: `${key}_site_number`,
      required: true,
      requirementMessage: "Please input the PV System's Site Number!",
      type: InputFieldTypes.ComboBox,
      options: options
    }
  }
}

const createSystemOwnerDIDFields = () => {
  let personalFieldsObj = personalFields(SystemOwnerKey)
  let emailFieldObj = emailField(SystemOwnerKey)
  personalFieldsObj.FullName.private = true
  personalFieldsObj.Address.private = true
  personalFieldsObj.PhoneNumber.private = true
  emailFieldObj.Email.private = true

  return Object.assign({}, personalFieldsObj, emailFieldObj);
}

const installerGeneralFields = createInstallerGeneralFields()
const electricianLicenseFields = createElectriciansLicenseFields()
const businessRelationshipFields = createBusinessRelationshipsFields()
const buildingContractorLicenseFields = createBuildingContractorFields()
const qualifyingBuilderLicenseFields = createQaulifyingBuilderFields()
const electricianRegisterFields = createElectricianRegistrationFields()
const pvSystemFields = createPvSystemDIDFields()
const systemOwnerFields = createSystemOwnerDIDFields()

export {
  installerGeneralFields,
  electricianLicenseFields,
  businessRelationshipFields,
  buildingContractorLicenseFields,
  qualifyingBuilderLicenseFields,
  electricianRegisterFields,
  InputFieldTypes,
  BuildingContractor,
  QaulifyingBuilder,
  InstallerKey,
  ElectricianKey,
  BusinessRelationshipKey,
  PVSystemKey,
  SystemOwnerKey,
  pvSystemFields,
  systemOwnerFields,
  SuffixTypes,
  solarEdgeDependencies
};