import { Select, Typography } from "antd";
import styled from "styled-components";

const StyledFormContainer = styled.div`
display: flex;
flex-direction: column;
margin: auto;
`

const AssignElectrician = ({electricians, selected, setSelected}) => {
    
    return (
        <StyledFormContainer>
            <Select 
                style={{margin: '10px'}}
                options={electricians.filter((electrician) => electrician !== undefined).map(electrician => {
                    return {value: electrician.claim.sub, label: electrician.parsed.electrician_full_name}
                })}
                value={selected}
                onChange={(value) => setSelected(value)}
            />
            <Typography.Text style={{marginLeft: '10px', marginRight: '10px'}}>{selected ?? ""}</Typography.Text>
        </StyledFormContainer>
    )
}

export default AssignElectrician;