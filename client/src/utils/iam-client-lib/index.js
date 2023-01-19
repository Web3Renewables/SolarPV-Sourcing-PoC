import jwtDecode from "jwt-decode"

const getEmbeddedObjectFromClaim = (claim) => {
  try {
    const payload = jwtDecode(claim.issuedToken)
    return { success: true, payload: JSON.parse(payload.claimData.requestorFields[0].value), message: "success" }
  } catch (e) {
    return { success: false, message: e.message }
  }
}



export {
  getEmbeddedObjectFromClaim,
}