
// Model folder types
interface IScopesAttributes {
    id: number;
    scopeName: string;
    scopeService: string;
    scopeAction: string;
}

interface IRolesAttributes {
    id: number;
    roleName: string;
}

interface IRoleScopesAttributes {
    roleId: number;
    scopeId: string;
}

interface IUsersAttributes {
    id: number;
    email: string;
    password: string;
    roleId: number;
    inviteId: number;
}

interface IInvitesAttributes {
    id: number;
    inviteeEmail: string;
    token: string;
    inviteeRoleId: number;
    inviterId: number;
}

export {
    IScopesAttributes,
    IRolesAttributes,
    IRoleScopesAttributes,
    IUsersAttributes,
    IInvitesAttributes
}