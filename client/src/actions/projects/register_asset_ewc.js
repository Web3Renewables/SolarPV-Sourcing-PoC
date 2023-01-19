
const registerAssetToEWC = async (iamClient) => {
  const assetId = iamClient.assetsService.registerAsset()
  //const claim = await iamClient.claimsService.createSelfSignedClaim({data: {profile: {name: assetName}, subject: assetId}})
  return assetId
}

export default registerAssetToEWC;