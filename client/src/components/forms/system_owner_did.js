import { systemOwnerFields} from '@utils/forms/fields';
import { getFormItem } from "@utils/forms"


const SystemOwnerDIDForm = () => {

    return (
        <>
            {Object.values(systemOwnerFields).map(obj => {
                return getFormItem(obj)
            })}
        </>
    )


}

export default SystemOwnerDIDForm;