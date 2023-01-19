import assert from 'assert'
import { web3RenewablesIndex } from '../mocks/index.js'
import { getEntriesFromIndexByMonth } from '../utils/monthly_aggregate.js'
import { getDaysInMonth } from '../utils/utils.js';

describe('monthly aggregate', () => {
  
  it('#getEntriesFromIndexByMonth()', () => {
    const dataToFetch = getEntriesFromIndexByMonth(web3RenewablesIndex.daily, getDaysInMonth(8, 2022))
    assert.deepEqual(dataToFetch, [
      {
        cid: 'cid',
        pvSystemDID: 'did:ethr:volta:0x224CbA4ae8D27Ba69793CFeFe042682B81eA77c5',
        fileName: '2022-08-30T00:00:00.000Z_did:ethr:volta:0x224CbA4ae8D27Ba69793CFeFe042682B81eA77c5_gc.json',
        certificateStatus: 'Active',
        vcUuid: "1",
        rawInverterCid: "abc"
      },
      {
        cid: 'cid',
        pvSystemDID: 'did:ethr:volta:0x090b9873d7227f05EaE54eE1EAB24Aa1808CB2A4',
        fileName: '2022-08-30T00:00:00.000Z_did:ethr:volta:0x090b9873d7227f05EaE54eE1EAB24Aa1808CB2A4.json',
        certificateStatus: 'Active',
        vcUuid: "2",
        rawInverterCid: "abc"
      },
      {
        cid: 'cid',
        pvSystemDID: 'did:ethr:volta:0x15C7fA80c41352Db07Ba1AfF1D3616A7E2d3784e',
        fileName: '2022-08-30T00:00:00.000Z_did:ethr:volta:0x15C7fA80c41352Db07Ba1AfF1D3616A7E2d3784e.json',
        certificateStatus: 'Active',
        vcUuid: "3",
        rawInverterCid: "abc"
      },
      {
        cid: 'cid1',
        pvSystemDID: 'did:ethr:volta:0x224CbA4ae8D27Ba69793CFeFe042682B81eA77c5',
        fileName: '2022-08-31T00:00:00.000Z_did:ethr:volta:0x224CbA4ae8D27Ba69793CFeFe042682B81eA77c5_gc.json',
        certificateStatus: 'Active',
        vcUuid: "4",
        rawInverterCid: "def"
      },
      {
        cid: 'cid1',
        pvSystemDID: 'did:ethr:volta:0x090b9873d7227f05EaE54eE1EAB24Aa1808CB2A4',
        fileName: '2022-08-31T00:00:00.000Z_did:ethr:volta:0x090b9873d7227f05EaE54eE1EAB24Aa1808CB2A4.json',
        certificateStatus: 'Active',
        vcUuid: "5",
        rawInverterCid: "def"
      },
      {
        cid: 'cid4',
        pvSystemDID: 'did:ethr:volta:0x15C7fA80c41352Db07Ba1AfF1D3616A7E2d3784e',
        fileName: '2022-08-31T00:00:00.000Z_did:ethr:volta:0x15C7fA80c41352Db07Ba1AfF1D3616A7E2d3784e.json',
        certificateStatus: 'Active',
        vcUuid: "6",
        rawInverterCid: "def"
      }
    ])
  })
});