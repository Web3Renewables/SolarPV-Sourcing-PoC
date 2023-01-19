import { installerGeneralFields} from '@utils/forms/fields';
import { getFormItem } from "@utils/forms"


const GenericInstallerInformation = () => {

    return (
        <>
            {Object.values(installerGeneralFields).map(obj => {
                return getFormItem(obj)
            })}
        </>
    )


}

export default GenericInstallerInformation;