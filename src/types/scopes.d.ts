interface createScopeReqDto {
    scopeName: string;
}

interface deleteScopeReqDto {
    scopeId: number;
}

interface createScopeResDto {
    id: number;
    scopeService: string;
    scopeName: string;
    scopeAction: string;
}

interface listScopesResDto extends createScopeResDto { }

export {
    createScopeReqDto,
    createScopeResDto,
    deleteScopeReqDto,
    listScopesResDto,
}