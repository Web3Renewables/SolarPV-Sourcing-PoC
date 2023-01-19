import { WATT_TIME_ENDPOINT } from "../../config.js"
import { DateTime } from 'luxon'

/**
 * Transforms Inverter and WattTime Data to required format for GC
 * @param {object} inverterData Data collected from Solar Edge API Call
 * @param {object} wattTimeData Data collected from WattTime API Call
 * @param {string} timeZone Timezone of Inverter
 * @returns 
 */
const transformDataToEmissionsAvoided = (inverterData, wattTimeData, timeZone) => {
  let gcData = []
  inverterData.energy.values.forEach((obj, index) => {
    let date = DateTime.fromFormat(obj.date, "yyyy-MM-dd hh:mm:ss").setZone(timeZone, {keepLocalTime: true}).toUTC().toISO()
    let dateSubstring = date.slice(0, -11)
    const hourly = wattTimeData.filter(el => el.point_time.includes(dateSubstring))
    let average = hourly.reduce((previousValue, currentValue) => previousValue + currentValue.value, 0)
    if(average != 0) average = average / hourly.length

    gcData.push({
      timestamp: date,
      energy: obj.value,
      emissionsAvoided: (average / 1000 / 1000) * obj.value
    })
  })
  return {
    timeUnit: inverterData.energy.timeUnit,
    unit: inverterData.energy.unit,
    measuredBy: inverterData.energy.measuredBy,
    values: gcData
  }
}

/**
 * Maps all data collected to required format of the GC Standard
 * @param {object} rawInverterData Object from Raw Inverter data from Solar Edge API
 * @param {object} emissionsAvoided Object from #transformDataToEmissionsAvoided()
 * @param {string} pvSystemDID PV System DID address
 * @param {object} pvSystemData Data obtained from PV System Role on application
 * @param {string} web3RenewablesDID DID of the Web3Rnewbales Owner
 * @param {boolean} production Is production environemt? (i.e., Running on Energy Web Chain then 'true', if Volta then 'false')
 * @param {string} startDate Start date of energy generated on GC in UTC
 * @param {string} endDate End date of energy generated on GC in UTC
 * @param {string} timezone Timezone of the PV System
 * @param {string[]} electriciansDids Assigned electricians DIDs
 * @param {string} certificateStatus PV Systems Status
 * @returns 
 */
const mapToGCFormat = (
  generationData,
  totalWhGeneration,
  totalEmissionsAvoided,
  pvSystemDID,
  pvSystemData,
  web3RenewablesDID,
  production,
  startDate,
  endDate,
  type,
  timestamp,
  timezone,
  electriciansDids,
  installerDid = undefined,
  certificateStatus = "Active",
) => {
  const balancingAuthority = !pvSystemData.pv_system_balancing_authority ? "" : pvSystemData.pv_system_balancing_authority
  return {
    metadata: {
      type: type
    },
    installer_did: installerDid,
    energy_carrier: "Electricity",
    commissioning_date: pvSystemData.pv_system_production_device_date_of_comissioning,
    production_interval_start: startDate,
    production_interval_end: endDate,
    issuance_stamp_date: timestamp,
    source: "Solar Power",
    technology: "Solar PV System",
    production_device_identifier: pvSystemDID,
    country: "United States of America",
    electricians_dids: electriciansDids,
    gps: {
      latitude: pvSystemData.pv_system_latitidue_of_production_device,
      longitude: pvSystemData.pv_system_longitude_of_production_device,
    },
    ac_capacity: pvSystemData.pv_system_pv_system_capacity,
    dc_capacity: pvSystemData.pv_system_pv_system_capacity_dc,
    generation_data: generationData,
    total_emissions_avoided: totalEmissionsAvoided,
    total_wh_generation: totalWhGeneration,
    marginal_grid_emissions_source: WATT_TIME_ENDPOINT,
    gc_issuer: web3RenewablesDID,
    issued_from: production ? "Production" : "Development",
    certificate_status: certificateStatus,
    impact_credit: "",
    interconnection: {
      energy_injected_utility: pvSystemData.pv_system_grid_interjection,
      balancing_authority: balancingAuthority,
    },
    timezone: timezone
  }
}



export {
  transformDataToEmissionsAvoided,
  mapToGCFormat
}