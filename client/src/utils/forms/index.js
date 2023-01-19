import { Select, Form, Button, Input, DatePicker, Upload, Typography, Radio, Checkbox, Tooltip } from "antd"
import { EyeInvisibleOutlined, InboxOutlined, InfoCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { InputFieldTypes, SuffixTypes } from "./fields"
import styled from "styled-components"
import moment from 'moment'
import { isMoment } from "moment"

const { Dragger } = Upload;

// This regex is the same as the Patterns, but RegExp requires backslashes be escaped where use in patters does not
const VALID_TEXT_REGEX = "^[\\w-/\r\n '@.,?!$:;\"]+$"
const VALID_NUMBER_REGEX = "^[\\w-/\r\n]+$"
const VALID_PROJECT_REGEX = "^[a-zA-Z]+$"

//https://ihateregex.io/expr/phone/
const VALID_PHONE_NUMBER_REGEX = "^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$"

const InvalidTextMessage = "Invalid characters entered!"
const InvalidPhoneMessage = "Invalid phone number!"

/**
 * 
 * @param {{label: string, key: string, required: boolean, requirementMessage: string, type: InputFieldTypes, options: {key: string, value: string}[]?, dependencies: {label: string, key: string, required: boolean, valueToShow: string, requirementMessage: string, type: InputFieldTypes, options: {key: string, value: string}[]?}[]?}} obj 
 * @param {(key: string, value: string)} onChangeCallback 
 * @returns 
 */
const getFormItem = (obj, onChangeCallback = () => { }, loading = false) => {
  switch (obj.type) {
    case InputFieldTypes.Text:
      return (
        <Form.Item
          label={!obj.private ? obj.label : formatPrivateLabel(obj.label)}
          name={obj.key}
          key={obj.key}
          data-testid={obj.key}
          style={{ justifyContent: 'center' }}
          tooltip={obj.tooltip !== undefined ? obj.tooltip : null}
          rules={[
            { required: obj.required, message: obj.requirementMessage },
            { pattern: VALID_TEXT_REGEX, message: InvalidTextMessage }
          ]}
        >
          <Input onChange={(e) => onChangeCallback(obj.key, e.target.value)} suffix={
            obj.suffix !== undefined ? getSuffix(obj.key, obj.suffix, onChangeCallback) : null
          } />
        </Form.Item>
      )
    case InputFieldTypes.Phone:
      return (
        <Form.Item
          label={!obj.private ? obj.label : formatPrivateLabel(obj.label)}
          name={obj.key}
          key={obj.key}
          data-testid={obj.key}
          style={{ justifyContent: 'center' }}
          rules={[
            { required: obj.required, message: obj.requirementMessage },
            { pattern: VALID_PHONE_NUMBER_REGEX, message: InvalidPhoneMessage }
          ]}
        >
          <Input addonBefore={prefixSelector} />
        </Form.Item>
      )
    case InputFieldTypes.Date:
      return (
        <Form.Item
          label={!obj.private ? obj.label : formatPrivateLabel(obj.label)}
          name={obj.key}
          key={obj.key}
          data-testid={obj.key}
          style={{ justifyContent: 'center' }}
          rules={[
            { required: obj.required, message: obj.requirementMessage },
          ]}
        >
          <DatePicker />
        </Form.Item>
      )
    case InputFieldTypes.ComboBox:
      return (
        <Form.Item
          label={!obj.private ? obj.label : formatPrivateLabel(obj.label)}
          name={obj.key}
          key={obj.key}
          data-testid={obj.key}
          style={{ justifyContent: 'center' }}
          tooltip={obj.tooltip !== undefined ? obj.tooltip : null}
          rules={[
            { required: obj.required, message: obj.requirementMessage },
          ]}
        >
          <Select
            showSearch
            optionFilterProp="children"
            onChange={(value) => onChangeCallback(obj.key, value)}
            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
          >
            {obj.options.map((option) => {
              return <Select.Option key={option.key} value={option.key}>{option.value}</Select.Option>
            })}
          </Select>
        </Form.Item>
      )
    case InputFieldTypes.Radio:
      break;
    case InputFieldTypes.MretsRadio:
      return (
        <div key={obj.key}>
          <Form.Item
            label={!obj.private ? obj.label : formatPrivateLabel(obj.label)}
            style={{ justifyContent: 'center' }}
            name={obj.key}
            data-testid={obj.key}
            rules={[{ required: obj.required, message: obj.requirementMessage },]}
            tooltip={obj.tooltip !== undefined ? obj.tooltip : null}
            initialValue={obj.initialValue ?? "no"}>
            <Radio.Group>
              <Radio value="yes" data-testid={`${obj.key}_yes`}> Yes </Radio>
              <Radio value="no" data-testid={`$${obj.key}_no`}> No </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            noStyle
            style={{ justifyContent: 'center' }}
            shouldUpdate={(prevValues, currentValues) => prevValues[obj.key] !== currentValues[obj.key]}>
            {({ getFieldValue }) => getFieldValue(obj.key) === "yes" ? (
              obj.dependencies.filter((el) => el.valueToShow === 'yes').map((subObj) => {
                return getFormItem(subObj)
              })
            ) :
              obj.dependencies.filter((el) => el.valueToShow === 'no').map((subObj) => {
                return getFormItem(subObj)
              })
            }
          </Form.Item>
        </div>
      )
    case InputFieldTypes.CountryState:
      return (
        <div key={obj.key}>
          <Form.Item
            label={!obj.private ? obj.label : formatPrivateLabel(obj.label)}
            name={obj.key}
            key={obj.key}
            data-testid={obj.key}
            style={{ justifyContent: 'center' }}
            initialValue={'United States'}
            rules={[
              { required: obj.required, message: obj.requirementMessage },
            ]}
          >
            <Select
              options={obj.options}
            />
          </Form.Item>
          <Form.Item
            noStyle
            style={{ justifyContent: 'center' }}
            shouldUpdate={(prevValues, currentValues) => prevValues[obj.key] !== currentValues[obj.key]}>
            {({ getFieldValue }) => getFieldValue(obj.key) === obj.options[0].value ? getFormItem(obj.states) : getFormItem(obj.provinces)}
          </Form.Item>
        </div>
      )
    case InputFieldTypes.TextArea:
      break;
    case InputFieldTypes.Title:
      return (
        <StyledTitle key={obj.key} level={4}>{obj.label}</StyledTitle>
      )
    case InputFieldTypes.CheckBoxes:
      return (
        <div key={obj.key}>
          <Form.Item
            label={!obj.private ? obj.label : formatPrivateLabel(obj.label)}
            style={{ justifyContent: 'center' }}
            name={obj.key}
            data-testid={obj.key}
            tooltip={obj.tooltip !== undefined ? obj.tooltip : null}
            rules={[{ required: obj.required, message: obj.requirementMessage },]}
          >
            <Checkbox.Group
              options={obj.options}
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            />
          </Form.Item>
        </div>
      )
    case InputFieldTypes.ComboBoxDependencies:
      return (
        <div key={obj.key}>
          <Form.Item
            label={!obj.private ? obj.label : formatPrivateLabel(obj.label)}
            name={obj.key}
            key={obj.key}
            data-testid={obj.key}
            style={{ justifyContent: 'center' }}
            tooltip={obj.tooltip !== undefined ? obj.tooltip : null}
            rules={[
              { required: obj.required, message: obj.requirementMessage },
            ]}
          >
            <Select onChange={(value) => onChangeCallback(obj.key, value)}>
              {obj.options.map((option) => {
                return <Select.Option key={option.key} value={option.key}>{option.value}</Select.Option>
              })}
            </Select>
          </Form.Item>
          <Form.Item
            noStyle
            style={{ justifyContent: 'center' }}
            shouldUpdate={(prevValues, currentValues) => prevValues[obj.key] !== currentValues[obj.key]}>
            {({ getFieldValue }) => {
              const fieldKey = getFieldValue(obj.key)
              return obj.dependencies.filter((option) => option.valueToShow === fieldKey).map((subObj) => {
                return getFormItem(subObj, onChangeCallback)
              })
            }}
          </Form.Item>
        </div>
      )
    case InputFieldTypes.DynamicComboBox:
      break;
    case InputFieldTypes.NotInclude:
      break;
    case InputFieldTypes.Button:
      return <Form.Item key={obj.key} {...tailLayout} style={{ justifyContent: 'center' }}>
        <Button onClick={(e) => onChangeCallback(obj.key, e)} loading={loading}>{obj.label}</Button>
      </Form.Item>
  }
}

const formatPrivateLabel = (label) => {
  return <>
    {label}
    <Tooltip title={"Private"}>
      <EyeInvisibleOutlined style={{marginLeft: '5px'}}/>
    </Tooltip>
  </>
}

const uploadFormItem = (props, obj) => {
  return (
    <Form.Item
      label={obj.label}
      name={obj.key}
      data-testid={obj.key}
      style={{ justifyContent: 'center' }}
      rules={[{ required: true, message: obj.requirementMessage }]}
      labelCol={{ span: 0, offset: 2 }}
    >
      <Dragger {...props} listType='picture'>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
      </Dragger>
    </Form.Item>
  )
}

/**
 * Gets the Suffix JSX element (or string)
 * @param {string} key Parent Object's Key
 * @param {{type: string, description: string}} suffix Suffix Object Metadata
 * @param {(key: string, e: Event)} onClick onClick Callback
 */
const getSuffix = (key, suffix, onClick = () => { }) => {
  switch (suffix.type) {
    case SuffixTypes.Text:
      return suffix.description;
    case SuffixTypes.Tooltip:
      return <Tooltip title={suffix.description}>
        <InfoCircleOutlined />
      </Tooltip>
    case SuffixTypes.TooltipButton:
      return (<Tooltip title={suffix.description}>
        <SearchOutlined onClick={(e) => onClick(`${key}_suffix`, e)} />
      </Tooltip>);
    default:
      return null;
  }
}

const StyledTitle = styled(Typography.Title)`
    padding: 10px 25px 10px 25px;
    text-align: center;
`

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const tailLayout = {
  wrapperCol: {
    offset: 10,
    span: 28,
  },
};

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }}>
      <Select.Option value="1">+1</Select.Option>
    </Select>
  </Form.Item>
);

