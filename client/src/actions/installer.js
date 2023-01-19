import { ADMIN_ROLE_NAMESPACE, ORG_INSTALLER_ROLE_NAMESPACE } from "@config/switchboard"
import { metamaskDecrypt, metamaskEncrypt } from "@libs/metamask"
import { enrollToRole } from "@actions/utils"
import { getAppRoleDefinitions } from '@libs/iam_client_lib/utils/app_role_utils'
import getProjectFromId from "./projects/get_project_from_id"
import registerAssetToEWC from "./projects/register_asset_ewc"
import { RegistrationTypes } from "iam-client-lib"
import { didPrefix } from "@config/environment"

const registerInstallerToOrg = async (iamClient, did, publicData, privateData, csrfToken) => {
  // - Apply for the installer role
  //     - (Eventually) Save parts of input to ceramic
  //     - Call IAM-Client-Lib method to request enrollent as an electrician in organizaion
  const keyB64 = await window.ethereum.request({
    method: 'eth_getEncryptionPublicKey',
    params: [(did.replace(didPrefix, ""))],
  })

  const localEncrypted = await metamaskEncrypt(JSON.stringify(privateData), keyB64)

  const companyEINResponse = await fetch("/api/database/saveEIN", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      localEncrypted,
      companyEIN: privateData["installer_company_ein"],
      csrfToken: csrfToken
    })
  })
  if(!companyEINResponse.ok) {
    return ({ success: false, message: "Could not save the company EIN." })
  }
  return enrollToRole(iamClient, did, publicData, ORG_INSTALLER_ROLE_NAMESPACE, ADMIN_ROLE_NAMESPACE)
}

const executePVSystemRegistration = async (iamClient, onChainData, offChainData, appId, keyB64, csrfToken) => {
  const project = await getProjectFromId(appId, iamClient)
  const { APP_PV_SYSTEM_ROLE_NAMESPACE } = getAppRoleDefinitions(project.name)

  // Cannot do Diffie-hellman key exchange with MetaMask as their are currently no APIs
  // or way to get the user's private key, therefore, cannot create a shared secret.
  // To overcome this, data will be encrypted by the user through Metamask and by Web3 Re Owner Serverside,
  // both encrypted data will be saved. Therefore, Owner can decrypt their data and user can decrypt using MetaMask

  // Encrypt pvSystemDataOffChain For User to Decrypt
  const localEncrypted = await metamaskEncrypt(JSON.stringify(offChainData), keyB64)
  if (!localEncrypted) { throw new Error("Could not encrypt the PV system's data!") }

  //Register Asset to EWC
  const assetAddr = await registerAssetToEWC(iamClient)
  const assetId = `${didPrefix}${assetAddr}`

  const privatePVSystemResponse = await fetch("/api/database/savePrivatePVSystem", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      localEncrypted,
      privateData: offChainData,
      assetId,
      appId,
      csrfToken
    })
  })
  if(!privatePVSystemResponse.ok) {
    throw new Error("Could not save private PV System information.")
  }

  const issuePVSystemResponse = await enrollToRole(
    iamClient,
    assetId,
    onChainData,
    APP_PV_SYSTEM_ROLE_NAMESPACE,
    ADMIN_ROLE_NAMESPACE
  )
  if (!issuePVSystemResponse.success) { throw new Error(`Could not issue PV System role to asset \"${assetId}\"`) }
}

const executeSystemOwnerRegistration = async (iamClient, systemOwnerData, appId, keyB64, csrfToken) => {
  const project = await getProjectFromId(appId, iamClient)
  const { APP_SYSTEM_OWNER_NAMESPACE } = getAppRoleDefinitions(project.name)

  // Cannot do Diffie-hellman key exchange with MetaMask as their are currently no APIs
  // or way to get the user's private key, therefore, cannot create a shared secret.
  // To overcome this, data will be encrypted by the user through Metamask and by Web3 Re Owner Serverside,
  // both encrypted data will be saved. Therefore, Owner can decrypt their data and user can decrypt using MetaMask

  // Encrypt System Owner Information for User to decrypt
  const localEncryptedSystemOwner = await metamaskEncrypt(JSON.stringify(systemOwnerData), keyB64)
  if (!localEncryptedSystemOwner) { throw new Error("Could not encrypt the system owner's data!") }

  // Create the System Owner Asset Address
  const systemOwnerAssertAddress = await registerAssetToEWC(iamClient)
  const systemOwnerDID = `${didPrefix}${systemOwnerAssertAddress}`

  const privatePVSystemResponse = await fetch("/api/database/saveSystemOwner", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      localEncrypted: localEncryptedSystemOwner,
      privateData: systemOwnerData,
      systemOwnerDID,
      appId,
      csrfToken
    })
  })
  if(!privatePVSystemResponse.ok) {
    throw new Error("Could not save private PV System information.")
  }

  // Issue Claim Directly to System Owner ()
  const issueSystemOwnerResponse = await enrollToRole(
    iamClient,
    systemOwnerDID,
    {}, // No data currently being used on request since moving to firebase
    APP_SYSTEM_OWNER_NAMESPACE,
    ADMIN_ROLE_NAMESPACE
  )
  if (!issueSystemOwnerResponse.success) { throw new Error(`Could not issue System Owner role to did \"${systemOwnerAssetDID}\"`) }

}


const assignElectricianToProject = async (iamClient, subject, appName) => {
  // - Assign an electrician to a PV System (Project)

  try {
    const { APP_ELECTRICIAN_ROLE_NAMESPACE } = getAppRoleDefinitions(appName)

    const token = await iamClient.claimsService.issueClaim({
      claim: {
        claimType: APP_ELECTRICIAN_ROLE_NAMESPACE,
        claimTypeVersion: 1,
        issuerFields: [],
      },
      subject: subject,
      registrationTypes: [RegistrationTypes.OnChain, RegistrationTypes.OffChain]
    });

    return { success: true, data: token }
  } catch (e) {
    console.log(e)
    return { success: false, data: e.message }
  }

}

export { registerInstallerToOrg, executePVSystemRegistration, executeSystemOwnerRegistration, assignElectricianToProject }
