import * as Name from 'w3name' 
import bs58 from 'bs58'

/**
 * Maps a CID to a W3Name so that its contents are mutable. Make sure the CID is not wrapped in a directory
 * @param {string} cid CID of the updated File to be mapped to W3Name.
 * @param {string} privKey Private Key of the W3Name
 */
 const updateIPNSPointer = async (cid, privKey) => {
  const nextValue = `/ipfs/${cid}`
  const name = await Name.from(bs58.decode(privKey))
  const revision = await Name.resolve(name)
  const nextRevision = await Name.increment(revision, nextValue)
  await Name.publish(nextRevision, name.key)
}

export default updateIPNSPointer