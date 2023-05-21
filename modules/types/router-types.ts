export interface route {
    path: string;
    pageRenderer: () => void;
}

export interface routerObject {
    DEFAULT_HOST_PATH: string;
    // Rcord<Route> gives an error
    routes: Array<route> | route[];
    //routes: route[];
    readonly route: Function;
    readonly getRoute: (path: string) => route;
    //readonly getRoute: (path: string) => route | undefined;
    readonly navigate: Function;
    readonly load_route: Function;
}
