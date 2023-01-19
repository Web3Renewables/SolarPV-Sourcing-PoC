import { claimToNameMap } from "@config/switchboard";

const VCNotification = ({claim}) => {

  return (
    <>{claimToNameMap(claim.claimType)}</>
  )
}

export default VCNotification;
