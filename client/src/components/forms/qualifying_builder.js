import { StyledContainer, StyledTitle, getFormItem } from "@utils/forms"
import { qualifyingBuilderLicenseFields } from '@utils/forms/fields';


const QualifyingBuilderForm = () => {

    return (
        <StyledContainer>
            {Object.values(qualifyingBuilderLicenseFields).map(obj => {
                return getFormItem(obj)
            })}
        </StyledContainer>
    )
}

export default QualifyingBuilderForm;