const submitButton = (
  <Form.Item {...tailLayout} style={{ justifyContent: 'center' }}>
    <Button data-testid="submit_button" type="primary" htmlType="submit">
      Submit
    </Button>
  </Form.Item>
)

const reformatFormObjectDates = (formObject, dateFormat) => {
  return Object.fromEntries(
    Object.entries(formObject).map(([k, v]) => {
      if (v === null || v === undefined) {
        return [k, undefined]
      } else if (Object.getPrototypeOf(v).constructor.name === "Moment") {
        return [k, v.format(dateFormat)]
      } else {
        return [k, v]
      }
    }))
}

const reformatDatesToISO8601 = (formObject) => {
  return Object.fromEntries(
    Object.entries(formObject).map(([k, v]) => {
      if (v === null || v === undefined) {
        return [k, undefined]
      } else if (Object.getPrototypeOf(v).constructor.name === "Moment") {
        return [k, v.toISOString().slice(0, -5)]
      } else {
        return [k, v]
      }
    }))
}

const reformatRepowerDates = (formObject) => {
  if (formObject.dates === undefined) return formObject
  let temp = formObject
  const updated = temp.dates.map((obj) => {
    return { date: obj.date.toISOString().slice(0, -5), capacity: obj.capacity }
  })
  temp.dates = updated
  return temp
}

