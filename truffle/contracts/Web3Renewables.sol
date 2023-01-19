// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Web3Renewables is ERC1155, AccessControl, ReentrancyGuard {
    bytes32 public constant INSTALLER_ROLE = keccak256("INSTALLER_ROLE");
    bytes32 public constant ELECTRICIAN_ROLE = keccak256("ELECTRICIAN_ROLE");
    bytes32 public constant SYSTEM_OWNER_ROLE = keccak256("SYSTEM_OWNER_ROLE");
    bytes32 public constant GOVERNANCE_ROLE = keccak256("GOVERNANCE_ROLE");

    uint256 private constant MAX_INT = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
    address[] private adminAddresses;

    using SafeMath for uint256;
    using Counters for Counters.Counter; 

    mapping(address => InstallerMetadata) private installers;
    mapping(address => string) private electricians;
    mapping(address => mapping(uint256 => PVSystem)) private systems;

    struct InstallerMetadata {
        Counters.Counter projectCount;
        string ceramicStreamId;
    }

    struct PVSystem {
        string ceramicStreamId;
        address[] electricians;
        string[] inverters;
        SystemOwner owner;
    }

    struct SystemOwner {
        address wallet;
        string ceramicStreamId;
    }

    event NewPVSystemRegistered(uint256 tokenId, address installer);
    event RequestInstallerApproval(address installer, address[] admins);
    event RequestElectricianApproval(address electrician, address[] admins);
    event RequestElectricianCredentialApproval(address electrician, address[] governance);
    event SystemOwnerAdded(address owner, address installer, uint256 projectId);

    modifier notRegisteredInstaller() {
       require(!isInInstallerMapping(msg.sender), "Already a registered installer");
        _;
    }

    modifier notRegisteredElectrician() {
        require(!isInElectricianMapping(msg.sender), "Already a registered electrician");
        _;
    }

    modifier registeredElectrician() {
        require(isInElectricianMapping(msg.sender), "You are not a registered electrician");
        _;
    }

    modifier registeredInstaller() {
       require(isInInstallerMapping(msg.sender), "You are not a registered installer");
        _;
    }

    modifier isApprovedInstaller() {
       require(hasRole(INSTALLER_ROLE, msg.sender), "You do not have the required permissions");
        _;
    }

    modifier pvSystemExists(address installer, uint256 projectId) {
        require(bytes(systems[installer][projectId].ceramicStreamId).length > 0, "This PV System does not exist");
        _;
    }

    constructor() ERC1155("") {
        // My Address
        adminAddresses.push(msg.sender);
        adminAddresses.push(0x9Cd3d45ACd43b4e504c41Ce2023b6408b5Fa1961);

        _grantRole(DEFAULT_ADMIN_ROLE, adminAddresses[0]);
        _grantRole(DEFAULT_ADMIN_ROLE, adminAddresses[1]);
    }

    function registerAsInstaller(string memory streamId)
        notRegisteredInstaller
        external
    {
        InstallerMetadata memory metadata;
        metadata.ceramicStreamId = streamId;
        installers[msg.sender] = metadata;

        if(!hasRole(INSTALLER_ROLE, msg.sender)) {
            emit RequestInstallerApproval(msg.sender, adminAddresses);
        }

    }

    function registerAsElectrician(string memory streamId)
        external
        notRegisteredElectrician
    {
        electricians[msg.sender] = streamId;

        if(!hasRole(ELECTRICIAN_ROLE, msg.sender)) {
            emit RequestElectricianApproval(msg.sender, adminAddresses);
        }
        emit RequestElectricianCredentialApproval(msg.sender, adminAddresses);
    }

    function registerPVSystem(string memory streamId)
        external
        nonReentrant
        registeredInstaller
        isApprovedInstaller
    {
        require(installers[msg.sender].projectCount.current() < MAX_INT, "Reached Project limit.");

        // Get a new project id
        installers[msg.sender].projectCount.increment();
        uint256 projectId = installers[msg.sender].projectCount.current();

        // Create initial 'project' object
        PVSystem memory system;
        system.ceramicStreamId = streamId;

        systems[msg.sender][projectId] = system;
        emit NewPVSystemRegistered(projectId, msg.sender);
    }

    function addInverterToPVSystem(uint256 projectId, string[] memory inverterStreamIds)
        external
        nonReentrant
        pvSystemExists(msg.sender, projectId)
    {
        for(uint256 i = 0; i < inverterStreamIds.length; i++) {
            systems[msg.sender][projectId].inverters.push(inverterStreamIds[i]);
        }
        
    }

    function addSystemOwnerToPVSystem(uint256 projectId, address systemOwner, string memory ceramicStreamId)
        external
        pvSystemExists(msg.sender, projectId)
    {
        _grantRole(SYSTEM_OWNER_ROLE, systemOwner);
        emit SystemOwnerAdded(systemOwner, msg.sender, projectId);

        SystemOwner memory owner;
        owner.ceramicStreamId = ceramicStreamId;
        owner.wallet = systemOwner;

        systems[msg.sender][projectId].owner = owner;
    }

    function removeInverterFromPVSystem(uint256 projectId, uint256 index)
        external
        nonReentrant
        pvSystemExists(msg.sender, projectId)
    {
        // Get the total number of inverters
        uint256 inverterLength = systems[msg.sender][projectId].inverters.length;

        //Require the removed inverter index be in bounds
        require(index < inverterLength);

        // Set the inverter to be removed position to the last element in the list
        // Essentially overwrites the data with the last element
        systems[msg.sender][projectId].inverters[index] = systems[msg.sender][projectId].inverters[inverterLength-1];

        //Removes the last element to delete the now duplicate
        systems[msg.sender][projectId].inverters.pop();
    }


    function getPVSystem(address installer, uint256 projectId)
        external
        view
        pvSystemExists(installer, projectId)
        returns(string memory systemStreamId, address[] memory electriciansInSystem, string[] memory inverters, address systemOwner, string memory systemOwnerStreamId)
    {
        PVSystem memory system = systems[installer][projectId];
        
        systemStreamId = system.ceramicStreamId;
        electriciansInSystem = system.electricians;
        inverters = system.inverters;
        systemOwner = system.owner.wallet;
        systemOwnerStreamId = system.owner.ceramicStreamId;
    }

    function getInstallerStreamId(address installer)
        external
        view
        returns (string memory)
    {
        return installers[installer].ceramicStreamId;
    }

    function getElectricianStreamId(address electrician)
        external
        view
        returns (string memory)
    {
        return electricians[electrician];
    }

    function isInInstallerMapping(address account)
        internal
        view
        returns (bool)
    {
        return bytes(installers[account].ceramicStreamId).length > 0;
    }

    function isInElectricianMapping(address account)
        internal
        view
        returns (bool)
    {
        return bytes(electricians[account]).length > 0;
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
