import CryptoJS from 'crypto-js'

/**
 * Encrypt using AES Encryption (Type is dependent on key size)
 * Contains why we can do just encrypt().toString() safely
 * even though the key is contained in the `CipherParams` object
 * https://www.davidebarranca.com/2012/10/crypto-js-tutorial-cryptography-for-dummies/
 * @param {string} keyInHex Private Key (Hex format)
 * @param {string} message Message to be encrypted
 */
const encrypt = (keyInHex, message) => {
  const key = CryptoJS.enc.Hex.parse(keyInHex)
  const iv = CryptoJS.lib.WordArray.random(32)
  const cipherText = CryptoJS.AES.encrypt(message, key, {iv: iv}).toString()
  return {cipherText, iv: iv.toString()}
}

/**
 * Decrypts an AES Message
 * @param {string} keyInHex Private Key (Hex format))
 * @param {string} cipherText Encrypted Message
 * @param {string} iv Initial Value used for encryption
 */
const decrypt = (keyInHex, cipherText, iv) => {
  const ivWordArray = CryptoJS.enc.Hex.parse(iv)
  const key = CryptoJS.enc.Hex.parse(keyInHex)
  return CryptoJS.AES.decrypt(cipherText, key, {iv: ivWordArray}).toString(CryptoJS.enc.Utf8)
}

export {
  encrypt,
  decrypt
}