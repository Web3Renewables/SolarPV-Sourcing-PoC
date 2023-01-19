/**
 * Parses the requestor fields of a specific key into a JSON Object or undefined
 * @param {{claimType: string, claimTypeVersion: number, issuerFields: JSONObject[], requestorFields: JSONObject[]}} claim Claim to parse the requestor fields from
 * @param {string} key key for the field in the requestor fields array to parse
 * @returns 
 */
const parseRequestorFields = (claim, key) => {
  try {
    if(!claim) return
    const data = claim.requestorFields.find(obj => obj.key === key)
    if(!data) return
    return JSON.parse(data.value)
  } catch (e) {
    return
  }
}

export {
  parseRequestorFields
}