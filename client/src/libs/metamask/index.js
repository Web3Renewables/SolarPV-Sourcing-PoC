import { encryptSafely } from "@metamask/eth-sig-util";
import { bufferToHex } from 'ethereumjs-util'

/**
 * Encrypts data for the provided public key
 * @param {keyB64} keyB64 Base64 Encoded Public Key
 * @param {string} data Data to encrypt
 * @returns 
 */
const metamaskEncrypt = async (data, keyB64) => {
  try {
    return encryptSafely({
      publicKey: keyB64,
      data: Buffer.from(data).toString('base64'),
      version: 'x25519-xsalsa20-poly1305',
    });
  } catch (e) {
    console.log(e)
    return undefined
  }
}

/**
 * Decrypts the data
 * @param {EthereumProvider.request} request Ethereum Provider Request function
 * @param {string} account Account that can decrypt the data
 * @param {EthEncryptedData} data Data to encrypt
 * @returns 
 */
const metamaskDecrypt = async (request, account, data) => {
  try {
    const encryptedMessage = bufferToHex(
      Buffer.from(
        JSON.stringify(
          data
        ),
        'utf8'
      )
    );

    const message = await request({
      method: 'eth_decrypt',
      params: [encryptedMessage, account],
    })
    return JSON.parse(Buffer.from(JSON.parse(message).data, 'base64').toString('utf-8'))
  } catch (e) {
    console.log(e)
    return undefined
  }
}

export {
  metamaskEncrypt, metamaskDecrypt
}