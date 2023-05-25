import { defaultListener } from '../utils/router-utils'
import type {
    route, 
    routerObject, 
    routerInterface
} from '../index';

export {
    baseRouter,
    gpSpaRouter
}

class baseRouter implements routerInterface {

    constructor() {
        this.parsedLocation = this.parseRequestedPath();
    }

    listener!: () => void;
    parsedLocation: string[];

    addWindowListener() {
        const browserWindow = window;

        browserWindow.addEventListener("popstate", this.listener);
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

        return paths
    }
    
}

class gpSpaRouter extends baseRouter implements routerObject {

    constructor(routes: route[], hostPath?: string, customListener?: () => void) {
        super()

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
        return this.routes.find(route => route.path === path) as route;
    }

    load_route(route: route) {

        const { path, pageRenderer } = route;
        let pathToNavigate = path;

        if (this.DEFAULT_HOST_PATH !== undefined) {
            pathToNavigate = this.DEFAULT_HOST_PATH + path;
        }

        window.history.replaceState({}, "", pathToNavigate);
    
        return pageRenderer;
    }

    render(renderMethod: Function) {
        renderMethod();
    }

    navigate(path: string) {
        if (path === "/") {
            this.returnHome();
            return
        }
        const route = this.getRoute(path);
        const rendererMethod = this.load_route(route);

        this.render(rendererMethod);
    }

    returnHome() {
        if (this.DEFAULT_HOST_PATH) {
            window.location.replace(this.DEFAULT_HOST_PATH + "/");
        } else {
            window.location.replace("");
        }
    }
}
