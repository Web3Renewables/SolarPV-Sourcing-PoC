const isProjectOwner = (appInstallerRoleNamespace, roles) => {
    console.log(appInstallerRoleNamespace, roles)
    return roles.some((role) => role === appInstallerRoleNamespace)
}


export default isProjectOwner;