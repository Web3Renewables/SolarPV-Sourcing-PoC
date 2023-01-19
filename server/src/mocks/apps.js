import { mockPvSystemDid, mockMretsClaimData, mockJwtToken } from "./pv-system.js"

const mockAppsPVSystemRoles = [
  {
    app: {
      id: 439,
      name: 'secondproject',
      owner: '0x224CbA4ae8D27Ba69793CFeFe042682B81eA77c5',
      namespace: 'secondproject.apps.renewablesv6.globalrenewables.iam.ewc',
      namehash: '0xa7f5225fa071aad224e45de7fb6e65d163bc945a45f2aa3905eee98185d3fdbb',
      definition: {}
    },
    pvSystemCreds: {
      did: 'did:ethr:volta:0x0795Ddb3CA6Ca7367B5761cffEda74E62D8983c0',
      credential: {
        payload: {
          claimData: {
            claimType: 'project-pv-system.roles.secondproject.apps.renewablesv6.globalrenewables.iam.ewc',
            claimTypeVersion: 1,
            requestorFields: [{'key': 'data', value: JSON.stringify(mockPvSystemDid)}]
          },
          did: 'did:ethr:volta:0x0795Ddb3CA6Ca7367B5761cffEda74E62D8983c0',
          signer: 'did:ethr:volta:0x224CbA4ae8D27Ba69793CFeFe042682B81eA77c5',
          credentialStatus: {
            id: 'https://identitycache-dev.energyweb.org/v1/status-list/urn:uuid:2e8383e7-d93d-447c-bf5e-023ca5e8e29b',
            type: 'StatusList2021Entry',
            statusPurpose: 'revocation',
            statusListIndex: '0',
            statusListCredential: 'https://identitycache-dev.energyweb.org/v1/status-list/urn:uuid:2e8383e7-d93d-447c-bf5e-023ca5e8e29b'
          },
          iss: 'did:ethr:volta:0x224CbA4ae8D27Ba69793CFeFe042682B81eA77c5',
          sub: 'did:ethr:volta:0x0795Ddb3CA6Ca7367B5761cffEda74E62D8983c0'
        },
        eip191Jwt: mockJwtToken
      }
    },
    encryptedServer:  {
      "cipherText": "oRqxGiyRThbhKgAE6Z4W4mxVo6qYjH2yEFOAIRhGrpEWr5tEPXdrxdWA9xL4xshtG+H/LG5Oo06/s4PLObNXTsV3fTRjeuQt8D/E7WRz8si7MLCOXLrXY5ubjteJy4Bpme6K4C8FQiUki1IA4UHDK4BBIY4DA9sK24aPAgYqgsUDCd6NvF3chnDpLBjo3H+NXx6q2FAYsVLjTczp1XrHpMZroCe4Z0vC6Fy0VyHAOPOUzpGzXTcq/BFeJrYnRmAfPTiSIDEKhZDcCnPJvcyAvQ==",
      "iv": "fabcd65b626d1190a47608024de0915b559a6d9fc311439b611dabec5d790f80"
    },
    electriciansDids: ["did:ethr:volta:0x5453Ebdc4bEb1f6d1559A72F214113D4bfCA6B41"],
    installerDid: "0x574ca27dC260387dbd606280890d3A612E039346"
  },
  {
    app: {
      id: 439,
      name: 'thirdproject',
      owner: '0x224CbA4ae8D27Ba69793CFeFe042682B81eA77c5',
      namespace: 'thirdproject.apps.renewablesv6.globalrenewables.iam.ewc',
      namehash: '0xa7f5225fa071aad224e45de7fb6e65d163bc945a45f2aa3905eee98185d3fdbb',
      definition: {}
    },
    pvSystemCreds: {
      did: 'did:ethr:volta:0x1234Ddb3CA6Ca7367B5761cffEda74E62D8983c0',
      credential: {
        payload: {
          claimData: {
            claimType: 'project-pv-system.roles.thirdproject.apps.renewablesv6.globalrenewables.iam.ewc',
            claimTypeVersion: 1,
            requestorFields: [{'key': 'data', value: JSON.stringify(mockPvSystemDid)}]
          },
          did: 'did:ethr:volta:0x1234Ddb3CA6Ca7367B5761cffEda74E62D8983c0',
          signer: 'did:ethr:volta:0x224CbA4ae8D27Ba69793CFeFe042682B81eA77c5',
          credentialStatus: {
            id: 'https://identitycache-dev.energyweb.org/v1/status-list/urn:uuid:2e8383e7-d93d-447c-bf5e-023ca5e8e29b',
            type: 'StatusList2021Entry',
            statusPurpose: 'revocation',
            statusListIndex: '0',
            statusListCredential: 'https://identitycache-dev.energyweb.org/v1/status-list/urn:uuid:2e8383e7-d93d-447c-bf5e-023ca5e8e29b'
          },
          iss: 'did:ethr:volta:0x224CbA4ae8D27Ba69793CFeFe042682B81eA77c5',
          sub: 'did:ethr:volta:0x0795Ddb3CA6Ca7367B5761cffEda74E62D8983c0'
        },
        eip191Jwt: mockJwtToken
      }
    },
    encryptedServer:  {
      "cipherText": "oRqxGiyRThbhKgAE6Z4W4mxVo6qYjH2yEFOAIRhGrpEWr5tEPXdrxdWA9xL4xshtG+H/LG5Oo06/s4PLObNXTsV3fTRjeuQt8D/E7WRz8si7MLCOXLrXY5ubjteJy4Bpme6K4C8FQiUki1IA4UHDK4BBIY4DA9sK24aPAgYqgsUDCd6NvF3chnDpLBjo3H+NXx6q2FAYsVLjTczp1XrHpMZroCe4Z0vC6Fy0VyHAOPOUzpGzXTcq/BFeJrYnRmAfPTiSIDEKhZDcCnPJvcyAvQ==",
      "iv": "fabcd65b626d1190a47608024de0915b559a6d9fc311439b611dabec5d790f80"
    },
    electriciansDids: ["did:ethr:volta:0x5453Ebdc4bEb1f6d1559A72F214113D4bfCA6B41"],
    installerDid: "0x574ca27dC260387dbd606280890d3A612E039346"
  }
]

