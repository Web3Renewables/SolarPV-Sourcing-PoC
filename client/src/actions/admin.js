const approveVerifiedElectrician = () => {
  // - Approve an electrician once their license has been verified
  //     - LearnCard SDK is used to verify it, once verified the smart contract call to make them an approved installer
  //     - update electricians mapping set license_is_approved
  //     - NOTE: Maybe the admin has to approve electricians per project
};

const revokeElectriciansApproval = () => {
  // - Revoke an electricians approval
  //     - update electricians mapping set license_is_approved false
};

const subscribeProject = () => {
  // - Add or Remove PV System (NFTs) from the Reporting Index
  //     - want to start gathering data for a project only after electrician is approved
  //     - in cron task, check projects if electrician is approved, pull their data
};

const unsubscribeProject = () => {};

const transferOwnershipOfProject = () => {
  // - Delegate Ownership of PV System
  //     - transfer ownership (part of ERC1155 ownable)
};
