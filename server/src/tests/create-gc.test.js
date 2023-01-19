import nock from 'nock';
import assert from 'assert'
import { Validator } from 'jsonschema'
import { createGCs } from '../utils/mappers/create-gc.js';
import { mockPvSystemDid, mockJwtToken, mockInverterEnergyData, mockTimezone, mockWattTimeData, mockAppsPVSystemRoles } from '../mocks/index.js';
import { yesterday, readFileAsJSON } from '../utils/utils.js';

const TEST_API_KEY = "PRIVATE_TEST_KEY"

const apiKeySearchParams = new URLSearchParams({
  api_key: TEST_API_KEY
})

const infuraSearchParams = new URLSearchParams({
  arg: "QmUNVj7YDHBs7XP4cPWUwgnq7PiR91NchVb9hxSaRowdYs"
})

const wattTimeSearchParams = new URLSearchParams({
  starttime: yesterday().startDateUtc.setZone("America/Chicago", { keepLocalTime: true }).toISO(),
  endTime: yesterday().endDateUtc.setZone("America/Chicago", { keepLocalTime: true }).toISO(),
  latitude: "83.2",
  longitude: "-43.2"
})

const searchParams = new URLSearchParams({
  startDate: yesterday().inverterDateISO,
  endDate: yesterday().inverterDateISO,
  timeUnit: 'HOUR',
  api_key: TEST_API_KEY
})

describe('Creating Granular Certificates', () => {

  // Make WattTime Report
  nock('https://api2.watttime.org/v2')
    .persist()
    .get(`/data?${wattTimeSearchParams}`)
    .reply(200, mockWattTimeData)

  // Mock Timezone
  nock('https://monitoringapi.solaredge.com')
    .persist()
    .get(`/site/${mockPvSystemDid.pv_system_site_number}/details?${apiKeySearchParams}`)
    .reply(200, mockTimezone)

  // Mock Inverter Data
  nock('https://monitoringapi.solaredge.com')
    .persist()
    .get(`/site/${mockPvSystemDid.pv_system_site_number}/energy?${searchParams}`)
    .reply(200, mockInverterEnergyData)

  const yesterdayObj = yesterday()

  const testDecryption = "5386DB1E61D7E61ADF44701DFFB919CC80873745865C5FF1D891639E1E6A2364" // Not real
  const timestamp = new Date().toISOString()

  it('#createGcs', async () => {
    const gcs = await createGCs(mockAppsPVSystemRoles, "TEST_KEY", testDecryption, false, "did:ethr:volta:0x224CbA4ae8D27Ba69793CFeFe042682B81eA77c5", yesterdayObj, timestamp)
    const energyAmount = 126 + 601 + 878 + 1186 + 2463 + 3513 + 6530 + 6649 + 4928 + 4037 + 2908 + 780 + 124
    const emissionsAvoided = 56.417931249999995

    // Verify Raw Inverter Energy
    assert.equal(
      gcs[0].inverter.data.energy.values.reduce((accumulator, object) => { return accumulator + object.value }, 0),
      energyAmount
    );

    // Verify GC Raw Inverter Data
    assert.equal(
      gcs[0].gc.data.generation_data.values.reduce((accumulator, object) => { return accumulator + object.energy }, 0),
      energyAmount
    );

    // Verify Emissions Avoided
    assert.equal(
      gcs[0].gc.data.generation_data.values.reduce((accumulator, object) => { return accumulator + object.emissionsAvoided }, 0),
      emissionsAvoided
    );
    // Verify Filenames
    assert.equal(gcs[0].inverter.fileName, `${yesterdayObj.startDateUtc.toISO()}_${mockAppsPVSystemRoles[0].pvSystemCreds.did}_raw_inverter.json`)
    assert.equal(gcs[0].gc.fileName, `${yesterdayObj.startDateUtc.toISO()}_${mockAppsPVSystemRoles[0].pvSystemCreds.did}_gc.json`)
    assert.equal(gcs[0].gc.data.interconnection.balancing_authority, "Midcontinent Independent System Operator, Inc.")
  });

  it('validate daily gc', async () => {
    const gcs = await createGCs(mockAppsPVSystemRoles, "TEST_KEY", testDecryption, false, "did:ethr:volta:0x224CbA4ae8D27Ba69793CFeFe042682B81eA77c5", yesterdayObj, timestamp)
    let v = new Validator()
    const jsonSchema = readFileAsJSON("../schemas/gc_schema.json")

    gcs.forEach(obj => {
      const validatorResult = v.validate(obj.gc.data, jsonSchema)
      assert.equal(validatorResult.errors.length, 0)
    })
  })

});
