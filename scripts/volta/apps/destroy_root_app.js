import { APP_NAMESPACE } from "../constants.js";

async function destroyRootApp(domainsService) {
  console.log(`Destroying ${APP_NAMESPACE}...`);

  const appAlreadyExists = await domainsService.checkExistenceOfDomain({
    domain: APP_NAMESPACE,
  });

  if (appAlreadyExists) {
    await domainsService.deleteApplication({
      namespace: APP_NAMESPACE,
      returnSteps: false,
    });
    console.log(`--- Destroyed ${APP_NAMESPACE}.`);
  } else {
    console.log(`${APP_NAMESPACE} does not exist.`);
  }
}

export default destroyRootApp;
