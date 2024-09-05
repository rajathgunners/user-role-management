function beforeValidate(scope: any, options: any) {
    console.log("Inside beforeValidate Hook for Scopes");
    const [scopeService, scopeAction] = scope.scopeName.split(":");
    scope.scopeService = scopeService;
    scope.scopeAction = scopeAction;
}

export default {
    beforeValidate,
}