import assert from 'assert'
import { combineCSVs, formatWhGenerationToMrets } from '../utils/mrets.js'
import { mockSampleWhGeneration } from '../mocks/mrets_mock_generation.js'
import { formatDateString, getDaysInMonth } from '../utils/utils.js'
import fs from 'fs'

describe('utility function', () => {
  it('#formatWhGenerationToMrets - defined reporting id', () => {

    const mockMretsId = "M1111".slice(1)
    const mockReportingUnitId = "292832"
    const monthObj = getDaysInMonth(8, 2022)

    const actual = formatWhGenerationToMrets(mockSampleWhGeneration, mockMretsId, mockReportingUnitId, monthObj).replaceAll("\r\n", "\n").split("\n")
    const expected = fs.readFileSync("./examples/mock_wh_generation_mrets_test_case.csv", "utf-8").replaceAll("\r\n", "\n").split("\n")

    actual.forEach((row, index) => {
      assert.equal(row, expected[index])
    })
  })

  it('#formatWhGenerationToMrets - undefined reporting id', () => {

    const mockMretsId = "M1111".slice(1)
    const monthObj = getDaysInMonth(8, 2022)

    const actual = formatWhGenerationToMrets(mockSampleWhGeneration, mockMretsId, undefined, monthObj).replaceAll("\r\n", "\n").split("\n")
    const expected = fs.readFileSync("./examples/mock_wh_generation_mrets_test_case_undefined.csv", "utf-8").replaceAll("\r\n", "\n").split("\n")

    actual.forEach((row, index) => {
      assert.equal(row, expected[index])
    })
  })

  it('#combineCSVs', () => {
    const mockDataArray = [
      {
        mretsId: "M1111",
        reportingUnitId: "239293",
        system: {
          gc: {
            generation_data: mockSampleWhGeneration
          }
        }
      },
      {
        mretsId: "M2222",
        reportingUnitId: "122123",
        system: {
          gc: {
            generation_data: mockSampleWhGeneration
          }
        }
      },
      {
        mretsId: "M3939",
        reportingUnitId: "110201",
        system: {
          gc: {
            generation_data: mockSampleWhGeneration
          }
        }
      }
    ]

    const monthObj = getDaysInMonth(8, 2022)
    const combined = combineCSVs(mockDataArray, monthObj).replaceAll("\r\n", "\n").split("\n")
    const expected = fs.readFileSync("./examples/mock_wh_generation_mrets_test_case_combined.csv", "utf-8").replaceAll("\r\n", "\n").split("\n")

    combined.forEach((row, index) => {
      assert.equal(row, expected[index])
    })
  })
});