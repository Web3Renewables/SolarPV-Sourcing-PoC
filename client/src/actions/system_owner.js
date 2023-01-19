import { metamaskDecrypt } from '@libs/metamask'
import { didPrefix } from '@config/environment'
import { PrivateDataRequestTypes } from '@libs/firebase'

const decryptSystemOwner = async (ethereum, appId, did) => {
  try {
    const systemOwnerResponse = await fetch("/api/database/getPrivateData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        appId,
        type: PrivateDataRequestTypes.SystemOwner
      })
    })
    if(!systemOwnerResponse.ok) return null
    const encryptedData = await systemOwnerResponse.json()
    if(encryptedData === null) return null

    return await metamaskDecrypt(ethereum.request, did.replace(didPrefix, ""), encryptedData)
  } catch (e) {
    return
  }
}

export {
  decryptSystemOwner,
}