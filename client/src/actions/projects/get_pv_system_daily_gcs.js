import { getIPNSIndexFile, getIPFSUrl, getCidsFromIndexMonth } from "@libs/w3name"

const getPVSystemDailyGCs = async (pvSystemDID, indexJson) => {
  // Get the CIDs of the PV System for the dates they reported in
  let dates = [];
  try {
    dates = indexJson.pvSystems[pvSystemDID].reporting_dates
  } catch {
    throw new Error("PV System has not reported into the index. Try again tomorrow.")
  }
  if (!dates || !dates.length) { throw new Error("PV System has not reported into the index. Try again tomorrow.") }

  // For each date the PV System reported in

  return dates.map(date => {
    let cid;
    try {
      cid = indexJson.daily[date].entries.find(obj => obj.pvSystemDID === pvSystemDID).cid
    } catch (e) {
      console.log(e)
      return
    }
    const fileName = `${date}_${pvSystemDID}_gc.json`
    const ipfsUrl = getIPFSUrl(cid, fileName)
    return {date: date, url: ipfsUrl, fileName: fileName}
  }).filter(obj => obj !== undefined)
}


const getPVSystemMonthlyGCs = async (pvSystemDID, indexJson ) => {
  // Get the CIDs of the PV System for the dates they reported in
  const cidObjects = getCidsFromIndexMonth(indexJson, pvSystemDID)
  if(!cidObjects.length) {throw new Error("Could not retrieve Monthly GCs")}

  return cidObjects.map(cidObject => {
    const ipfsUrl = getIPFSUrl(cidObject.cid, cidObject.fileName)
    return {date: cidObject.fileName.split("_")[0], url: ipfsUrl, fileName: cidObject.fileName}
  }).filter(obj => obj !== undefined)
}

const getIndexJsonBody = async (ipnsAddress, indexFilename) => {
  // Get the current file pointed to by the IPNS index
  const revision = await getIPNSIndexFile(ipnsAddress)
  // Remove the'ipfs/' at the beginning of the response
  const cid = revision.value.slice(6)
  // Fetch the file from IPFS
  const indexIPFSUrl = getIPFSUrl(cid, indexFilename)
  const indexRes = await fetch(indexIPFSUrl)
  if (!indexRes.ok) { throw new Error("Could not fetch the Web3 Renewables Index File") }
  return await indexRes.json()
}

export {
  getPVSystemDailyGCs,
  getIndexJsonBody,
  getPVSystemMonthlyGCs
}