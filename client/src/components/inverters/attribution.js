import { Typography } from "antd"
import PoweredBySolarEdge from "./solar_edge_attribution"

const PoweredBy = ({ pvSystem }) => {
  
  if(pvSystem === undefined || pvSystem.state !== "complete") return null
  
  switch(pvSystem.data.pv_system_meter_type) {
    case "solar_edge_inverter":
      return <PoweredBySolarEdge />
    default:
      return <Typography.Text strong>No attribution present.</Typography.Text>
  }

}

export default PoweredBy