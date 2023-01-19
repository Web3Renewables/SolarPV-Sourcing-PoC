import { getInverterData } from "../helpers/inverter.js"
import { getWattTimeData, loginWattTime} from "../helpers/watt-time.js"
import { convertDateToUTC } from "../utils.js"
import { transformDataToEmissionsAvoided } from "../mappers/transformer.js"


const main = async (inverterApiKey, siteNumber, startDate, endDate, interval = "HOUR") => {
  const inverterData = await getInverterData(siteNumber, startDate, endDate, interval, inverterApiKey)

  if (inverterData === undefined) {
    console.log(">>> Could not retrieve inverter information")
    return
  }

  const token = await loginWattTime()

  if (token === undefined) {
    console.log(">>> could not log into WattTime")
    return
  }

  const juneStartTime = convertDateToUTC("2022-06-01 00:00:00", siteData.timezone)
  const juneEndTime = convertDateToUTC("2022-06-30 24:00:00", siteData.timezone)
  const julyStartTime = convertDateToUTC("2022-07-01 00:00:00", siteData.timezone)
  const julyEndTime = convertDateToUTC("2022-07-31 24:00:00", siteData.timezone)

  const wattTimeDataJune = await getWattTimeData("45.167952", "-92.728315", juneStartTime, juneEndTime, token)
  const wattTimeDataJuly = await getWattTimeData("45.167952", "-92.728315", julyStartTime, julyEndTime, token)

  if (wattTimeDataJune === undefined) {
    console.log(">>> 1 could not retrieve WattTime information")
    return
  }
  if (wattTimeDataJuly === undefined) {
    console.log(">>> 2 could not retrieve WattTime information")
    return
  }

  const juneGc = transformDataToEmissionsAvoided(inverterDataJune, wattTimeDataJune, "CDT")
  const julyGC = transformDataToEmissionsAvoided(inverterDataJuly, wattTimeDataJuly, "CDT")

  console.log(">>> created GCs")
}