import { File } from 'web3.storage'

const uploadIndexFile = async (web3Storage, data, fileName) => {
  const buffer = Buffer.from(JSON.stringify(data))
  const file = new File([buffer], `${fileName}`)

  return await web3Storage.put([file])
}

export {
  uploadIndexFile
}