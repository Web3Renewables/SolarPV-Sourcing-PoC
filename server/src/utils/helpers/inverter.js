import fetch from 'node-fetch'
import { INVERTER_ENDPOINT } from "../../config.js"

/**
 * 
 * @param {string} siteNumber Solar Edge Site Number of PV System
 * @param {string} startDate Beginning of Energy Generation Collection (UTC)
 * @param {string} endDate End of Energy Generation Collection (UTC)
 * @param {string} timeUnit Time interval to get generation data (e.g., "QUARTER_OF_AN_HOUR", "HOUR", "DAY", "WEEK", "MONTH", "YEAR" )
 * @param {string} inverterApiKey API Key of Solar Edge Inverter
 * @returns {}
 */
const getInverterData = async (siteNumber, startDate, endDate, timeUnit, inverterApiKey) => {
  const searchParams = new URLSearchParams({
    startDate: startDate,
    endDate: endDate,
    timeUnit: timeUnit,
    api_key: inverterApiKey
  })

  const response = await fetch(`${INVERTER_ENDPOINT}/site/${siteNumber}/energy?${searchParams}`, { method: 'GET' })
  if (response.status != 200) return undefined
  const jsonData = await response.json()
  return jsonData
}

const getInverterTimeZone = async (siteNumber, apiKey) => {
  const apiKeySearchParams = new URLSearchParams({
    api_key: apiKey
  })

  const response = await fetch(`${INVERTER_ENDPOINT}/site/${siteNumber}/details?${apiKeySearchParams}`, { method: 'GET' })
  if (response.status != 200) return undefined
  const jsonData = await response.json()
  return jsonData.details.location.timeZone
}

export {
  getInverterData,
  getInverterTimeZone
}