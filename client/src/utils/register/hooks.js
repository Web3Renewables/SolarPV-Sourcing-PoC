import { useState, useEffect, useContext } from 'react';
import { IamClientContext } from '@providers/iam_client_lib';
import { ORG_NAMESPACE } from '@config/switchboard';

function usePendingRoleClaim(did, role) {
  const { iamClient } = useContext(IamClientContext)
  const [pendingClaim, setPendingClaim] = useState(false)

  useEffect(() => {
    async function checkPendingStatus() {
        // Check to make sure claimsService is active
        if(iamClient.claimsService === undefined) {
            return;
        }
        
        // Get all of the user's claims
        const claims = await iamClient.claimsService.getClaimsByRequester({
            did: did,
            isAccepted: false,
            namespace: ORG_NAMESPACE,
        });

        // Filter the claims by the desired role
        claims.filter((obj) => obj.claimType === role).forEach((element) => {
            // If the claim is not accepted and has not been rejected, then it is pending
            if(!element.isAccepted && !element.isRejected) {
                setPendingClaim(true)
                return;
            }
            setPendingClaim(false)
        })
    }
    checkPendingStatus()
  }, [iamClient]);

  return pendingClaim;
}

export {usePendingRoleClaim}