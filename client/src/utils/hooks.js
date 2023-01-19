import { useState, useEffect, useContext } from 'react';
import { IamClientContext } from '@providers/iam_client_lib';
import { filterByClaimType } from './vc';
import { ORG_NAMESPACE, ORG_INSTALLER_ROLE_NAMESPACE } from '@config/switchboard';
import { getAppRoleDefinitions } from '@libs/iam_client_lib/utils/app_role_utils'

function usePublishableClaims(did) {
  const { iamClient } = useContext(IamClientContext)
  const [claims, setClaims] = useState([])
  const [modal, setModal] = useState({ visibile: false, claim: {} })

  useEffect(() => {
    async function checkClaims() {
      // Check to make sure claimsService is active
      if (iamClient.claimsService === undefined) {
        return;
      }

      // These are claims that have been published already
      const publishedClaims = await iamClient.claimsService.getUserClaims({});

      // These are all claims, published or not for a user
      const requestorClaims = await iamClient.claimsService.getClaimsBySubject({did: did, isAccepted: true,});
      // Get all assets owner by a user
      const assets = await iamClient.assetsService.getOwnedAssets({did: did,});

      // Get all assets' claims that the user owns
      const assetClaims = await iamClient.claimsService.getClaimsBySubjects(assets.map(obj => obj.id));
      
      // Get only claims that have been accepted and not rejected
      const filteredRequestorClaims = requestorClaims.filter((element) => element.isAccepted && !element.isRejected )
      const validAssetClaims = assetClaims.filter(element => element.isAccepted && !element.isRejected)
      const publishedAssetsClaims = await Promise.all(assets.map(async asset => {
        return {did: asset.id, publishedClaims: await iamClient.claimsService.getUserClaims({did: asset.id})}
      }))
      let results = []
      // Filter out published asset claims
      publishedAssetsClaims.forEach(asset => {
        const valid = validAssetClaims.filter((element) => {
          return !asset.publishedClaims.find((claim) => {return element.claimType === claim.claimType}) && asset.did === element.subject
        })
        results = [...results, ...valid]
      })
      // Filter the claims to remove any that have already been published
      let filteredResults = filterByClaimType(filteredRequestorClaims, publishedClaims)
      // Merge the two lists together
      let combined = [...filteredResults, ...results]
      setClaims(combined)
    }
    checkClaims()
  }, [iamClient, modal]);

  return [claims, modal, setModal];
}

function useOwner(address) {
  const { iamClient } = useContext(IamClientContext)
  const [owner, setOwner] = useState(false)

  useEffect(() => {
    async function checkOwner() {
      // Check to make sure domainsService is active
      if (iamClient.domainsService === undefined) {
        setOwner(false)
        return;
      }

      // Check if the wallet address is the owner
      const isOwner = await iamClient.domainsService.isOwner({
        domain: ORG_NAMESPACE,
        user: address,
      });

      setOwner(isOwner)
    }
    checkOwner()
  }, [iamClient]);

  return owner;
}

function useInstallerDIDs() {
  const { iamClient } = useContext(IamClientContext)
  const [installers, setInstallers] = useState([])

  useEffect(() => {
    async function getInstallers() {
      // Check to make sure domainsService is active
      if (iamClient.domainsService === undefined) {
        return;
      }

      // Gets all of the DIDs that have the 'Installer' role
      const installersDIDs = await iamClient.domainsService.getDIDsByRole(ORG_INSTALLER_ROLE_NAMESPACE);

      // We need the information inside the role claim (business name) to display
      // Therefore, get the claims of those DIDs
      const installersClaims = await iamClient.claimsService.getClaimsBySubjects(installersDIDs);
      // Filter those claims by the installer role and that it was accepted
      const onlyInstallerRoleClaims = installersClaims.filter((claim) => claim.claimType === ORG_INSTALLER_ROLE_NAMESPACE && claim.isAccepted)

      setInstallers(onlyInstallerRoleClaims)
    }
    getInstallers()
  }, [iamClient]);

  return installers;
}

function useProjectOwner(appName, roles) {
  const { iamClient } = useContext(IamClientContext)
  const [isProjectOwner, setProjectOwner] = useState({ pending: true, value: false })

  useEffect(() => {
    async function getProjectOwner() {
      const { APP_INSTALLER_ROLE_NAMESPACE } = getAppRoleDefinitions(appName)
      const isOwner = roles.some((role) => role === APP_INSTALLER_ROLE_NAMESPACE)
      setProjectOwner({ pending: false, value: isOwner })
    }
    getProjectOwner()
  }, [iamClient]);

  return isProjectOwner;
}

export {
  useOwner,
  useInstallerDIDs,
  useProjectOwner,
  usePublishableClaims
}
