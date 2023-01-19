const admin = require('firebase-admin');
import { withSession } from "@auth/utils";
import { encrypt } from "@libs/cryptojs/encrypt";
import { updateCompanyEIN } from "@libs/firebase";

const app = !admin.apps.length ? admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_WORKER)),
  databaseURL: process.env.FIREBASE_DATABASE_URL
}) : admin.app();
let db = admin.database(app)

async function handler(req, res) {
  const user = req.session?.user;
  const body = req.body

  if (!user || user.isLogggedIn === false || user.did === undefined) {
    res.status(401).end();
    return
  }

  if (req.method == 'POST') {
    if (body === undefined || body === null) {
      res.status(400).json({ "error": "Please specify a company EIN and user encrypted data." });
      return
    }

    try {
      const { localEncrypted, companyEIN, csrfToken } = body
      if(user.csrfToken === undefined || user.csrfToken === null || csrfToken !== user.csrfToken) {
        return res.status(401).json({"error": "Csrf tokens do not match"})
      }

      const { cipherText, iv } = encrypt(process.env.DECRYPTION_KEY, companyEIN)

      const structured = { user: localEncrypted, server: { cipherText, iv } }

      await updateCompanyEIN(db, user.address, structured)

      res.status(200).end();
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  } else {
    res.status(405).json({ error: "Invalid request method" });
  }

}

export default withSession(handler)