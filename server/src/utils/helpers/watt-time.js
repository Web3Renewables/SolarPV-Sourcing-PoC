import fetch from "node-fetch";
import { WATT_TIME_ENDPOINT } from "../../config.js"

/**
 * Retrieves a JWT token for future WattTime API Requests
 * @returns {string} 
 */
const loginWattTime = async () => {
  var b = Buffer.from(`${process.env.WATT_TIME_USERNAME}:${process.env.WATT_TIME_PASSWORD}`);

  const url = `${WATT_TIME_ENDPOINT}/login`
  const request = {
    method: 'GET',
    headers: {
      Authorization: `Basic ${b.toString('base64')}`
    }
  }

  const response = await fetch(url, request)
  if (response.status !== 200) return undefined
  return (await response.json()).token
}

/**
 * Retrieves the WattTime data for generated emissions at the specified location
 * @param {string} latitude Latitude of Solar Generation Device
 * @param {string} longitude Longitude of Solar Generation Device
 * @param {string} startTime Start time (in UTC)
 * @param {string} endTime End time of WattTime data (in UTC)
 * @param {string} token WattTime API Token from Login
 * @returns {Object}
 */
const getWattTimeData = async (latitude, longitude, startTime, endTime, token) => {
  const searchParams = new URLSearchParams({
    latitude: latitude,
    longitude: longitude,
    starttime: startTime,
    endTime: endTime
  })
  const request = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const url = `${WATT_TIME_ENDPOINT}/data?${searchParams}`

  const response = await fetch(url, request)
  if (response.status !== 200) return undefined
  return (await response.json())
}

export {
  loginWattTime,
  getWattTimeData
}