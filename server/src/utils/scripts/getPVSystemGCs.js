import { checkAndUpdatePastGCs, getDIDsFromIndex, getPastDailyGCs } from "../monthly_aggregate.js"
import { readFileAsJSON } from "../utils.js"

const main = async () => {
  const index = readFileAsJSON("./src/mocks/valid_index.json")

  const dids = getDIDsFromIndex(index)

  //const gcs = await checkAndUpdatePastGCs("did:ethr:volta:0x1863B5eABe907FA826C16589887440539E2F44AE", index)
  //console.log(gcs)
}

main()