import { createPublicClaim, resolveDID } from "../utils/vcs/index.js"
import didIpfsStorePkg from '@ew-did-registry/did-ipfs-store';
import getInfuraIPFSConfig from '../utils/vcs/infura_config.js';
import { getSubjectObjects } from '../utils/vcs/users.js';
import jwtPkg from '@ew-did-registry/jwt'
import assert from 'assert'

const { JWT } = jwtPkg
const { DidStore } = didIpfsStorePkg

describe('Verifiable Credentials', () => {

  it('#createPublicClaim', async () => {
    const subjectPrivKey = process.env.VC_TEST_ACCOUNT_PRIVATE_KEY
    // Initialize the DID Store
    const store = new DidStore(getInfuraIPFSConfig())

    // Get the subject and issuer
    const subject = getSubjectObjects(subjectPrivKey, store, "volta")
    const mockData = { name: "Hello!" }
    const token = await createPublicClaim(subject, mockData)

    try {
      const jwt = new JWT(subject.keys);
      const decoded = await jwt.verify(token, subject.keys.publicKey);
      assert.equal(decoded.did, subject.did)
      assert.equal(decoded.signer, subject.did)
      assert.equal(decoded.iss, subject.did)
      assert.equal(decoded.sub, subject.did)
      assert.deepEqual(decoded.claimData, mockData)
    } catch (e) {
      console.log(e)
      assert(false)
    }
  })

  it('#readDIDDocument', async () => {
    const subjectPrivKey = process.env.VC_TEST_ACCOUNT_PRIVATE_KEY

    return resolveDID(subjectPrivKey, "volta")
      .then((doc) => {
        assert.notEqual(doc, undefined)
      })
  })


})