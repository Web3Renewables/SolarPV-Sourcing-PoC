import { reformatFormObjectDates, filterDictionaryByKeys, submitButton, filterDictionaryExcludeKeys, seperateByPrivateAttribute } from './index'
import moment from "moment"
import { render, fireEvent, waitFor, screen, act } from "@testing-library/react";
import { Form, DatePicker } from 'antd'
import { businessRelationshipFields, electricianLicenseFields, installerGeneralFields, pvSystemFields, PVSystemKey, solarEdgeDependencies, systemOwnerFields } from './fields';

const mockObjectData = {
  "key1_name": "hi",
  "key1_addr": "test",
  "key1_email": "new",
  "key1_phone": "phone",
  "key2_name": "sample",
  "key3_name": "fruit",
  "key4_name": "tall",
  "key4_test": "plant",
  "key5_name": "word",
  "key5_open": "flower",
  "key5_close": "test",
}

const mockInstallerData = {
  "installer_business_name": "Business Name",
  "installer_business_address": "1234 Fake St",
  "installer_business_website": "example.com",
  "installer_owner_name": "John Smith",
  "installer_company_ein": "1231212",
  "prefix": "1",
  "installer_contact_phone_number": "1111111111",
  "installer_contact_email": "example@example.com",
  "electrician_class_type": "11",
  "electrician_license_number": "11",
  "electrician_application_number": "1234",
  "electrician_status": "issued",
  "electrician_expiration_date": "2022-10-04",
  "electrician_effective_date": "2022-10-04",
  "electrician_origination_date": "2022-10-04",
  "electrician_print_date": "2022-10-11",
  "electrician_enforcement_action_radio": "yes",
  "business_relationship_electrician_name": "Test Name",
  "business_relationship_class_type": "Master Electrician",
  "business_relationship_license_number": "sa",
  "business_relationship_application_number": "2838292",
  "business_relationship_status": "issued",
  "business_relationship_expiration_date": "2022-10-17",
  "business_relationship_effective_date": "2022-10-03",
  "business_relationship_origination_date": "2022-10-09",
  "business_relationship_print_date": "2022-10-05",
  "electrician_enforcement_action": "mmm"
}

const mockPvSystemData = {
  "pv_system_pv_system_capacity": "10000.2",
  "pv_system_pv_system_capacity_dc": "10000.2",
  "pv_system_meter_id": "12345",
  "pv_system_balancing_authority": "Midcontinent Independent System Operator, Inc.",
  "pv_system_measurement_body": "Sample Measurement Body",
  "pv_system_meter_serial_number": "12345",
  "pv_system_on_site_meter_number": "12341",
  "pv_system_latitidue_of_production_device": "-43.2",
  "pv_system_longitude_of_production_device": "89.2",
  "pv_system_grid_interjection": "Grid",
  "pv_system_production_device_auxiliaries": "asd",
  "pv_system_production_device_date_of_comissioning": "2022-10-05",
  "pv_system_meter_type": "solar_edge_inverter",
  "pv_system_api_key": "TEST_API_KEY",
  "pv_system_site_number": 12344029
}

const mockSystemOwnerData = {
  "system_owner_full_name": "Temp Name",
  "system_owner_address": "1234 Fake St",
  "prefix": 1,
  "system_owner_phone_number": "123-123-1234",
  "system_owner_email_address": "example@example.com"
}

