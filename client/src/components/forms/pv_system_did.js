import { pvSystemFields, PVSystemKey, solarEdgeDependencies } from '@utils/forms/fields';
import { getFormItem } from "@utils/forms"
import { message } from 'antd'
import { useState } from 'react';


const PVSystemDIDFields = ({ form }) => {
  const [solarEdgeLoadCounter, setSolarEdgeLoadCounter] = useState(0)
  const [options, setOptions] = useState([])
  const [showSolarEdgeDependencies, setShowSolarEdgeDependencies] = useState(false)
  const [loading, setLoading] = useState(false)

  const onChangeCallback = (key, value) => {
    switch (key) {
      case `${PVSystemKey}_api_key`:
        setOptions([])
        form.setFieldsValue({
          [`${PVSystemKey}_site_number`]: undefined
        })
        break;
      case pvSystemFields.MeterType.key:
        if (value === "solar_edge_inverter") {
          setShowSolarEdgeDependencies(true)
        } else {
          setShowSolarEdgeDependencies(false)
        }
        break;
      case `${PVSystemKey}_load_sites_button`:
        const apiKey = form.getFieldValue(`${PVSystemKey}_api_key`)
        if (!apiKey && solarEdgeLoadCounter != 0) {
          message.warning("Please enter an API key!", 5)
          setSolarEdgeLoadCounter((prevValue) => prevValue + 1)
          resetInverterSiteList()
          return
        } else if (!apiKey) { return resetInverterSiteList() }
        setSolarEdgeLoadCounter((prevValue) => prevValue + 1)
        tryFetch(form.getFieldValue(`${PVSystemKey}_api_key`))
        break;
      default:
        return
    }
  }

  const resetInverterSiteList = () => {
    setLoading(false)
    setOptions([])
    form.setFieldsValue({
      [`${PVSystemKey}_site_number`]: undefined
    })
  }

  const tryFetch = async (apiKey) => {
    setLoading(true)
    try {
      const siteListRes = await fetch("/api/solaredge/site_list", {
        method: "POST",
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({
          api_key: apiKey
        })
      })
      if (!siteListRes.ok) {
        resetInverterSiteList()
        message.error("Please enter a valid API key.", 5)
        return
      }
      const data = await siteListRes.json()
      setOptions(data)
      setLoading(false)
    } catch (e) {
      message.error("An unexpected error occured!", 5)
      resetInverterSiteList()
    }
  }

  return (
    <>
      {Object.values(pvSystemFields).map(obj => {
        return getFormItem(obj, onChangeCallback)
      })}
      {showSolarEdgeDependencies ? Object.values(solarEdgeDependencies(PVSystemKey, options)).map(obj => {
        return getFormItem(obj, onChangeCallback, loading)
      }) : null}
    </>
  )


}

export default PVSystemDIDFields;