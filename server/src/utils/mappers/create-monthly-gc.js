import { mapToGCFormat } from "./transformer.js"

/**
 * Maps the daily file contents for each PV System to a Monthly GC Format
 * @param {{['PVSystemDID']: {JSONObject}[]}} pvSystemFiles 
 * @param {string} startDate Start Date of GC in UTC - ISO 8601
 * @param {string} endDate End Date of GC in UTC - ISO 8601
 * @param {boolean} production Is production environment
 * @param {string} timestamp Timestamp of GC Issuance in ISO 8601 UTC
 */
const createMonthlyGCs = (pvSystemFiles, startDate, endDate, production, timestamp) => {

  return Object.keys(pvSystemFiles).map(function (key, index) {
    let systemData;

    let totalWhGeneration = []
    let totalEmissionsAvoided = []
    const aggregate = pvSystemFiles[key].map(obj => {
      systemData = obj.data
      const emissions_avoided = obj.data.generation_data.values.reduce((accumulator, object) => { return accumulator + object.emissionsAvoided }, 0)
      const wh_generation = obj.data.generation_data.values.reduce((accumulator, object) => {
        if (object.energy == null) {
          return accumulator + 0
        } else {
          return accumulator + object.energy
        }
      }, 0)
      totalEmissionsAvoided.push(emissions_avoided)
      totalWhGeneration.push(wh_generation)

      return {
        fileName: obj.fileName,
        cid: obj.cid,
        daily_vc_uuid: obj.indexData.vcUuid,
        production_interval_start: obj.data.production_interval_start,
        production_interval_end: obj.data.production_interval_end,
        values: obj.data.generation_data.values,
        timeUnit: obj.data.generation_data.timeUnit,
        unit: obj.data.generation_data.unit,
        measuredBy: obj.data.generation_data.measuredBy,
      }
    })

    return {
      fileName: `${startDate}_${systemData.production_device_identifier}_gc.json`,
      data: mapToGCFormat(
        aggregate,
        totalWhGeneration.reduce((accumulator, number) => { return accumulator + number }, 0),
        totalEmissionsAvoided.reduce((accumulator, number) => { return accumulator + number }, 0),
        key,
        {
          pv_system_production_device_date_of_comissioning: systemData.commissioning_date,
          pv_system_latitidue_of_production_device: systemData.gps.latitude,
          pv_system_longitude_of_production_device: systemData.gps.longitude,
          pv_system_pv_system_capacity: systemData.ac_capacity,
          pv_system_pv_system_capacity_dc: systemData.dc_capacity,
          pv_system_grid_interjection: systemData.interconnection.energy_injected_utility,
          pv_system_balancing_authority: systemData.interconnection.balancing_authority
        },
        systemData.gc_issuer,
        production,
        startDate,
        endDate,
        "monthly",
        timestamp,
        systemData.timezone,
        systemData.electricians_dids ?? [],
        systemData.installer_did,
        systemData.certificate_status
      )
    }
  });


}

export {
  createMonthlyGCs
}