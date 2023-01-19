import { withSession } from "@auth/utils";
import { ADMIN_ROLE_NAMESPACE, ORG_INSTALLER_ROLE_NAMESPACE } from "@config/switchboard";
import { encrypt } from "@libs/cryptojs/encrypt";

async function handler(req, res) {
  const user = req.session?.user;
  const body = req.body

  if (!user || user.isLogggedIn === false || user.roles === undefined) {    
    res.status(401).end();
    return
  }

  const isInstaller = user.roles.includes(ORG_INSTALLER_ROLE_NAMESPACE)
  const isAdmin = user.roles.includes(ADMIN_ROLE_NAMESPACE)
  if(!(isAdmin || isInstaller)) {
    res.status(401).end();
    return
  }

  if (req.method == 'POST') {
    
    if(body === undefined || body === null) {
      res.status(400).json({ "success": false, "error": "Please specify a message object to be encrypted" });
      return
    }

    try {
      const messageString = JSON.stringify(body)
      const {cipherText, iv} = encrypt(process.env.DECRYPTION_KEY, messageString)

      res.status(200).json({ success: true, encrypted: {cipherText: cipherText, iv: iv.toString()}});
    } catch (e) {
      res.status(400).json({ success: false, error: e.message });
    }
  } else {
    res.status(405).json({ "success": false, "error": "Invalid request method" });
  }
}

export default withSession(handler)