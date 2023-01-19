import assert from 'assert'
import { updateIndexMock } from '../mocks/update_index_mock.js';
import { updateDailyGCs, updateMonthlyGCs, updateIndex } from '../utils/monthly_aggregate.js'
import { readFileAsJSON } from '../utils/utils.js'

describe('Update Past GCs and the Index', () => {

  it('#updateDailyGCs', () => {
    const dailyGc = readFileAsJSON("./examples/daily_gc_retrieval_for_monthly_aggregate.json")

    const mocks = [
      { vcUuid: "unique uuid", gc: dailyGc.data, date: "2022-08-01", fileName: dailyGc.fileName, entryIndex: 0 },
      { vcUuid: "unique uuid2", gc: dailyGc.data, date: "2022-08-01", fileName: dailyGc.fileName, entryIndex: 1 },
      { vcUuid: "unique uuid3", gc: dailyGc.data, date: "2022-08-01" , fileName: dailyGc.fileName, entryIndex: 2},
    ]

    const expected = mocks.map(mock => {
      mock.gc.certificate_status = "Revoked"
      return { vcUuid: mock.vcUuid, gc: mock.gc, date: mock.date, fileName: mock.fileName, entryIndex: mock.entryIndex }
    })

    const actual = updateDailyGCs(mocks, "Revoked")
    assert.deepEqual(actual, expected);
  });

  it('#updateMonthlyyGCs', () => {
    const monthlyGc = readFileAsJSON("./examples/monthly_gc_example.json")

    const mocks = [
      { vcUuid: "unique uuid", gc: monthlyGc.data, date: { year: 2022, month: 8, day: 1 }, fileName: monthlyGc.fileName, entryIndex: 0 },
      { vcUuid: "unique uuid2", gc: monthlyGc.data, date: { year: 2022, month: 8, day: 1 }, fileName: monthlyGc.fileName, entryIndex: 1 },
      { vcUuid: "unique uuid3", gc: monthlyGc.data, date: { year: 2022, month: 8, day: 1 }, fileName: monthlyGc.fileName, entryIndex: 2 },
    ]
    const dailyCid = "test daily CID"
    const status = "Revoked"

    const expected = mocks.map(mock => {
      let newMock = JSON.parse(JSON.stringify(mock))
      newMock.gc.generation_data.map(generation => {
        generation.cid = dailyCid
        return generation
      })
      newMock.gc.certificate_status = status
      return {
        gc: newMock.gc,
        vcUuid: mock.vcUuid,
        date: mock.date,
        fileName: mock.fileName,
        entryIndex: mock.entryIndex
      }
    })

    const actual = updateMonthlyGCs(mocks, dailyCid, status, monthlyGc.data.generation_data.map(obj => obj.fileName))

    assert.deepEqual(actual, expected)
  });

  it('#updateIndex', () => {
    let index = JSON.parse(JSON.stringify(updateIndexMock))
    let expected = JSON.parse(JSON.stringify(updateIndexMock))
    const monthlyGc = readFileAsJSON("./examples/monthly_gc_example.json")
    const dailyGc = readFileAsJSON("./examples/daily_gc_retrieval_for_monthly_aggregate.json")

    const dailyCid = "test daily CID"
    const monthlyCid = "test daily CID"
    const status = "Revoked"

    const mocksDaily = [
      { vcUuid: "unique uuid", gc: dailyGc.data, date: "2022-08-01T00:00:00.000Z", fileName: "2022-08-01T00:00:00.000Z_did:ethr:volta:0xDE859DE701CF59Ca8Fe0a3381B946820f85E0C54_gc.json", entryIndex: 0 },
      { vcUuid: "unique uuid2", gc: dailyGc.data, date: "2022-08-02T00:00:00.000Z", fileName: "2022-08-02T00:00:00.000Z_did:ethr:volta:0xDE859DE701CF59Ca8Fe0a3381B946820f85E0C54_gc.json", entryIndex: 0 },
    ]

    const monthlyMocks = [
      { vcUuid: "unique uuid", gc: monthlyGc.data, date: { year: 2022, month: 8, day: 1 }, fileName: "2022-8-1_did:ethr:volta:0xDE859DE701CF59Ca8Fe0a3381B946820f85E0C54_gc.json", entryIndex: 0 },
    ]
    

    const actualDaily = updateDailyGCs(mocksDaily, status)
    const actualMonthly = updateMonthlyGCs(monthlyMocks, dailyCid, status, actualDaily.map(obj => obj.fileName))

    const mockMetaData = [
      {
        updateable: {
          dailyGcsMetadata: actualDaily.map(obj => { return { vcUuid: obj.vcUuid, date: obj.date, fileName: obj.fileName, dailyGcCid: dailyCid, did: "testDID", entryIndex: obj.entryIndex}}),
          monthlyGcsMetadata: actualMonthly.map(obj => { return { vcUuid: obj.vcUuid, date: obj.date, fileName: obj.fileName, monthlyGcCid: monthlyCid, did: "testDID", entryIndex: obj.entryIndex } })
        },
        did: "testDID",
        updateMrets: true,
        status: status,
      }
    ]
    
    const newIndex = updateIndex(index, mockMetaData)

    expected.daily["2022-08-01T00:00:00.000Z"].entries[0].cid = dailyCid
    expected.daily["2022-08-02T00:00:00.000Z"].entries[0].cid = dailyCid
    expected.monthly["2022"]["8"].entries[0].cid = monthlyCid

    assert.deepEqual(newIndex, expected)
  })
});