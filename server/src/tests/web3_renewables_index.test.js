import assert from 'assert'
import { Validator } from 'jsonschema'
import { getInitialFormat, updateDailyObject, updateMonthlyOjbect } from '../utils/helpers/web3-name.js';
import { readFileAsJSON } from '../utils/utils.js'

describe('web3 renewables index', () => {

  it('#updateDailyObject', () => {
    let initial = getInitialFormat("Sample DID", false)
    const mockObj = readFileAsJSON("./examples/daily_gc_retrieval_for_monthly_aggregate.json")

    const date = "2022-08-31"
    const newCid = "newCid"
    const rawInverterCid = "rawInverterCid"
    const status = "Active"

    const dailyMocks = [
      {
        vcUuid: mockObj.indexData.vcUuid,
        data: {
          gc: {
            data: mockObj.data,
            fileName: mockObj.fileName
          },
        }
      }
    ]

    let updated = updateDailyObject(initial, date, newCid, dailyMocks, rawInverterCid)
    const expected = JSON.parse(JSON.stringify(initial))

    dailyMocks.forEach(mock => expected.pvSystems[mock.data.gc.data.production_device_identifier] = { status: status, reporting_dates: [date] })

    expected.daily[date] = {
      entries: dailyMocks.map(obj => {
        return {
          rawInverterCID: rawInverterCid,
          vcUuid: obj.vcUuid,
          cid: newCid,
          fileName: obj.data.gc.fileName,
          pvSystemDID: obj.data.gc.data.production_device_identifier,
        }
      })
    }

    assert.deepEqual(updated, expected);
  })

  it('#updateMonthlyObject', () => {
    const mockObj = readFileAsJSON("./examples/monthly_gcs_after_vcs_issued.json")
    let index = readFileAsJSON("./examples/index_example.json")
    let expected = JSON.parse(JSON.stringify(index))

    const year = 2022
    const month = 8
    const status = "Active"
    let newMonthlyCid = "New Monthly CIDS"

    let updateMonthly = updateMonthlyOjbect(index, year, month, newMonthlyCid, mockObj)

    expected.monthly[year] = {'8': {}}
    expected.monthly[year][month] = {
      entries: mockObj.map((obj) => {
        return {
          vcUuid: obj.vcUuid,
          cid: newMonthlyCid,
          fileName: obj.data.fileName,
          pvSystemDID: obj.data.data.production_device_identifier,
          certificateStatus: status
        }
      })
    }
    assert.deepEqual(updateMonthly, expected);
  })

  it('validate initial index format with mockObject', () => {
    const mockInitial = getInitialFormat("Sample DID", false)

    let v = new Validator()
    const jsonSchema = readFileAsJSON("../schemas/index_schema.json")

    const validatorResult = v.validate(mockInitial, jsonSchema)
    assert.equal(validatorResult.errors.length, 0)
  })

  it('validate index with daily data', () => {
    let initial = getInitialFormat("Sample DID", false)
    const mockObj = readFileAsJSON("./examples/daily_gc_retrieval_for_monthly_aggregate.json")

    const date = "2022-08-31"
    const newCid = "newCid"
    const rawInverterCid = "rawInverterCid"
    const status = "Active"

    const dailyMocks = [
      {
        vcUuid: mockObj.indexData.vcUuid,
        data: {
          gc: {
            data: mockObj.data,
            fileName: mockObj.fileName
          },
        }
      }
    ]

    let updated = updateDailyObject(initial, date, newCid, dailyMocks, rawInverterCid)
    let v = new Validator()
    const jsonSchema = readFileAsJSON("../schemas/index_schema.json")

    const validatorResult = v.validate(updated, jsonSchema)
    assert.equal(validatorResult.errors.length, 0)
  })

  it('validate index with monthly data', () => {
    const mockObj = readFileAsJSON("./examples/monthly_gcs_after_vcs_issued.json")
    let index = readFileAsJSON("./examples/index_example.json")
    let expected = JSON.parse(JSON.stringify(index))

    const year = 2022
    const month = 8
    let newMonthlyCid = "New Monthly CIDS"

    let updateMonthly = updateMonthlyOjbect(index, year, month, newMonthlyCid, mockObj)
    let v = new Validator()
    const jsonSchema = readFileAsJSON("../schemas/index_schema.json")

    const validatorResult = v.validate(updateMonthly, jsonSchema)
    assert.equal(validatorResult.errors.length, 0)
  })
});