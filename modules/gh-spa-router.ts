import type {
    route, 
    routerObject, 
    routerInterface
} from '../index';
import { defaultListener } from '../utils/router-utils'
export {
    baseRouter,
    gpSpaRouter
}

// Revisar porque esta ruta funciona aunque fisicamente este niveles arriba
//fetch("./routerconfig.json") 
//    .then(response => response.json())
//    .then(object => {let test = object.DEFAULT_HOST_PATH})
//
// La idea de usar fetch esta deprecada pero seria interesante explorarla mas
// a fondo
//

class baseRouter implements routerInterface {

    //listener = defaultListener;

    constructor() {
        this.parsedLocation = this.parseRequestedPath();
    }

    listener!: () => void;
    parsedLocation: string[];

    // Need to check the difference between defining the value of the field
    // with addWindowListener() and addWindowListener = function...
    // because asaning the function value would not let me use "this"
    addWindowListener() {
        console.log("adding the window listener");
        const browserWindow = window;

        browserWindow.addEventListener("hashchange", this.listener);
    }

    getRequestedPath() {
        return window.location.search.replace("?", "");
    }

    parseRequestedPath() {
        var request: string = this.getRequestedPath();
        let paths: string[] = [];
        if (request) {
            paths = request.replace("/", " /").split(" ").slice(1);
        }
        console.log("requested path: ", request,"paths: ",  paths);

        return paths
    }
    
}

class gpSpaRouter extends baseRouter implements routerObject {
    // Example of route type object
    // {path: "/", pageRenderer: () => window.location.pathname = router.DEFAULT_HOST_PATH + "/"},
    // Note: optionals parameters go last always
    constructor(routes: route[], hostPath?: string, customListener?: () => void) {
        console.log("Creating the router class");

        super()

        console.log(this.parsedLocation);

        if (customListener !== undefined) {
            this.listener = customListener;
        } else {
            this.listener = () => defaultListener(this);
        }

        this.routes = routes;
        this.DEFAULT_HOST_PATH = hostPath

        this.addWindowListener();

        if (this.parsedLocation.length) this.navigate(this.parsedLocation[0]);

    }

    DEFAULT_HOST_PATH?: string;

    routes: route[];

    checkForPaths() {
    }

    getRoute(path: string) {
        console.log("get route path: ", path);
        return this.routes.find(route => route.path === path) as route;
    }

    /*
        * Notes:
        *
        * - If a define the function with a variable (load_route = functio())
        *   the "this" keyword would throw an error of implicity type Any
        */
    load_route(route: route) {

        const { path, pageRenderer } = route;
        // Change of the browsers path without reloading the page
        //let location_paths = window.location.pathname;
        //console.log("Paths before split: ", location_paths, location_paths.length);
        //let paths_lol = location_paths.split("/");
        //let paths = location_paths.split("/", 2);

        //let url_start = "";
        // paths[1] && url_start = "/";    why this does not work?
        //paths[1] && (url_start = "/");

        // let navigation_path = this.DEFAULT_HOST + "path";
        let pathToNavigate = path;
        if (this.DEFAULT_HOST_PATH !== undefined) {
            pathToNavigate = this.DEFAULT_HOST_PATH + path;
        }

        window.history.pushState({}, "", pathToNavigate);
    
        // Executing the method that renders the page
        return pageRenderer;
    }

    render(renderMethod: Function) {
        renderMethod();
    }

    navigate(path: string) {
        console.log("nvaigating to: ", path)
        if (path === "/") {
            console.log("hello")
            this.returnHome();
            return
        }
        const route = this.getRoute(path);
        const rendererMethod = this.load_route(route);

        this.render(rendererMethod);
    }

    returnHome() {
        if (this.DEFAULT_HOST_PATH) {
            console.log(window.location.pathname);
            console.log(this.DEFAULT_HOST_PATH);
            window.location.pathname = this.DEFAULT_HOST_PATH + "/";
        } else {
            window.location.pathname = "";
        }
    }
}

/*
* Notes:
* - I need to first create a new instance of the class with
* new basicRouter(). Check why and what would be the difference if
* i use new basicRouter; without the ()
*/
