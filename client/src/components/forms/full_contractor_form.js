import { Radio, Form } from 'antd';

import BuildingContractorForm from './building_contractor';
import QualifyingBuilderForm from './qualifying_builder';
import { StyledTitle } from '@utils/forms';

const FullBuildingContractorForm = () => {

    return (
        <>
            <Form.Item
                label="Building Contractor?"
                style={{ justifyContent: 'center' }}
                name="building_contractor_radio"
                data-testid="building_contractor_radio"
                rules={[{ required: true, },]}>
                <Radio.Group>
                    <Radio value="yes" data-testid="building_contractor_radio_yes" > Yes </Radio>
                    <Radio value="no" data-testid="building_contractor_radio_no"> No </Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                noStyle
                style={{ justifyContent: 'center' }}
                shouldUpdate={(prevValues, currentValues) => prevValues.building_contractor_radio !== currentValues.building_contractor_radio}>
                {({ getFieldValue }) => getFieldValue('building_contractor_radio') === 'yes' ? (
                    <>
                        <StyledTitle level={3}>Building Contractor License</StyledTitle>
                        <BuildingContractorForm />
                        <StyledTitle level={3}>Qualifying Builder License</StyledTitle>
                        <QualifyingBuilderForm />
                    </>
                ) : null}
            </Form.Item>
        </>
    )

}

export default FullBuildingContractorForm;