import assert from 'assert'
import {mockWeb3RenewablesIndex} from '@config/mocks'
import { getCidsFromIndexMonth } from '@libs/w3name/utils'

describe('Web3 Re Index Helper Functions', () => {

  const mockMonthlyIndex = {
    "metadata": {
      "title": "Web3 Renewables Granular Certificate Index",
      "description": "Index describing the location of all GCs reporting into the Web3 Renewables Index",
      "document_type": "Production",
      "web3_renewables_did": "did:ethr:ewc:0x224CbA4ae8D27Ba69793CFeFe042682B81eA77c5",
      "version": 1
    },
    "pvSystems": {
      "did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc": ["2022-08-30T00:00:00.000Z", "2022-08-31T00:00:00.000Z", "2022-09-01T00:00:00.000Z", "2022-09-02T00:00:00.000Z"],
    },
    "daily": {
      "2022-08-30T00:00:00.000Z": [
        {
          "cid": "cid",
          "pvSystemDID": "did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc",
          "fileName": "2022-08-30T00:00:00.000Z_did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc_gc.json",
          "certificateStatus": "Active"
        },
      ],
      "2022-08-31T00:00:00.000Z": [
        {
          "cid": "cid1",
          "pvSystemDID": "did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc",
          "fileName": "2022-08-31T00:00:00.000Z_did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc_gc.json",
          "certificateStatus": "Active"
        },
      ],
      "2022-09-01T00:00:00.000Z": [
        {
          "cid": "cid2",
          "pvSystemDID": "did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc",
          "fileName": "2022-09-01T00:00:00.000Z_did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc_gc.json",
          "certificateStatus": "Active"
        },
      ],
      "2022-09-02T00:00:00.000Z": [
        {
          "cid": "cid3",
          "pvSystemDID": "did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc",
          "fileName": "2022-09-02T00:00:00.000Z_did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc_gc.json",
          "certificateStatus": "Active"
        },
      ]
    },
    "monthly": {
      "2022": {
        "8": {
          entries: [
            {
              "cid": "monthly_cid_1",
              "pvSystemDID": "did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc",
              "fileName": "2022-08-01_did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc_gc.json",
              "certificateStatus": "Active"
            },
            {
              "cid": "monthly_cid_2",
              "pvSystemDID": "did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc",
              "fileName": "2022-08-01_did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc_gc.json",
              "certificateStatus": "Active"
            },
            {
              "cid": "monthly_cid_3",
              "pvSystemDID": "did:ethr:volta:0x238293a828bf83ef393843f372738cfbad828372",
              "fileName": "2022-08-01_did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc_gc.json",
              "certificateStatus": "Active"
            },
          ]
        },
        "9": {
          entries: [
            {
              "cid": "monthly_cid_4",
              "pvSystemDID": "did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc",
              "fileName": "2022-09-01_did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc_gc.json",
              "certificateStatus": "Active"
            },
            {
              "cid": "monthly_cid_5",
              "pvSystemDID": "did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc",
              "fileName": "2022-09-01_did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc_gc.json",
              "certificateStatus": "Active"
            },
            {
              "cid": "monthly_cid_6",
              "pvSystemDID": "did:ethr:volta:0x238293a828bf83ef393843f372738cfbad828372",
              "fileName": "2022-08-01_did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc_gc.json",
              "certificateStatus": "Active"
            },
          ]
        }
      }
    }
  }

  it("#getCidsFromIndexMonth - unpopulated monthly", () => {
    const expected = getCidsFromIndexMonth(mockWeb3RenewablesIndex, "did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc")
    assert.deepEqual(expected, [])
  })

  it("#getCidsFromIndexMonth - unpopulated monthly", () => {
    const expected = getCidsFromIndexMonth(mockMonthlyIndex, "did:ethr:volta:0x03FE95Afb58A577594084E6c9401220746c409fc")
    assert.deepEqual(expected, [
      mockMonthlyIndex.monthly["2022"]["8"].entries[0],
      mockMonthlyIndex.monthly["2022"]["8"].entries[1],
      mockMonthlyIndex.monthly["2022"]["9"].entries[0],
      mockMonthlyIndex.monthly["2022"]["9"].entries[1],
    ])
  })
})