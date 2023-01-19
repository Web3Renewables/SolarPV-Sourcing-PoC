import { parseRequestorFields } from "@utils/iam-client-lib/parse_requestor_fields"

describe('#parseRequestorFields', () => {

  it('parse requestor fields', () => {
    const mockRequestorData = {
      claim_name: "Name",
      date: "2022-09-20",
      prefix: 1,
      commissioning_date: "2022-08-30",
    }

    const mockPvSystemClaim = {
      claimType: "test_role",
      claimTypeVersion: 1,
      issuerFields: [],
      requestorFields: [
        {key: 'data', value: JSON.stringify(mockRequestorData)}
      ]
    }
    const parsed = parseRequestorFields(mockPvSystemClaim, 'data')

    expect(parsed).toStrictEqual(mockRequestorData)
  })

  it('parse undefined requestor fields', () => {
    const mockPvSystemClaim = {
      claimType: "test_role",
      claimTypeVersion: 1,
      issuerFields: [],
      requestorFields: [
        {key: 'data', value: undefined}
      ]
    }
    const parsed = parseRequestorFields(mockPvSystemClaim, 'data')
    expect(parsed).toStrictEqual(undefined)

    const empty = parseRequestorFields(undefined, 'data')
    expect(empty).toStrictEqual(undefined)
  })

})