describe("test the form helper functions for transfoming objects", () => {
  test('dates of type Moment can be converted to ISO 8601', async () => {

    render(
      <Form
        name={"test-from"}
        onFinish={(values) => {
          const formatted = reformatFormObjectDates(values, 'YYYY-MM-DD')
          expect(formatted).toStrictEqual({ test_input: '2015-01-01' })
        }}
        initialValues={{
          test_input: moment('2015-01-01', 'YYYY-MM-DD')
        }}>
        <Form.Item
          label={"test"}
          name={"test_input"}
          data-testid={"test"}
          style={{ justifyContent: 'center' }}
          rules={[
            { required: true, message: "test message" },
          ]}
        >
          <DatePicker />
        </Form.Item>
        {submitButton}
      </Form>
    );

    const submitBtn = screen.getByTestId("submit_button")

    await act(async () => {
      fireEvent.click(submitBtn);
    });
  })

  test('an object can be filtered by providing an array of dictionary keys', () => {
    let filterKeys = ["key1", "key4"]

    let filteredData = filterDictionaryByKeys(mockObjectData, filterKeys)

    expect(filteredData).toStrictEqual({
      "key1_name": "hi",
      "key1_addr": "test",
      "key1_email": "new",
      "key1_phone": "phone",
      "key4_name": "tall",
      "key4_test": "plant",
    })
  })

  test('an object can be filtered by providing an array of dictionary keys to not remove', () => {

    let filterKeys = ["key1", "key5"]

    let filteredData = filterDictionaryExcludeKeys(mockObjectData, filterKeys)

    expect(filteredData).toStrictEqual({
      "key2_name": "sample",
      "key3_name": "fruit",
      "key4_name": "tall",
      "key4_test": "plant",
    })
  })

  test('filtering multiple keys', () => {

    const OFF_CHAIN_KEYS = ["_api_key", "_meter_serial_number", "_latitidue_of_production_device", "_longitude_of_production_device"]

    const mockObject = {
      pv_system_name: "Name",
      pv_system_api_key: "Test API Key",
      pv_system_date: "Test Date",
      pv_system_ein_number: "Test API Key",
      pv_system_meter_serial_number: "Serial Number",
      pv_system_latitidue_of_production_device: "42.2",
      pv_system_longitude_of_production_device: "83.2",
      pv_system_temp: "Temp",
    }

    let removed = filterDictionaryExcludeKeys(mockObject, OFF_CHAIN_KEYS)
    let included = filterDictionaryByKeys(mockObject, OFF_CHAIN_KEYS)

    expect(removed).toStrictEqual({
      pv_system_name: mockObject.pv_system_name,
      pv_system_date: mockObject.pv_system_date,
      pv_system_ein_number: mockObject.pv_system_ein_number,
      pv_system_temp: mockObject.pv_system_temp,
    })

    expect(included).toStrictEqual({
      pv_system_api_key: mockObject.pv_system_api_key,
      pv_system_meter_serial_number: mockObject.pv_system_meter_serial_number,
      pv_system_latitidue_of_production_device: mockObject.pv_system_latitidue_of_production_device,
      pv_system_longitude_of_production_device: mockObject.pv_system_longitude_of_production_device,
    })
  })

  test('filter by private attribute', () => {
    // Testing Installer Private Data
    const {privateData: installerPrivateData, publicData: installerPublicData} = seperateByPrivateAttribute(mockInstallerData, [installerGeneralFields, electricianLicenseFields, businessRelationshipFields])
    
    expect(installerPrivateData).toStrictEqual({installer_company_ein: mockInstallerData.installer_company_ein})

    delete mockInstallerData["installer_company_ein"]
    expect(installerPublicData).toStrictEqual(mockInstallerData)

    // Testing PV System Private Data (However, not actually used as that is more restrictive with lat/long)
    const {privateData: pvSystemPrivateData, publicData: pvSystemPublicData} = seperateByPrivateAttribute(mockPvSystemData, [pvSystemFields, solarEdgeDependencies(PVSystemKey, )])
    
    expect(pvSystemPrivateData).toStrictEqual({
      pv_system_api_key: mockPvSystemData.pv_system_api_key,
      pv_system_meter_serial_number: mockPvSystemData.pv_system_meter_serial_number,
    })

    delete mockPvSystemData["pv_system_api_key"]
    delete mockPvSystemData["pv_system_meter_serial_number"]
    expect(pvSystemPublicData).toStrictEqual(mockPvSystemData)

    // Testing System Owner Data (However, all of this data is encrypted/private no matter what)
    const {privateData: systemOwnerPrivateData, publicData: systemOwnerPublicData} = seperateByPrivateAttribute(mockSystemOwnerData, [systemOwnerFields])

    expect(systemOwnerPublicData).toStrictEqual({prefix: mockSystemOwnerData.prefix})

    delete mockSystemOwnerData['prefix']
    expect(systemOwnerPrivateData).toStrictEqual(mockSystemOwnerData)
  })
})