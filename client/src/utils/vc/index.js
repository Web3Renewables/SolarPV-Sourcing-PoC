const filterByClaimType = (requestorClaims, publishedClaims) => {
    if(!publishedClaims.length) return requestorClaims
    return requestorClaims.filter((element) => {
        return !publishedClaims.find((claim) => {return element.claimType === claim.claimType})
      })
}

export {
    filterByClaimType
}