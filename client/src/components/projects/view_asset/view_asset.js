import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { DateTime } from 'luxon'
import { Card, Layout, notification, Typography, Button, Statistic } from 'antd'
import { useRouter } from 'next/router'
import { IPNSAddress, indexFileName } from "@config/environment";
import { pvSystemFields, PVSystemKey, solarEdgeDependencies } from "@utils/forms/fields";
import { systemOwnerFields } from "@utils/forms/fields"
import { getIndexJsonBody, getPVSystemDailyGCs, getPVSystemMonthlyGCs } from "@actions/projects/get_pv_system_daily_gcs";
import EnergyDataChart from "./energy_data_chart";
import GCTable from "./gc_table";
import ClaimDisplay from "../view_claim_data";
import { getPVSystemObjectData } from "@libs/iam_client_lib/utils/claim_data_parse";
import EditPVSystemRoleModal from "./edit_pv_system_role_modal";
import { ADMIN_ROLE_NAMESPACE } from "@config/switchboard";
import PoweredBy from "@components/inverters/attribution";
import { IamClientContext } from "@providers/iam_client_lib";

const { Title } = Typography

const GlobalContainer = styled(Layout)`
display: flex;
background-color: #fff;
flex-direction: column;

`

const ChartContainer = styled(Layout)`
background-color: #fff;
flex: 0 0 50%;
flex-direction: column;
justify-content: space-evenly;
align-items: stretch;
min-width: 0;
padding: 10px
`

const PVSystemContainer = styled(Layout.Content)`
@media (min-width: 768px) {
  background-color: #fff;
  display: flex;
  flex-direction: row;
  padding: 10px;
}
`

const StatisticContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-evenly;
align-items: center;
margin-top: 10px;
`

const ViewAsset = ({ pvSystem, systemOwner, roles, isInstaller, pvSystemEncrypted, csrfToken }) => {

  const { iamClient } = useContext(IamClientContext)
  const router = useRouter()
  const [dailyGCData, setDailyGCData] = useState([])
  const [monthlyGCData, setMonthlyGCData] = useState([])
  const [editPVSystemRoleModal, setEditPVSystemRoleModal] = useState(false)
  const [pvSystemRoleStatus, setPVSystemRoleStatus] = useState()
  const [selected, setSelected] = useState({ type: "daily", dailyIndex: 0, monthlyIndex: 0 })
  const [selectedEnergyData, setSelectedEnergyData] = useState()
  const [energyDataLoading, setEnergyDataLoading] = useState({ loading: true, success: undefined })
  const joinedFields = Object.assign({}, pvSystemFields, solarEdgeDependencies(PVSystemKey, []))
  const pvSystemDID = pvSystem.subject

  useEffect(() => {
    fetchData()
  }, [iamClient])

  const fetchData = async () => {
    try {
      const indexJsonBody = await getIndex()
      const data = await getPVSystemDailyGCs(pvSystemDID, indexJsonBody)
      setDailyGCData(data)

      try {
        getEnergyData(selected, data)
      } catch { }

      const monthly = await getPVSystemMonthlyGCs(pvSystemDID, indexJsonBody)
      setMonthlyGCData(monthly)

    } catch (e) {
      notification.warning({
        key: "granular_certificate_warning",
        message: "Granular Certificate Retrieval",
        description: e.message,
        duration: 0
      })
    }
  }

  const getIndex = async () => {
    try {
      const indexJsonBody = await getIndexJsonBody(IPNSAddress, indexFileName)
      if (!indexJsonBody.pvSystems[pvSystemDID] || !indexJsonBody.pvSystems[pvSystemDID].status) {
        setPVSystemRoleStatus(null)
      } else {
        setPVSystemRoleStatus(indexJsonBody.pvSystems[pvSystemDID].status)
      }
      return indexJsonBody
    } catch (e) {
      setPVSystemRoleStatus(undefined)
      return undefined
    }
  }

  const refreshPage = async () => {
    router.reload(window.location.pathname)
  }

  const mapNotNull = (value) => {
    if (value === null) return 0
    return value
  }

  const changeGC = (selectedGc, daily = undefined, monthly = undefined) => {
    const tempDaily = !daily ? dailyGCData : daily
    const tempMonthly = !monthly ? monthlyGCData : monthly
    setSelected(selectedGc)
    setEnergyDataLoading({ loading: true, success: undefined })
    getEnergyData(selectedGc, tempDaily, tempMonthly)
  }

  const getEnergyData = async (selectedGc, dailyData, monthlyData) => {
    if (selectedGc.type === "daily") {
      if (!dailyData || !dailyData.length) return undefined
      const res = await fetch(dailyData[selectedGc.dailyIndex].url)
      if (!res.ok) {
        console.log("Could not fetch energy data")
        setEnergyDataLoading({ loading: false, success: false })
        return
      }
      const data = await res.json()

      console.log(data.generation_data.values)

      setSelectedEnergyData({
        values: data.generation_data.values.map(obj => { return { date: DateTime.fromISO(obj.timestamp, { zone: "utc" }).setZone(data.timezone).toFormat('HH:mm:ss'), value: mapNotNull(obj.energy) } }),
        unit: data.generation_data.unit,
        xAxisUnit: "Hour",
        startDate: data.production_interval_start,
        endDate: data.production_interval_end,
        timezone: data.timezone,
        totalWh: data.total_wh_generation,
        totalEmissionsAvoided: data.total_emissions_avoided,
        fileName: dailyData[selectedGc.dailyIndex].fileName,
        indexDate: dailyData[selectedGc.dailyIndex].date,
        avoidedEmissions: data.generation_data.values.map(obj => { return { timestamp: DateTime.fromISO(obj.timestamp, { zone: "utc" }).setZone(data.timezone).toFormat('HH:mm:ss'), emissionsAvoided: obj.emissionsAvoided } })
      })
      setEnergyDataLoading({ loading: false, success: true })
    } else {
      if (!monthlyData || !monthlyData.length) return undefined

      const res = await fetch(monthlyData[selectedGc.monthlyIndex].url)
      if (!res.ok) {
        console.log("Could not fetch energy data")
        setEnergyDataLoading({ loading: false, success: false })
        return
      }
      const data = await res.json()

      setSelectedEnergyData({
        values: data.generation_data.map(obj => { return { date: DateTime.fromISO(obj.production_interval_start).toISODate(), value: obj.values.reduce((sum, obj) => sum + mapNotNull(obj.energy), 0) } }),
        unit: data.generation_data[0].unit,
        xAxisUnit: "Day",
        startDate: DateTime.fromFormat(data.production_interval_start, 'yyyy-M-d', { zone: 'utc' }).toISO(),
        endDate: DateTime.fromFormat(data.production_interval_end, 'yyyy-M-d', { zone: 'utc' }).toISO(),
        timezone: data.timezone,
        totalWh: data.total_wh_generation,
        totalEmissionsAvoided: data.total_emissions_avoided,
        fileName: monthlyData[selectedGc.monthlyIndex].fileName,
        indexDate: monthlyData[selectedGc.monthlyIndex].date,
        avoidedEmissions: data.generation_data.map(obj => { return { timestamp: DateTime.fromISO(obj.production_interval_start).toISODate(), emissionsAvoided: obj.values.reduce((sum, obj) => sum + mapNotNull(obj.emissionsAvoided), 0) } }),
      })
      setEnergyDataLoading({ loading: false, success: true })
    }
  }

  return (
    <GlobalContainer>
      <ChartContainer>
        <Card>
          <Title level={3}>Granular Certificates</Title>
          <Card>
            <EnergyDataChart energyData={selectedEnergyData} loading={energyDataLoading} />
          </Card>
          {
            selectedEnergyData !== undefined && selectedEnergyData.totalWh !== undefined && selectedEnergyData.totalEmissionsAvoided !== undefined ?
              <StatisticContainer>
                <Statistic title="Total Generation" value={selectedEnergyData.totalWh} suffix={"Wh"} />
                <Statistic title="Total Emissions Avoided" value={selectedEnergyData.totalEmissionsAvoided} precision={2} suffix={"lb CO2 / Wh Avoided"} />
                <PoweredBy pvSystem={getPVSystemObjectData(pvSystem)} />
              </StatisticContainer> : null
          }
          <GCTable gcDatas={{
            daily: dailyGCData.map(obj => { return { production_interval_start: obj.date, fileName: obj.fileName } }),
            monthly: monthlyGCData.map(obj => { return { production_interval_start: obj.date, fileName: obj.fileName } }),
          }}
            selected={selected}
            clicked={changeGC} />
        </Card>
      </ChartContainer>
      <PVSystemContainer>
        <ClaimDisplay
          title={"PV System Information"}
          data={getPVSystemObjectData(pvSystem)}
          unpublishedDescription={"Please publish the PV System's verifiable credential."}
          reRenderableKeys={["pv_system_meter_type"]}
          fieldsObject={joinedFields}>
          <ClaimDisplay
            title="Private Information"
            data={pvSystemEncrypted}
            fieldsObject={joinedFields}
            isInstaller={isInstaller}
            includeCard={false}
            refreshPage={() => refreshPage()} />
          {!roles || !roles.includes(ADMIN_ROLE_NAMESPACE) ? null :
            <Button
              onClick={() => setEditPVSystemRoleModal(true)}
              style={{ marginTop: '10px', marginBottom: '10px', width: '100%' }}
              disabled={pvSystemRoleStatus === undefined}>
              Edit PV System Role
            </Button>
          }
        </ClaimDisplay>
        <ClaimDisplay
          isInstaller={isInstaller}
          title={"System Owner Information"}
          data={systemOwner}
          fieldsObject={systemOwnerFields} refreshPage={() => refreshPage()} />
      </PVSystemContainer>
      <EditPVSystemRoleModal csrfToken={csrfToken} visible={editPVSystemRoleModal} setEditPVSystemeModal={setEditPVSystemRoleModal} did={pvSystemDID} status={pvSystemRoleStatus} reloadIndexCallback={() => getIndex()} />
    </GlobalContainer>
  )
}

export default ViewAsset;