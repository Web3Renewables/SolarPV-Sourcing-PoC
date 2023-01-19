import { RegistrationTypes } from "iam-client-lib"

const enrollToRole = async (iamClient, did, data, role, issuerRole) => {
    // - Apply for any role
    //     - (Eventually) Save parts of input to ceramic
    //     - Call IAM-Client-Lib method to request enrollent as the specified role in organizaion
    try {
        await iamClient.claimsService.createClaimRequest({ 
            //issuer: await getListOfIssuersByRoleName(iamClient, issuerRole),
            claim: {
                claimType: role,
                claimTypeVersion: 1,
                requestorFields: [{ key: "data", value: JSON.stringify(data) }],
            },
            subject: did,
            registrationTypes: [RegistrationTypes.OffChain, RegistrationTypes.OnChain]
        })
        return ({ success: true, message: `Request to become a verified ${role} sent!` })
    } catch (err) {
        return ({ success: false, message: err.message + "." })
    }
}

const getListOfIssuersByRoleName = async (iamClient, issuerRole) => {
    return await iamClient.domainsService.getDIDsByRole(issuerRole)
}

export {
    enrollToRole,
}