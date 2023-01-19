const roleClaimExists = async (iamClient, role, did, filterRejected = true) => {
  const claimRequests = await iamClient.claimsService.getClaimsByRequester({
    did: did,
    isAccepted: false,
  })
  const filtered = claimRequests.filter(claim => {
    if(filterRejected) {
      return claim.claimType == role && !claim.isRejected
    } else {
      return claim.claimType === role 
    }
  })
  return filtered
}

export {
  roleClaimExists
}