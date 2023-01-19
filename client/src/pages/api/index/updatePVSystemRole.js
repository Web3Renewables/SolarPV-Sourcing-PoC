import { withSession } from "@auth/utils";
import { ADMIN_ROLE_NAMESPACE } from "@config/switchboard";
import { getIndexJsonBody } from "@actions/projects/get_pv_system_daily_gcs";
import { indexFileName, IPNSAddress, web3NamePrivateKey } from "@config/environment";
import { uploadIndexFile } from "@libs/web3storage";
import { Web3Storage } from "web3.storage";
import { updateIPNSPointer } from "@libs/w3name";

async function handler(req, res) {
  const user = req.session?.user;
  const body = req.body

  if (!user || user.isLogggedIn === false || user.roles === undefined) {
    res.status(401).end();
    return
  }

  const isAdmin = user.roles.includes(ADMIN_ROLE_NAMESPACE)
  if (!(isAdmin)) {
    res.status(401).json({"error": "You are not authorized to make this request"});
    return
  }

  if (req.method == 'POST') {
    try {
      
      if (body === undefined || body === null) {
        res.status(400).json({ "error": "Please specify a body for this request"});
        return
      }

      const {did, setStatus, csrfToken} = JSON.parse(body)
      if(user.csrfToken === undefined || user.csrfToken === null || csrfToken !== user.csrfToken) {
        return res.status(401).json({"error": "Csrf tokens do not match"})
      }

      // Update the new Web3 Storage Index File
      let indexJsonBody = await getIndexJsonBody(IPNSAddress, indexFileName)

      // IF PV System has not reported for a day, create an empty object
      if(!indexJsonBody.pvSystems[did]) { indexJsonBody.pvSystems[did] = {}}
      indexJsonBody.pvSystems[did].status = setStatus

      const cid = await uploadIndexFile(new Web3Storage({token: process.env.WEB3_STORAGE_TOKEN}), indexJsonBody, indexFileName)

      // Update the IPNS Location
      await updateIPNSPointer(cid, web3NamePrivateKey)

      res.status(200).json({ "message": `Changed ${did} to \'${setStatus}\'` });
    } catch (e) {
      console.log(e.message)
      res.status(500).json({ "error": "Bad Request" });
    }
  } else {
    res.status(405).json({ "error": "Invalid request method" });
  }
}

export default withSession(handler)