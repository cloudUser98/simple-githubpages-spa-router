export { createRouter } from './utils/router-utils'

export interface route {
    path: string;
    pageRenderer: () => void;
}

export interface routerInterface {

    /**
    * Method that would parse the new window location to get the path
    * for the automatic navigation
    */
    listener: () => void;

    /**
    * Method that would parse the new window location to get the path
    * for the automatic navigation
    */
    addWindowListener: () => void;
}

export interface routerObject {
    DEFAULT_HOST_PATH?: string;
    // Rcord<Route> gives an error
    routes: Array<route> | route[];
    //routes: route[];
    readonly getRoute: (path: string) => route;
    //readonly getRoute: (path: string) => route | undefined;
    readonly navigate: Function;
    readonly load_route: (route: route) => Function;
    readonly render: (renderMethod: Function) => void;
}
