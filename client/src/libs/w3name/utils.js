/**
 * Gets the cids that have had PV Systems Report Into the Index for all valid months
 * @param {IndexGCSchema} indexJson Index JSON File
 * @param {string} pvSystemDID PV System DID
 * @returns {string[]}
 */
const getCidsFromIndexMonth = (indexJson, pvSystemDID) => {
  let years;
  try {
    years = Object.keys(indexJson.monthly)
  } catch { 
    console.log("Index file has no years that contain reporting pv systems")
  }
  if (!years.length) { return [] }

  let cids = years.map(year => {
    try {
      const months = Object.keys(indexJson.monthly[year])
      return months.map(month => { return indexJson.monthly[year][month].entries })

    } catch { return undefined }
  }).filter(obj => obj !== undefined).flat(2).filter(obj => obj.pvSystemDID === pvSystemDID)

  return cids
}

export {
  getCidsFromIndexMonth
}