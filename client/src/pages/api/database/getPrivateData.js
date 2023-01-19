const admin = require('firebase-admin');
import getProjectFromId from "@actions/projects/get_project_from_id";
import { ORG_INSTALLER_ROLE_NAMESPACE, ADMIN_ROLE_NAMESPACE } from "@config/switchboard";
import { withSession } from "@auth/utils";
import { getIamClient } from "@utils/iam-client-lib/server_side_helper";
import { getAppRoleDefinitions } from "@libs/iam_client_lib/utils/app_role_utils";
import { PrivateDataRequestTypes, readProjectData } from "@libs/firebase";

const app = !admin.apps.length ? admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_WORKER)),
  databaseURL: process.env.FIREBASE_DATABASE_URL
}) : admin.app();
let db = admin.database(app)

async function handler(req, res) {
  const user = req.session?.user;
  const body = req.body

  if (!user || user.isLogggedIn === false || user.roles === undefined) {
    res.status(401).end();
    return
  }

  const isInstaller = user.roles.includes(ORG_INSTALLER_ROLE_NAMESPACE)
  const isAdmin = user.roles.includes(ADMIN_ROLE_NAMESPACE)
  if (!(isAdmin || isInstaller)) {
    res.status(401).end();
    return
  }

  if (req.method == 'POST') {
    if (body === undefined || body === null) {
      res.status(400).json({ "error": "Please specify a " });
      return
    }

    try {
      const { appId, type } = body

      const { domainsService } = await getIamClient()
      const project = await getProjectFromId(appId, { domainsService })
      if(!project) return res.status(404).json({"error": "appId not found."})

      const { APP_INSTALLER_ROLE_NAMESPACE } = getAppRoleDefinitions(project.name)
      // Check if the api caller is assigned this namepsace
      if (!user.roles.includes(APP_INSTALLER_ROLE_NAMESPACE)) {
        return res.status(401).json({ "error": "You do not own this projects!" });
      }

      const projectData = await readProjectData(db, appId)

      switch(type) {
        case PrivateDataRequestTypes.PVSystem:
          return res.status(200).json(projectData.pvSystem.privateData.user);
        case PrivateDataRequestTypes.SystemOwner:
          return res.status(200).json(projectData.systemOwner.privateData.user);
        default:
          return res.status(405).json({error: "Invalid request type: either \"pv_system\" or \"system_owner\""});
      }

      
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  } else {
    res.status(405).json({ error: "Invalid request method" });
  }

}

export default withSession(handler)