interface createRoleReqDto {
    roleName: string;
    scopeIds: Array<number>;
}

interface createRoleResDto {
    id: string;
    roleName: string;
    createdAt: Date;
    updatedAt: Date;
    scopes: Array<{
        id: number;
        scopeName: string;
        scopeService: string;
        scopeAction: string;
    }>
}

interface updateRoleScopesReqDto {
    roleId: number;
    scopeIds: Array<number>;
    action: "add" | "remove";
}

interface getRolesResDto {
    id: number;
    roleName: string;
    createdAt: Date;
    updatedAt: Date;
}

interface getRoleReqDto {
    roleId: number;
}

interface getRoleResDto extends createRoleResDto { };

export {
    createRoleReqDto,
    createRoleResDto,
    updateRoleScopesReqDto,
    getRolesResDto,
    getRoleReqDto,
    getRoleResDto,
}