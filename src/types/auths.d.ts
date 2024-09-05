interface authUserDto {
    userId: number;
    userEmail: string;
    userRoleId: string;
    userRoleName: string;
    userRoleScopes: Set<string>;
    iat?: number;
    exp?: number;
    aud?: string | Array<string>;
}

interface signInReqDto {
    email: string;
    password: string;
}

interface signInResDto {
    id: number;
    email: string;
    roleId: number;
    createdAt: Date;
    updatedAt: Date;
}

export {
    authUserDto,
    signInReqDto,
    signInResDto,
}