const reformatFieldsToItemKeys = (formObject) => {
  return Object.fromEntries(
    Object.entries(formObject).map(([k, v]) => {
      if (v === null || v === undefined) {
        return [k, undefined]
      } else if (typeof v === "string") {
        return [k, v]
      } else {
        return [v.key, v]
      }
    }))
}

const filterDictionaryByKeys = (dictionary, keys) => {
  return Object.fromEntries(
    Object.entries(dictionary).filter(([k, v]) => {
      let flag = false
      keys.forEach((filterKey) => {
        if (k.includes(filterKey)) {
          flag = true
        }
      })
      if (flag) return [k, v]
    }))
}

const replaceDictionaryKeys = (dictionary, key) => {
  return Object.fromEntries(
    Object.entries(dictionary).map(([k, v]) => {
      if (k.includes(key)) {
        return [k.replace(key, ""), v]
      }
      return [k, v]
    }))
}

const mapUndefinedToNull = (dictionary) => {
  return Object.fromEntries(
    Object.entries(dictionary).map(([k, v]) => {
      if (v === undefined) {
        return [k, null]
      } else {
        return [k, v]
      }
    }))
}

const mapObjectsFromProperties = (dictionary, properties) => {
  return Object.fromEntries(
    Object.entries(dictionary).map(([k, v]) => {
      if (v !== undefined && v !== null) {
        if (properties[k].type === "date") {
          if (isMoment(v)) {
            return [k, moment().toISOString(v)]
          } else {
            return [k, v]
          }
        } else {
          return [k, v]
        }
      } else {
        return [k, null]
      }
    }))
}

