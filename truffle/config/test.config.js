var Config = function(accounts) {

    let nonExistentProjectId = 8929;

    let installer = {
        account: accounts[1],
        uri: "test installer uri",
        inverters: ["ceramic id 1", "ceramic id 2", "ceramic id 3"],
        pvSystems: [
            {
                uri: "installer pv system uri"
            },
            {
                uri: "second installer pv system uri"
            }
        ]
    }

    let revertConstants = {
        AccessControlPermissionReason: function(account) {
            return `AccessControl: account ${account.toLowerCase()} is missing role 0x0000000000000000000000000000000000000000000000000000000000000000`
        },
        NotRegisteredInstaller: "You are not a registered installer",
        PVSystemDNE: "This PV System does not exist"
    }

    let secondInstaller = {
        account: accounts[4],
    }

    let defaultAdmin = {
        account: accounts[0]
    }

    let defaultUser = {
        account: accounts[3]
    }

    let electrician = {
        account: accounts[2],
        streamId: "electrician stream id"
    }

    let governance = {
        account: accounts[5]
    }

    let systemOwner = {
        account: accounts[6],
        streamId: "system owner stream id"
    }

    let approvedNotRegisteredInstaller = {
        account: accounts[7]
    }

    return {
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
    }
}

module.exports = {
    Config: Config
};