interface createUserReqDto {
    email: string;
    password: string;
    inviteToken: string;
}

interface createUserResDto {
    id: number;
    email: string;
    roleId: number;
    createdAt: Date;
    updatedAt: Date;
}

interface updateUserRoleReqDto {
    userId: number;
    roleId: number;
}

interface inviteUserReqDto {
    inviteeEmail: string;
    inviteeRoleId: number;
}

interface inviteUserDto extends inviteUserReqDto {
    inviterId: number;
}

interface inviteUserResDto {
    inviteeEmail: string;
    token: string;
}

interface getUsersResDto {
    id: number;
    email: string;
    roleId: number;
    roleName: string;
}

export {
    createUserReqDto,
    createUserResDto,
    updateUserRoleReqDto,
    inviteUserReqDto,
    inviteUserDto,
    inviteUserResDto,
    getUsersResDto,
}