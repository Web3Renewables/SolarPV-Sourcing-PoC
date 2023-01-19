const writeUserData = async (db, address, nonce) => {
  await db.ref('/users/'+address).update({
    nonce: nonce
  })
}

const readUserData = async (db, address) => {
  const data = await db.ref('/users/'+address).once('value')
  return data.toJSON()
}

const readProjectData = async (db, appId) => {
  const data = await db.ref('/projects/'+appId).once('value')
  return data.toJSON()
}

const writeMretsGeneratorId = async (db, assetDID, generatorId) => {
  await db.ref('/assets/'+assetDID).update({
    generatorId: generatorId
  })
}

const readAssetInformation = async (db, assetDID) => {
  const data = await db.ref('/assets/'+assetDID).once('value')
  return data.toJSON()
}

/**
 * Update the company EIN in Firebase
 * @param {Database} db 
 * @param {string} address 
 * @param {{local: Object, server: Object}} ein 
 */
const updateCompanyEIN = async (db, address, ein) => {
  await db.ref('/users/'+address).update({
    companyEIN: ein
  })
}

/**
 * Saves System Owner information to Firebase
 * @param {Database} db Firebase Database
 * @param {number} appId Energy Web Chain App ID
 * @param {JSONObject} data System Owner Data (encrypted beforehand)
 * @param {string} systemOwnerDID DID of System Owner (starts off as an asset)
 */
const updateSystemOwner = async (db, appId, data, systemOwnerDID) => {
  await db.ref('/projects/'+appId).update({
    systemOwner: {
      privateData: data,
      did: systemOwnerDID
    },
  })
}

/**
 * Saves API Key and other private data to Firebase
 * @param {Database} db Firebase Database
 * @param {string} appId EnergyWeb App ID
 * @param {JSONObject} data Data to save (encrypted beforehand)
 * @param {string} assetDID Potential Asset DID, can be updated in future if PV request is denied
 */
const updatePVSystem = async (db, appId, data, assetDID) => {
  await db.ref('/projects/'+appId).update({
    pvSystem: {
      privateData: data,
      did: assetDID
    }
  })
}

const PrivateDataRequestTypes = {
  PVSystem: "pv_system",
  SystemOwner: "system_owner"
}

export {
  writeUserData, readUserData, readProjectData,
  writeMretsGeneratorId, readAssetInformation,
  updateCompanyEIN, updateSystemOwner, updatePVSystem,
  PrivateDataRequestTypes
}