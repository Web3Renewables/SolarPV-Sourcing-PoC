import assert from 'assert'
import { Validator } from 'jsonschema'
import { createMonthlyGCs } from '../utils/mappers/create-monthly-gc.js'
import { organizeFilesToPVSystems } from '../utils/monthly_aggregate.js';
import { getDaysInMonth, readFileAsJSON } from '../utils/utils.js'
import { gcsFromWeb3StorageMock } from '../mocks/pv_system_files.js'

describe('Creating Monthly Granular Certificates', () => {

  // DIDS Match the `gcsFromWeb3StorageMock`
  const pvSystemStatusList = [{did: "did:ethr:volta:0x0795Ddb3CA6Ca7367B5761cffEda74E62D8983c0", status: "Active"}, {did: "did:ethr:volta:0xfb6A406C962D3b38766B5058e10d5119FE281340", status: "Active"}]

  it('#organizeFilesIntoPVSystems', () => {
    const organized = organizeFilesToPVSystems(gcsFromWeb3StorageMock)
    assert.deepEqual(organized["did:ethr:volta:0x0795Ddb3CA6Ca7367B5761cffEda74E62D8983c0"], [gcsFromWeb3StorageMock[0], gcsFromWeb3StorageMock[1], gcsFromWeb3StorageMock[2], gcsFromWeb3StorageMock[3], gcsFromWeb3StorageMock[4], gcsFromWeb3StorageMock[5]])
    assert.deepEqual(organized["did:ethr:volta:0xfb6A406C962D3b38766B5058e10d5119FE281340"], [gcsFromWeb3StorageMock[6], gcsFromWeb3StorageMock[7], gcsFromWeb3StorageMock[8], gcsFromWeb3StorageMock[9], gcsFromWeb3StorageMock[10], gcsFromWeb3StorageMock[11]])

  })

  it('#createMonthlyGcs', async () => {

    const allGcs = gcsFromWeb3StorageMock
    const pvSystemFiles = organizeFilesToPVSystems(allGcs)

    const month = getDaysInMonth(8, 2022)
    const startDate = `${month.year}-${month.month}-1`
    const endDate = `${month.year}-${month.month}-${month.daysInMonth}`

    const timestamp = new Date().toISOString()
    const gcs = createMonthlyGCs(pvSystemFiles, startDate, endDate, false, timestamp)
    const mockExpected = Object.keys(pvSystemFiles).map(key => {
      const prefix = pvSystemFiles[key][0]
      let totalEmissionsAvoided = []
      let totalWhGeneration = []

      pvSystemFiles[key].forEach(obj => {
        let wh = obj.data.generation_data.values.reduce((accumulator, object) => {
          if (object.energy == null) {
            return accumulator + 0
          } else {
            return accumulator + object.energy
          }
        }, 0)
        let avoided = obj.data.generation_data.values.reduce((accumulator, object) => { return accumulator + object.emissionsAvoided }, 0)
        totalEmissionsAvoided.push(avoided)
        totalWhGeneration.push(wh)
      })

      totalEmissionsAvoided = totalEmissionsAvoided.reduce((accumulator, number) => { return accumulator + number }, 0)
      totalWhGeneration = totalWhGeneration.reduce((accumulator, number) => { return accumulator + number }, 0)

      return {
        fileName: `${startDate}_${key}_gc.json`,
        data: {
          metadata: {
            type: "monthly"
          },
          timezone: prefix.data.timezone,
          energy_carrier: prefix.data.energy_carrier,
          installer_did: prefix.data.installer_did,
          commissioning_date: prefix.data.commissioning_date,
          electricians_dids: prefix.data.electricians_dids,
          production_interval_start: startDate,
          production_interval_end: endDate,
          issuance_stamp_date: timestamp,
          source: prefix.data.source,
          technology: prefix.data.technology,
          production_device_identifier: prefix.data.production_device_identifier,
          country: prefix.data.country,
          gps: prefix.data.gps,
          ac_capacity: prefix.data.ac_capacity,
          dc_capacity: prefix.data.dc_capacity,
          total_wh_generation:  totalWhGeneration,
          total_emissions_avoided: totalEmissionsAvoided,
          generation_data: pvSystemFiles[key].map(obj => {
            return {
              cid: obj.cid,
              fileName: obj.fileName,
              daily_vc_uuid: obj.indexData.vcUuid,
              production_interval_start: obj.data.production_interval_start,
              production_interval_end: obj.data.production_interval_end,
              values: obj.data.generation_data.values,
              timeUnit: obj.data.generation_data.timeUnit,
              unit: obj.data.generation_data.unit,
              measuredBy: obj.data.generation_data.measuredBy,
            }
          }),
          marginal_grid_emissions_source: prefix.data.marginal_grid_emissions_source,
          gc_issuer: prefix.data.gc_issuer,
          issued_from: prefix.data.issued_from,
          certificate_status: prefix.data.certificate_status,
          impact_credit: prefix.data.impact_credit,
          interconnection: prefix.data.interconnection,
        }
      }
    })
    console.log(mockExpected)
    assert.deepEqual(gcs, mockExpected)
  });

  it('validate monthly gc', () => {
    const allGcs = gcsFromWeb3StorageMock
    const pvSystemFiles = organizeFilesToPVSystems(allGcs)

    const month = getDaysInMonth(8, 2022)
    const startDate = `${month.year}-${month.month}-1`
    const endDate = `${month.year}-${month.month}-${month.daysInMonth}`

    const timestamp = new Date().toISOString()
    const gcs = createMonthlyGCs(pvSystemFiles, startDate, endDate, false, timestamp, pvSystemStatusList)
    let v = new Validator()
    const jsonSchema = readFileAsJSON("../schemas/monthly_gc_schema.json")
    gcs.forEach(gc => {
      const validatorResult = v.validate(gc.data, jsonSchema)
      assert.equal(validatorResult.errors.length, 0)
    })
  })

});