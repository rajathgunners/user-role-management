var requireDirectory = require('require-directory');
import { IRoutes } from "../types/routes"

const requiredModules: { [key: string]: IRoutes } = requireDirectory(module, {
    visit: (obj: any) => obj.default,
    exclude: (path: string) => {
        const result = path.includes("_");
        if (result) return true; else return false;
    },
});

export default requiredModules;