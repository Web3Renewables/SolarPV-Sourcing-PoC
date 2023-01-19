import assert, { deepEqual, equal } from 'assert'
import { mockInverter, mockWattTimeData } from '../mocks/watt-time.js';
import { decodeAndParseJWT, formatDateString, getDaysInMonth, getUniqueMonths, getYearMonthDayUtc, sortNewestByCreatedAt } from '../utils/utils.js'
import { transformDataToEmissionsAvoided } from "../utils/mappers/transformer.js"
import { DateTime } from 'luxon'

describe('utility function', () => {
  it('#getLastMonthDays', () => {
    const monthDays = [
      { month: 1, days: 31 }, // Jan
      { month: 2, days: 28 }, // Feb
      { month: 3, days: 31 }, // Mar
      { month: 4, days: 30 }, // Apr
      { month: 5, days: 31 }, // May
      { month: 6, days: 30 }, // Jun
      { month: 7, days: 31 }, // July
      { month: 8, days: 31 }, // Aug
      { month: 9, days: 30 }, // Sep
      { month: 10, days: 31 }, // Oct
      { month: 11, days: 30 }, // Nov
      { month: 12, days: 31 }, // Dec
    ]
    const year = 2022
    monthDays.forEach(obj => {
      assert.equal(getDaysInMonth(obj.month, year).daysInMonth, obj.days)
    })
  })

  it('#getYearMonthUTC', () => {
    const date = getYearMonthDayUtc("2022-09-15T00:00:00.000Z")
    assert.deepEqual(date, { year: "2022", day: "15", month: "9" })
  })

  it('#getUniqueMonths', () => {
    const dates = ['2022-08-19', '2022-08-20', '2022-08-01', '2022-08-17', '2021-08-05', '2021-08-19', '2022-09-12', '2022-09-05'].map(date => getYearMonthDayUtc(date))
    const months = getUniqueMonths(dates)
    assert.deepEqual(months, [
      {
        month: '8',
        year: '2022'
      },
      {
        month: '8',
        year: '2021'
      },
      {
        month: '9',
        year: '2022'
      }
    ])
  })

  it('#sortByCreatedAt', () => {
    const dates = [
      { createdAt: '2022-09-30T15:11:17.864Z' },
      { createdAt: '2022-09-26T20:09:42.584Z' },
      { createdAt: '2022-09-27T14:17:18.604Z' },
      { createdAt: '2022-08-23T19:43:02.585Z' },
      { createdAt: '2022-10-05T18:37:02.163Z' },
      { createdAt: '2022-09-27T13:49:18.836Z' }
    ]
    const sorted = dates.sort(sortNewestByCreatedAt)

    const expected = [
      { createdAt: '2022-10-05T18:37:02.163Z' },
      { createdAt: '2022-09-30T15:11:17.864Z' },
      { createdAt: '2022-09-27T14:17:18.604Z' },
      { createdAt: '2022-09-27T13:49:18.836Z' },
      { createdAt: '2022-09-26T20:09:42.584Z' },
      { createdAt: '2022-08-23T19:43:02.585Z' }
    ]

    expected.forEach((date, index) => {
      deepEqual(date, sorted[index])
    })
  })

  it("#decodeAndParseJWT", () => {
    const mockToken = 'eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJjbGFpbURhdGEiOnsiY2xhaW1UeXBlIjoiaW5zdGFsbGVyLnJvbGVzLnJlbmV3YWJsZXN2Ni5nbG9iYWxyZW5ld2FibGVzLmlhbS5ld2MiLCJjbGFpbVR5cGVWZXJzaW9uIjoxLCJyZXF1ZXN0b3JGaWVsZHMiOlt7ImtleSI6ImRhdGEiLCJ2YWx1ZSI6IntcImluc3RhbGxlcl9idXNpbmVzc19uYW1lXCI6XCJFbmNyeXB0aW9uIEJ1c2luZXNzIE5hbWVcIixcImluc3RhbGxlcl9idXNpbmVzc19hZGRyZXNzXCI6XCIxMjM0IEZha2UgU3RcIixcImluc3RhbGxlcl9idXNpbmVzc193ZWJzaXRlXCI6XCJleGFtcGxlLmNvbVwiLFwiaW5zdGFsbGVyX293bmVyX25hbWVcIjpcIkpvaG4gU21pdGhcIixcInByZWZpeFwiOlwiMVwiLFwiaW5zdGFsbGVyX2NvbnRhY3RfcGhvbmVfbnVtYmVyXCI6XCIxMjMtMjMyLTEyMTNcIixcImluc3RhbGxlcl9jb250YWN0X2VtYWlsXCI6XCJleGFtcGxlQGV4YW1wbGUuY29tXCIsXCJlbGVjdHJpY2lhbl9jbGFzc190eXBlXCI6XCIxMVwiLFwiZWxlY3RyaWNpYW5fbGljZW5zZV9udW1iZXJcIjpcIjEyMzRcIixcImVsZWN0cmljaWFuX2FwcGxpY2F0aW9uX251bWJlclwiOlwiMTAzMDFcIixcImVsZWN0cmljaWFuX3N0YXR1c1wiOlwiaXNzdWVkXCIsXCJlbGVjdHJpY2lhbl9leHBpcmF0aW9uX2RhdGVcIjpcIjIwMjItMDktMjdcIixcImVsZWN0cmljaWFuX2VmZmVjdGl2ZV9kYXRlXCI6XCIyMDIyLTA5LTI3XCIsXCJlbGVjdHJpY2lhbl9vcmlnaW5hdGlvbl9kYXRlXCI6XCIyMDIyLTA5LTI3XCIsXCJlbGVjdHJpY2lhbl9wcmludF9kYXRlXCI6XCIyMDIyLTA5LTI3XCIsXCJlbGVjdHJpY2lhbl9lbmZvcmNlbWVudF9hY3Rpb25fcmFkaW9cIjpcInllc1wiLFwiYnVzaW5lc3NfcmVsYXRpb25zaGlwX2VsZWN0cmljaWFuX25hbWVcIjpcIlRlc3QgTmFtZVwiLFwiYnVzaW5lc3NfcmVsYXRpb25zaGlwX2NsYXNzX3R5cGVcIjpcIk1hc3RlciBFbGVjdHJpY2lhblwiLFwiYnVzaW5lc3NfcmVsYXRpb25zaGlwX2xpY2Vuc2VfbnVtYmVyXCI6XCJzYVwiLFwiYnVzaW5lc3NfcmVsYXRpb25zaGlwX2FwcGxpY2F0aW9uX251bWJlclwiOlwiMjgzODI5MlwiLFwiYnVzaW5lc3NfcmVsYXRpb25zaGlwX3N0YXR1c1wiOlwiaXNzdWVkXCIsXCJidXNpbmVzc19yZWxhdGlvbnNoaXBfZXhwaXJhdGlvbl9kYXRlXCI6XCIyMDIyLTEwLTAzXCIsXCJidXNpbmVzc19yZWxhdGlvbnNoaXBfZWZmZWN0aXZlX2RhdGVcIjpcIjIwMjItMDktMjZcIixcImJ1c2luZXNzX3JlbGF0aW9uc2hpcF9vcmlnaW5hdGlvbl9kYXRlXCI6XCIyMDIyLTEwLTAzXCIsXCJidXNpbmVzc19yZWxhdGlvbnNoaXBfcHJpbnRfZGF0ZVwiOlwiMjAyMi0xMC0xMFwiLFwiZWxlY3RyaWNpYW5fZW5mb3JjZW1lbnRfYWN0aW9uXCI6XCJoaSBlYVwifSJ9XSwiaXNzdWVyRmllbGRzIjpbXX0sImRpZCI6ImRpZDpldGhyOnZvbHRhOjB4NTA4NTFCYzgwRDYxMzUxQjA1MDMzODdGYWY3ZTkyMmQzODFlNkRDNSIsInNpZ25lciI6ImRpZDpldGhyOnZvbHRhOjB4MjI0Q2JBNGFlOEQyN0JhNjk3OTNDRmVGZTA0MjY4MkI4MWVBNzdjNSIsImNyZWRlbnRpYWxTdGF0dXMiOnsiaWQiOiJodHRwczovL2lkZW50aXR5Y2FjaGUtZGV2LmVuZXJneXdlYi5vcmcvdjEvc3RhdHVzLWxpc3QvdXJuOnV1aWQ6ODI1OWJlZjgtZGIyNy00M2Q2LThhMjEtMjUzNzRhN2ZhZTY5IiwidHlwZSI6IlN0YXR1c0xpc3QyMDIxRW50cnkiLCJzdGF0dXNQdXJwb3NlIjoicmV2b2NhdGlvbiIsInN0YXR1c0xpc3RJbmRleCI6IjAiLCJzdGF0dXNMaXN0Q3JlZGVudGlhbCI6Imh0dHBzOi8vaWRlbnRpdHljYWNoZS1kZXYuZW5lcmd5d2ViLm9yZy92MS9zdGF0dXMtbGlzdC91cm46dXVpZDo4MjU5YmVmOC1kYjI3LTQzZDYtOGEyMS0yNTM3NGE3ZmFlNjkifSwiZXhwIjo5MDA3MTk5MjU0NzQwOTkwLCJpc3MiOiJkaWQ6ZXRocjp2b2x0YToweDIyNENiQTRhZThEMjdCYTY5NzkzQ0ZlRmUwNDI2ODJCODFlQTc3YzUiLCJzdWIiOiJkaWQ6ZXRocjp2b2x0YToweDUwODUxQmM4MEQ2MTM1MUIwNTAzMzg3RmFmN2U5MjJkMzgxZTZEQzUifQ.MHg1ZjRlZGEyZWIwOWFlNGFlOWJmNDhlZWI2N2Y5OWNiMjNhMzc4YjNlZTJkMWM5YzYyNjVlMTExYzJlOTI2ZjU5NzI1YWU5NmE1OTNjMjRjOGNiNDgxOTMzNmMwNzExZWRlMWFjMzA1ZGJmOWM0MmEwN2Q5MmE0YjMzMWJhYTdhYTFj'
    const parsedFields = decodeAndParseJWT(mockToken)

    deepEqual(parsedFields, {
      installer_business_name: 'Encryption Business Name',
      installer_business_address: '1234 Fake St',
      installer_business_website: 'example.com',
      installer_owner_name: 'John Smith',
      prefix: '1',
      installer_contact_phone_number: '123-232-1213',
      installer_contact_email: 'example@example.com',
      electrician_class_type: '11',
      electrician_license_number: '1234',
      electrician_application_number: '10301',
      electrician_status: 'issued',
      electrician_expiration_date: '2022-09-27',
      electrician_effective_date: '2022-09-27',
      electrician_origination_date: '2022-09-27',
      electrician_print_date: '2022-09-27',
      electrician_enforcement_action_radio: 'yes',
      business_relationship_electrician_name: 'Test Name',
      business_relationship_class_type: 'Master Electrician',
      business_relationship_license_number: 'sa',
      business_relationship_application_number: '2838292',
      business_relationship_status: 'issued',
      business_relationship_expiration_date: '2022-10-03',
      business_relationship_effective_date: '2022-09-26',
      business_relationship_origination_date: '2022-10-03',
      business_relationship_print_date: '2022-10-10',
      electrician_enforcement_action: 'hi ea'
    })

  })

  it("#formatDateString", () => {
    const tests = [
      { mock: "2022-10-1", expected: "10/01/2022" },
      { mock: "2022-10-3", expected: "10/03/2022" },
      { mock: "2022-10-5", expected: "10/05/2022" },
      { mock: "2022-10-10", expected: "10/10/2022" },
      { mock: "2022-10-11", expected: "10/11/2022" },
      { mock: "2022-10-12", expected: "10/12/2022" },
      { mock: "2022-10-31", expected: "10/31/2022" },
    ]
    tests.forEach(date => {
      equal(formatDateString(date.mock), date.expected)
    })
  })

  it("#transformDataToEmissionsAvoided", () => {
    const dates = [
      "2022-08-26T04",
      "2022-08-26T03",
      "2022-08-26T02",
      "2022-08-26T01",
      "2022-08-26T00",
      "2022-08-25T23",
      "2022-08-25T22",
      "2022-08-25T21",
      "2022-08-25T20",
      "2022-08-25T19",
      "2022-08-25T18",
      "2022-08-25T17",
      "2022-08-25T16",
      "2022-08-25T15",
      "2022-08-25T14",
      "2022-08-25T13",
      "2022-08-25T12",
      "2022-08-25T11",
      "2022-08-25T10",
      "2022-08-25T09",
      "2022-08-25T08",
      "2022-08-25T07",
      "2022-08-25T06",
      "2022-08-25T05",
    ]

    const hourlyAverage = dates.map(date => {
      const hourlyData = mockWattTimeData.filter(obj => obj.point_time.includes(date))
      let total = 0;
      hourlyData.forEach(data => total += data.value)
      return { date: date, average: total / hourlyData.length }
    })

    const expectedEnergy = mockInverter.energy.values.map(energy => {
      let date = DateTime.fromFormat(energy.date, "yyyy-MM-dd hh:mm:ss").setZone("America/Chicago", { keepLocalTime: true }).toUTC().toISO()
      const averageObj = hourlyAverage.find(obj => obj.date === date.slice(0, 13))
      const wh = (energy.value === null) ? 0 : energy.value
      const emissionsAvoided = averageObj.average / 1000 / 1000 * wh

      return {
        timestamp: date,
        energy: energy.value,
        emissionsAvoided: emissionsAvoided
      }

    })

    const expected = {
      timeUnit: mockInverter.energy.timeUnit,
      unit: mockInverter.energy.unit,
      measuredBy: mockInverter.energy.measuredBy,
      values: expectedEnergy
    }
    deepEqual(transformDataToEmissionsAvoided(mockInverter, mockWattTimeData, "America/Chicago"), expected)
  })
});