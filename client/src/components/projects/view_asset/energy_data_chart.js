import { Card, Typography, Empty, Tabs, Result } from "antd";
import { DateTime } from 'luxon'
import { Line } from "@ant-design/plots"
const { Title } = Typography

const items = [
  { label: 'Generation Data', key: 'generation', children: 'Content 1' }, // remember to pass the key prop
  { label: 'Tab 2', key: 'item-2', children: 'Content 2' },
];

const EnergyDataChart = ({ energyData, level = 4, setTitle, loading }) => {

  if (!energyData) return (<Empty />)
  if (!loading.loading && !loading.success) return <Result status="error" subTitle="Could not retrieve Granular Certificate. Please try again." />

  const getTitleText = (data) => {
    if (!data || !data.startDate || !data.endDate) return "Energy Data"
    
    if(data.xAxisUnit === 'Hour') {
      const startDate = DateTime.fromISO(data.startDate, {zone: "utc"}).setZone(data.timezone)
      const endDate = DateTime.fromISO(data.endDate, {zone: "utc"}).setZone(data.timezone)
      const timeZoneAbrev = startDate.toFormat("ZZZZ")
  
      return `${startDate.toFormat('MM/dd/yyyy, HH:mm')} ${timeZoneAbrev} - ${endDate.toFormat('MM/dd/yyyy, HH:mm')} ${timeZoneAbrev}`
    } else {
      const startDate = DateTime.fromISO(data.startDate, {zone: "utc"})
      const endDate = DateTime.fromISO(data.endDate, {zone: "utc"})
      return `${startDate.toFormat('MM/dd/yyyy')} - ${endDate.toFormat('MM/dd/yyyy')}`
    }
    
  }

  const GenerationData = (energyData) => {
    if (!energyData || !energyData.values || !energyData.values.length) return <Empty />

    const daysInMonth = DateTime.fromISO(energyData.values[0].date).daysInMonth

    const config = {
      data: energyData.values,
      xField: 'date',
      yField: 'value',
      loading: loading.loading,
      smooth: true,
      xAxis: {
        tickCount: (energyData.xAxisUnit === 'Hour') ? 24 : daysInMonth,
        title: { text: energyData.xAxisUnit },
      },
      yAxis: {
        title: { text: `${energyData.unit} Energy` },
      }
    };
    return <Line {...config} />
  }

  const EmissionsAvoided = (energyData) => {
    if (!energyData || !energyData.avoidedEmissions || !energyData.values.length) return <Empty />

    const daysInMonth = DateTime.fromISO(energyData.avoidedEmissions[0].date).daysInMonth
    const config = {
      data: energyData.avoidedEmissions,
      xField: 'timestamp',
      yField: 'emissionsAvoided',
      loading: loading.loading,
      smooth: true,
      xAxis: {
        tickCount: (energyData.xAxisUnit === 'Hour') ? 24 : daysInMonth,
        title: { text: energyData.xAxisUnit },
      },
      yAxis: {
        title: { text: 'lb CO2 / Wh Avoided' },
      }
    };
    return <Line {...config} />
  }

  return (
    <div>
      <Title level={4}>{getTitleText(energyData)}</Title>
      <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Generation Data" key="1">
        {GenerationData(energyData)}
      </Tabs.TabPane>
      <Tabs.TabPane tab="Avoided Emissions" key="2">
        {EmissionsAvoided(energyData)}
      </Tabs.TabPane>
    </Tabs>
    </div>
    
  );

}

export default EnergyDataChart
