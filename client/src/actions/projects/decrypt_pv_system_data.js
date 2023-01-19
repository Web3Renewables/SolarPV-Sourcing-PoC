import { metamaskDecrypt } from '@libs/metamask'
import { didPrefix } from '@config/environment'
import { PrivateDataRequestTypes } from '@libs/firebase'

const decryptPVSystemData = async (ethereum, appId, did) => {
  try {
    const pvSystemResponse = await fetch("/api/database/getPrivateData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        appId,
        type: PrivateDataRequestTypes.PVSystem
      })
    })
    if(!pvSystemResponse.ok) return null
    const encryptedData = await pvSystemResponse.json()
    if(encryptedData === null) return null

    return await metamaskDecrypt(ethereum.request, did.replace(didPrefix, ""), encryptedData)
  } catch (e) {
    return
  }
}

export {
  decryptPVSystemData
}