const mockAppsMretsRoles = [
  {
    app: {
      id: 439,
      name: 'secondproject',
      owner: '0x224CbA4ae8D27Ba69793CFeFe042682B81eA77c5',
      namespace: 'secondproject.apps.renewablesv6.globalrenewables.iam.ewc',
      namehash: '0xa7f5225fa071aad224e45de7fb6e65d163bc945a45f2aa3905eee98185d3fdbb',
      definition: {}
    },
    pvSystemCreds: {
      did: 'did:ethr:volta:0x0795Ddb3CA6Ca7367B5761cffEda74E62D8983c0',
      credential: {
        payload: {
          claimData: {
            claimType: 'project-pv-system.roles.secondproject.apps.renewablesv6.globalrenewables.iam.ewc',
            claimTypeVersion: 1,
            requestorFields: [JSON.stringify({ data: mockPvSystemDid })]
          },
          did: 'did:ethr:volta:0x0795Ddb3CA6Ca7367B5761cffEda74E62D8983c0',
          signer: 'did:ethr:volta:0x224CbA4ae8D27Ba69793CFeFe042682B81eA77c5',
          credentialStatus: {
            id: 'https://identitycache-dev.energyweb.org/v1/status-list/urn:uuid:2e8383e7-d93d-447c-bf5e-023ca5e8e29b',
            type: 'StatusList2021Entry',
            statusPurpose: 'revocation',
            statusListIndex: '0',
            statusListCredential: 'https://identitycache-dev.energyweb.org/v1/status-list/urn:uuid:2e8383e7-d93d-447c-bf5e-023ca5e8e29b'
          },
          iss: 'did:ethr:volta:0x224CbA4ae8D27Ba69793CFeFe042682B81eA77c5',
          sub: 'did:ethr:volta:0x0795Ddb3CA6Ca7367B5761cffEda74E62D8983c0'
        },
        eip191Jwt: mockJwtToken
      }
    },
    encryptedServer:  {
      "cipherText": "oRqxGiyRThbhKgAE6Z4W4mxVo6qYjH2yEFOAIRhGrpEWr5tEPXdrxdWA9xL4xshtG+H/LG5Oo06/s4PLObNXTsV3fTRjeuQt8D/E7WRz8si7MLCOXLrXY5ubjteJy4Bpme6K4C8FQiUki1IA4UHDK4BBIY4DA9sK24aPAgYqgsUDCd6NvF3chnDpLBjo3H+NXx6q2FAYsVLjTczp1XrHpMZroCe4Z0vC6Fy0VyHAOPOUzpGzXTcq/BFeJrYnRmAfPTiSIDEKhZDcCnPJvcyAvQ==",
      "iv": "fabcd65b626d1190a47608024de0915b559a6d9fc311439b611dabec5d790f80"
    },
    electriciansDids: ["did:ethr:volta:0x5453Ebdc4bEb1f6d1559A72F214113D4bfCA6B41"],
    installerDid: "0x574ca27dC260387dbd606280890d3A612E039346"
  },
  {
    app: {
      id: 439,
      name: 'thirdproject',
      owner: '0x224CbA4ae8D27Ba69793CFeFe042682B81eA77c5',
      namespace: 'thirdproject.apps.renewablesv6.globalrenewables.iam.ewc',
      namehash: '0xa7f5225fa071aad224e45de7fb6e65d163bc945a45f2aa3905eee98185d3fdbb',
      definition: {}
    },
    pvSystemCreds: {
      did: 'did:ethr:volta:0x1234Ddb3CA6Ca7367B5761cffEda74E62D8983c0',
      credential: {
        payload: {
          claimData: {
            claimType: 'project-pv-system.roles.thirdproject.apps.renewablesv6.globalrenewables.iam.ewc',
            claimTypeVersion: 1,
            requestorFields: [JSON.stringify({ data: mockPvSystemDid })]
          },
          did: 'did:ethr:volta:0x1234Ddb3CA6Ca7367B5761cffEda74E62D8983c0',
          signer: 'did:ethr:volta:0x224CbA4ae8D27Ba69793CFeFe042682B81eA77c5',
          credentialStatus: {
            id: 'https://identitycache-dev.energyweb.org/v1/status-list/urn:uuid:2e8383e7-d93d-447c-bf5e-023ca5e8e29b',
            type: 'StatusList2021Entry',
            statusPurpose: 'revocation',
            statusListIndex: '0',
            statusListCredential: 'https://identitycache-dev.energyweb.org/v1/status-list/urn:uuid:2e8383e7-d93d-447c-bf5e-023ca5e8e29b'
          },
          iss: 'did:ethr:volta:0x224CbA4ae8D27Ba69793CFeFe042682B81eA77c5',
          sub: 'did:ethr:volta:0x0795Ddb3CA6Ca7367B5761cffEda74E62D8983c0'
        },
        eip191Jwt: mockJwtToken
      }
    },
    encryptedServer:  {
      "cipherText": "oRqxGiyRThbhKgAE6Z4W4mxVo6qYjH2yEFOAIRhGrpEWr5tEPXdrxdWA9xL4xshtG+H/LG5Oo06/s4PLObNXTsV3fTRjeuQt8D/E7WRz8si7MLCOXLrXY5ubjteJy4Bpme6K4C8FQiUki1IA4UHDK4BBIY4DA9sK24aPAgYqgsUDCd6NvF3chnDpLBjo3H+NXx6q2FAYsVLjTczp1XrHpMZroCe4Z0vC6Fy0VyHAOPOUzpGzXTcq/BFeJrYnRmAfPTiSIDEKhZDcCnPJvcyAvQ==",
      "iv": "fabcd65b626d1190a47608024de0915b559a6d9fc311439b611dabec5d790f80"
    },
    electriciansDids: ["did:ethr:volta:0x5453Ebdc4bEb1f6d1559A72F214113D4bfCA6B41"],
    installerDid: "0x574ca27dC260387dbd606280890d3A612E039346"
  }
]

export {
  mockAppsPVSystemRoles
}