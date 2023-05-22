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

    listener: () => void;

    constructor(customListener?: () => void) {
        if (customListener !== undefined) {
            this.listener = customListener;
        } else {
            this.listener = defaultListener;
        }

        this.addWindowListener();
    }

    // Need to check the difference between defining the value of the field
    // with addWindowListener() and addWindowListener = function...
    // because asaning the function value would not let me use "this"
    addWindowListener() {
        const browserWindow = window;

        browserWindow.addEventListener("hashchange", this.listener);
    }
}

class gpSpaRouter extends baseRouter implements routerObject {
    // Example of route type object
    // {path: "/", pageRenderer: () => window.location.pathname = router.DEFAULT_HOST_PATH + "/"},
    // Note: optionals parameters go last always
    constructor(routes: route[], hostPath?: string, customListener?: () => void) {
        super(customListener)
        this.DEFAULT_HOST_PATH = hostPath
        this.routes = routes;
    }

    DEFAULT_HOST_PATH?: string;

    routes: route[];

    getRoute(path: string) {
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
        const route = this.getRoute(path);
        const rendererMethod = this.load_route(route);
        this.render(rendererMethod);
    }
}

/*
* Notes:
* - I need to first create a new instance of the class with
* new basicRouter(). Check why and what would be the difference if
* i use new basicRouter; without the ()
*/
