// This script is only used for verifying portions of this function
// Some functions may be commented out to prevent long (and tested) functions
// from executing

import { checkAndUpdatePastGCs } from "../monthly_aggregate.js"
import { updateIndexMock } from "../../mocks/update_index_mock.js"
import { Web3Storage } from "web3.storage"
import { writeFileAsJSON } from "../utils.js"

const main = async () => {
  // console.log(">>> Starting...")
  // let updateIndexMockRevoked = JSON.parse(JSON.stringify(updateIndexMock))
  // const did = "did:ethr:volta:0xDE859DE701CF59Ca8Fe0a3381B946820f85E0C54"
  // updateIndexMockRevoked.pvSystems[did].status = "Revoked"
  // const web3Storage = new Web3Storage({token: process.env.WEB3_STORAGE_API_KEY})

  // Functions that post data to Web3 Storage or Energy Web Chain have been commented out when
  // this function was run and their responses replaced with sample variables
  // const {index, pvSystemStatusList} = await checkAndUpdatePastGCs([did], updateIndexMockRevoked, web3Storage, process.env.VC_TEST_ACCOUNT_PRIVATE_KEY, process.env.VC_TEST_ACCOUNT_PRIVATE_KEY, false)
  // console.log(index.daily["2022-08-01T00:00:00.000Z"].entries)
  // console.log(index.daily["2022-08-02T00:00:00.000Z"].entries)
  // console.log(index.monthly["2022"]["8"].entries)

}

main()