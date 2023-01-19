import { ORG_NAMESPACE, APP_NAME, APP_NAMESPACE, APPS_NAMESPACE } from "../constants.js";

async function createRootApp(domainsService) {
  const apps = await domainsService.getAppsOfOrg(ORG_NAMESPACE);
  const appAlreadyExists = apps.find((app) => app.name === APP_NAME);

  if (appAlreadyExists) {
    console.log(`${APP_NAMESPACE} already exists.`);
    return;
  }

  console.log(`Creating ${APP_NAMESPACE}...`);

  const res = await domainsService.createApplication({
    appName: APP_NAME,
    namespace: APPS_NAMESPACE,
    data: {
      appName: "my app", // A more descriptive name for the app
      // logoUrl: "",
      // websiteUrl: "",
      // description: "",
    },
    returnSteps: false, // Indicates whether to run steps immediately (false) or return steps that can be executed later (true)
  });

  console.log(`+++ Created ${APP_NAMESPACE}.`);
  return res;
}

export default createRootApp;