const filterDictionaryExcludeKeys = (dictionary, keys) => {
  return Object.fromEntries(
    Object.entries(dictionary).filter(([k, v]) => {
      let flag = true
      keys.forEach((filterKey) => {
        if (k.includes(filterKey)) {
          flag = false
        }
      })
      if (flag) return [k, v]
    }))
}

/**
 * Given a submitted Ant design form object (dictionary from onFinish), use the known fields to find and seperate all private values
 * @param {Object} dictionary Dictionary object that contains entered values matching the supplied field objects
 * @param {Object[]} fieldObjects Feilds objects to check for private values (used for constructing forms)
 * @returns 
 */
const seperateByPrivateAttribute = (dictionary, fieldObjects) => {
  let privateKeysToFilter = []

  fieldObjects.forEach(field => {
    const allKeys = Object.keys(field)
    allKeys.forEach(key => {
      const entry = field[key]
      if(entry.private !== undefined && entry.private) {
        privateKeysToFilter.push(entry.key)
      }
    })
  })
  return {
    publicData: filterDictionaryExcludeKeys(dictionary, privateKeysToFilter), 
    privateData: filterDictionaryByKeys(dictionary, privateKeysToFilter)
  }
}

const capitalize = (s) => {
  const word = s.toString()
  return word[0].toUpperCase() + word.slice(1);
}

const capitalizeAll = (sentence) => {
  const tokens = sentence.split(" ")
  const uppercasedTokens = tokens.map(word => capitalize(word))
  return uppercasedTokens.join(" ")
}

export {
  VALID_TEXT_REGEX,
  VALID_PHONE_NUMBER_REGEX,
  VALID_PROJECT_REGEX,
  VALID_NUMBER_REGEX,
  prefixSelector,
  submitButton,
  InvalidPhoneMessage,
  InvalidTextMessage,
  getFormItem,
  StyledContainer,
  StyledTitle,
  reformatFormObjectDates,
  reformatRepowerDates,
  reformatDatesToISO8601,
  filterDictionaryByKeys,
  filterDictionaryExcludeKeys,
  replaceDictionaryKeys,
  mapObjectsFromProperties,
  mapUndefinedToNull,
  uploadFormItem,
  reformatFieldsToItemKeys,
  capitalize,
  tailLayout,
  capitalizeAll,
  seperateByPrivateAttribute
};
