import {parse, resolve} from 'w3name'

/**
 * Returns the data mapped to the W3Name Address
 * @param {string} nameAddress W3Name Address to parse the data
 * @returns 
 */
const getIPNSIndexFile = async (ipnsAddress) => {
  const name = parse(ipnsAddress)
  return await resolve(name)
}

const getIPFSUrl = (cid, filename) => {
  return `https://${cid}.ipfs.w3s.link/${filename}`
}

export {
  getIPNSIndexFile,
  getIPFSUrl
}