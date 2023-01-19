const { ErrorType } = require('truffle-assertions');
const truffleAssert = require('truffle-assertions');
var Web3Renewables = artifacts.require("Web3Renewables");
var MockData = require('../config/test.config.js');

contract('Web3Renewables', async (accounts) => {

    let contract;
    let electricianRoleKeccak;
    let installerRoleKeccak;
    let systemOwnerRoleKeccak;
    let governanceRoleKeccak;
    
    const {
        installer, 
        secondInstaller, 
        defaultAdmin, 
        defaultUser, 
        electrician, 
        governance, 
        systemOwner, 
        approvedNotRegisteredInstaller, 
        nonExistentProjectId,
        revertConstants
    } = MockData.Config(accounts)

    before('setup contract', async () => {
        // Deploys the contract to the test network
        contract = await Web3Renewables.deployed()
        
        // Collects the 32 byte identifier for each role
        electricianRoleKeccak = await contract.ELECTRICIAN_ROLE.call()
        installerRoleKeccak = await contract.INSTALLER_ROLE.call()
        systemOwnerRoleKeccak = await contract.SYSTEM_OWNER_ROLE.call()
        governanceRoleKeccak = await contract.GOVERNANCE_ROLE.call()
    })

    it('register as an electrician', async function() {
        let tx = await contract.registerAsElectrician(electrician.streamId, {from: electrician.account})

        truffleAssert.eventEmitted(tx, "RequestElectricianApproval", (ev) => {
            return ev.electrician === electrician.account;
        })

        truffleAssert.eventEmitted(tx, "RequestElectricianCredentialApproval", (ev) => {
            return ev.electrician === electrician.account;
        })

        let streamId = await contract.getElectricianStreamId(electrician.account);
        assert.equal(streamId, electrician.streamId, "StreamIds do not match.")
    })

    it('admin can grant roles', async function() {
        // Attempts to grant the electrician role as the default admin of the contract

        await contract.grantRole(electricianRoleKeccak, electrician.account, {from: defaultAdmin.account})
        let isElectricianRole = await contract.hasRole(electricianRoleKeccak, electrician.account)
        assert.equal(isElectricianRole, true, "Does not have electrician role");

        // Attempts to grant the installer role as the default admin of the contract
        await contract.grantRole(installerRoleKeccak, secondInstaller.account, {from: defaultAdmin.account})
        let isInstallerRole = await contract.hasRole(installerRoleKeccak, secondInstaller.account)
        assert.equal(isInstallerRole, true, "Does not have Installer role");

        // Attempts to grant the governance role as the default admin of the contract
        await contract.grantRole(governanceRoleKeccak, governance.account, {from: defaultAdmin.account})
        let isGovernanceRole = await contract.hasRole(governanceRoleKeccak, governance.account)
        assert.equal(isGovernanceRole, true, "Does not have Governence role");

        // Attempts to grant the system owner role as the default admin of the contract
        await contract.grantRole(systemOwnerRoleKeccak, systemOwner.account, {from: defaultAdmin.account})
        let isSystemOwnerRole = await contract.hasRole(systemOwnerRoleKeccak, systemOwner.account)
        assert.equal(isSystemOwnerRole, true, "Does not have Governence role");
    })

    it('users cannot grant roles', async function() {
        //Attempts to grant the electrician role as a regular user
       
        truffleAssert.fails(
            contract.grantRole(electricianRoleKeccak, defaultUser.account, {from: defaultUser.account}),
            truffleAssert.ErrorType.REVERT,
            revertConstants.AccessControlPermissionReason(defaultUser.account)
        )
        
        let isElectricianRole = await contract.hasRole(electricianRoleKeccak, defaultUser.account)
        assert.equal(isElectricianRole, false, "Default user has role!");
    })

    it('installer can register', async function() {
        // Register the user as installer
        let tx = await contract.registerAsInstaller(installer.uri, {from: installer.account})

        // Check if the installer is now in the installers mapping
        let uri = await contract.getInstallerStreamId.call(installer.account)
        assert.equal(uri, installer.uri, "Installer URI does not match.")

        // Check if the role event was emitted
        truffleAssert.eventEmitted(tx, 'RequestInstallerApproval', (ev) => {
            return ev.installer === installer.account;
        });

        // Grant installer role as admin
        await contract.grantRole(installerRoleKeccak, installer.account, {from: defaultAdmin.account})

        // Check if installer has the correct role
        let isInstallerRole = await contract.hasRole(installerRoleKeccak, installer.account)
        assert.equal(isInstallerRole, true, "Does not have installer role");
    })

    it('installer can register a PV System (project)', async function() {
        // Perform inital NFT creation
        let pvSystemUri = installer.pvSystems[0].uri;

        let tx = await contract.registerPVSystem(pvSystemUri, {from: installer.account})

        // Ensure event is emitted
        truffleAssert.eventEmitted(tx, 'NewPVSystemRegistered', (ev) => {
            return ev.installer === installer.account && ev.tokenId == 1;
        });

        // Ensure data can be retrieved
        let result = await contract.getPVSystem(installer.account, 1);
        assert.equal(result.systemStreamId, pvSystemUri, "Invalid Uri fetched.")

    })

    it('installer can register another PV System (project)', async function() {
        // Perform inital NFT creation
        let pvSystemUri = installer.pvSystems[1].uri;
        let tx = await contract.registerPVSystem(pvSystemUri, {from: installer.account})

        // Ensure event is emitted
        truffleAssert.eventEmitted(tx, 'NewPVSystemRegistered', (ev) => {
            return ev.installer === installer.account && ev.tokenId == 2;
        });

        // Ensure data can be retrieved
        let result = await contract.getPVSystem(installer.account, 2);
        assert.equal(result.systemStreamId, pvSystemUri, "Invalid Uri fetched.")

    })

    it('only allowed users can register a PV System', async function() {
        // Check that non-installer cannot add new PV System
        await truffleAssert.fails(
            contract.registerPVSystem("defualt user uri", {from: defaultUser.account}),
            truffleAssert.ErrorType.REVERT,
            revertConstants.NotRegisteredInstaller
        );
    })

    it('approved but not registered users cannot register a new PV System', async function() {
        let user = approvedNotRegisteredInstaller.account;

        await contract.grantRole(installerRoleKeccak, user, {from: defaultAdmin.account})
        //Check that non-installer cannot add new PV System
        await truffleAssert.fails(
            contract.registerPVSystem("simple uri", {from: user}),
            truffleAssert.ErrorType.REVERT,
            revertConstants.NotRegisteredInstaller       
        );
    })

    it('add inverters to PV System', async function() {
        // Add a list of inverters to the PV System
        let sampleInverters = installer.inverters;
        
        await contract.addInverterToPVSystem(1, sampleInverters, {from: installer.account})
        let result = await contract.getPVSystem(installer.account, 1);

        assert.equal(result.inverters[0], sampleInverters[0], "Invalid Inverter")
        assert.equal(result.inverters[1], sampleInverters[1], "Invalid Inverter")
        assert.equal(result.inverters[2], sampleInverters[2], "Invalid Inverter")
    })

    it('check that non-owner cannot add inverters to PV system', async function() {
        let sampleInverters = installer.inverters;

        await truffleAssert.fails(
            contract.addInverterToPVSystem(1, sampleInverters, {from: defaultAdmin.account}),
            truffleAssert.ErrorType.REVERT,
            revertConstants.PVSystemDNE
        );
    })

    it('check that non-owner cannot remove inverters from a PV system', async function() {
        await truffleAssert.fails(
            contract.removeInverterFromPVSystem(1, 1, {from: defaultAdmin.account}),
            truffleAssert.ErrorType.REVERT,
            revertConstants.PVSystemDNE
        );
    })

    it('remove inverter from a PV System', async function() {
        let sampleInverters = installer.inverters;

        let initial = await contract.getPVSystem(installer.account, 1);
        // Check the initial inverter count in the smart contract
        assert.equal(initial.inverters.length, 3, "Incorrect initial inverter count")
        // Pop the second element from the inverter list in the smart contract
        await contract.removeInverterFromPVSystem(1, 1, {from: installer.account})
        // Get the PV System information
        let result = await contract.getPVSystem(installer.account, 1);

        // Check that the first inverter is the same
        assert.equal(result.inverters[0], sampleInverters[0], "Invalid Inverter")
        // Check that the new, second inverter in the contract is now the third inverter from the sample list
        assert.equal(result.inverters[1], sampleInverters[2], "Invalid Inverter")
        // Ensure that the size of the smart contract inverter list has changed
        assert.equal(result.inverters.length, 2, "Incorrect result inverter count")

        await truffleAssert.fails(
            contract.removeInverterFromPVSystem(1, 0, {from: defaultUser.account}),
            truffleAssert.ErrorType.REVERT,
            revertConstants.PVSystemDNE
        );
    })

    it('trying to view a non-existant project throws an error', async function() {
        await truffleAssert.fails(
            contract.getPVSystem(installer.account, 4),
            truffleAssert.ErrorType.REVERT,
            revertConstants.PVSystemDNE
        );

        await truffleAssert.passes(
            contract.getPVSystem(installer.account, 1),
            revertConstants.PVSystemDNE
        );
    })

    it('inverters can only be added to existing projects', async function() {

        await truffleAssert.fails(
            contract.addInverterToPVSystem(nonExistentProjectId, installer.inverters, {from: installer.account}),
            truffleAssert.ErrorType.REVERT,
            revertConstants.PVSystemDNE
        );
    })

    it('add system owner to PV System', async function() {
        let tx = await contract.addSystemOwnerToPVSystem(2, systemOwner.account, systemOwner.streamId, {from: installer.account})
        const pvSystem = await contract.getPVSystem(installer.account, 2)

        assert.equal(pvSystem.systemOwnerStreamId, systemOwner.streamId, "StreamIds do not match")
        assert.equal(pvSystem.systemOwner, systemOwner.account, "Owner does not match")

        truffleAssert.eventEmitted(tx, "SystemOwnerAdded", (ev) => {
            return ev.installer === installer.account && ev.projectId == 2 && ev.owner == systemOwner.account;
        });

       let isSystemOwner = await contract.hasRole(systemOwnerRoleKeccak, systemOwner.account)
       assert(isSystemOwner, "User is not a system owner")
    })
});
