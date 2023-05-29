export { createRouter } from '../utils/router-utils'

export interface route {
    path: string;
    pageRenderer: (routerInstance: routerObject | undefined) => void;
}

export interface routerInterface {

    /**
    * Method that would parse the new window location to get the path
    * for the automatic navigation
    */
    listener: () => void;

    /**
        * Parsed location
    */
    parsedLocation: string[];

    /**
    * Method that would parse the new window location to get the path
    * for the automatic navigation
    */
    addWindowListener: () => void;

    /**
        * Returns the requestd path after reload
    */
    getRequestedPath: () => string;

    /**
        * Parse the requested path on reload and returns an array of the
    * parsed paths
    */
    parseRequestedPath: () => string[];
}

export interface routerObject {
    DEFAULT_HOST_PATH?: string;
    routes: Array<route> | route[];
    readonly getRoute: (path: string) => route;
    readonly navigate: Function;
    readonly load_route: (route: route) => Function;
    readonly render: (renderMethod: Function) => void;
    readonly checkForPaths: () => void;
    readonly returnHome: () => void;
}
