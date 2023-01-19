const admin = require('firebase-admin');
import { v4 as uuidv4 } from 'uuid';
import { readUserData, writeUserData } from '@libs/firebase';

const app = !admin.apps.length ? admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_WORKER)),
  databaseURL: process.env.FIREBASE_DATABASE_URL
}) : admin.app();
let db = admin.database(app)

export default async function handler(req, res) {
  const { method, body } = req;
  switch (method) {
    case "POST":
      try {
        const { address } = body;

        if (!address) {
          return res
            .status(400)
            .json({ message: "Error: Please specify an address to get the nonce" });
        }

        let nonce = await readUserData(db, address)
        
        //Create a new nonce if one has never been created
        if (nonce === null) {
          const uuid = uuidv4()
          nonce = {nonce: uuid}
          await writeUserData(db, address, uuid)
        }

        return res
          .status(200)
          .json(nonce)

      } catch (_e) {
        return res
          .status(500)
          .json({ message: "Invalid request." })
      }

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};