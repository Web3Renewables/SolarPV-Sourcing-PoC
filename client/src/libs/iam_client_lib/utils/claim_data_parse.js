import { ClaimState } from "../enums"
/**
 * Gets Data from issuer fields of a claim
 * @param {Claim} pvSystemClaim Claim from DID Document
 * @returns 
 */
const getPVSystemObjectData = (pvSystemClaim) => {

  try {
    let data;
    if(pvSystemClaim.requestorFields !== undefined) {
      data = pvSystemClaim.requestorFields.find(obj => obj.key === 'data')
    } 
    if(pvSystemClaim.issuerFields !== undefined && pvSystemClaim.issuerFields.length != 0) {
      data = pvSystemClaim.issuerFields.find(obj => obj.key === 'data')
    }

    return { state: ClaimState.COMPLETE, data: JSON.parse(data.value) }
  } catch (e) {
    console.log(e)
    return { state: ClaimState.UNPUBLISHED, data: undefined }
  }
}

export {
  getPVSystemObjectData
}