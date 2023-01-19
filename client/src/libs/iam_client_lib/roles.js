const getRoles = async ({ did, claimsService }) => {
  if (!claimsService || !did) {
    return [];
  }

  const claims = await claimsService.getClaimsByRequester({
    did: did,
    isAccepted: true,
  });

  return claims
    .filter((claim) => {return !claim.isRejected})
    .map((claim) => claim.claimType)
};

export { getRoles };
