const writeMretsGeneratorId = async (db, assetDID, generatorId) => {
  await db.ref('/assets/'+assetDID).update({
    generatorId: generatorId
  })
}

const readMretsGeneratorId = async (db, assetDID) => {
  const data = await db.ref('/assets/'+assetDID).once('value')
  return data.toJSON()
}

const getAllMretsIds = async (db) => {
  const data = await db.ref('/assets').once('value')
  return data.toJSON()
}

const getAllPVSystems = async (db) => {
  const data = await db.ref('/projects').once('value')
  return data.toJSON()
}

export {
  writeMretsGeneratorId, readMretsGeneratorId, getAllMretsIds,
  getAllPVSystems
}