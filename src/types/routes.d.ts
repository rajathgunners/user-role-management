// type file for routes folder 
export interface IRoutesObject {
    method: string;
    path: string;
    pre?: Array<Function>;
    controller: Function;
}

export interface IRoutes {
    routesBasePath: string;
    routes: Array<IRoutesObject>
}


