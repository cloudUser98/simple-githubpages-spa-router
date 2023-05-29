class baseRouter {
    constructor() {
        this.parsedLocation = this.parseRequestedPath();
    }
    addWindowListener() {
        const browserWindow = window;
        browserWindow.addEventListener("popstate", this.listener);
    }
    getRequestedPath() {
        return window.location.search.replace("?", "");
    }
    parseRequestedPath() {
        var request = this.getRequestedPath();
        let paths = [];
        if (request) {
            paths = request.replace("/", " /").split(" ").slice(1);
        }
        return paths;
    }
}
class gpSpaRouter extends baseRouter {
    constructor(routes, hostPath, customListener) {
        super();
        if (customListener !== undefined) {
            this.listener = customListener;
        }
        else {
            this.listener = () => defaultListener(this);
        }
        this.routes = routes;
        this.DEFAULT_HOST_PATH = hostPath;
        this.addWindowListener();
        if (this.parsedLocation.length)
            this.navigate(this.parsedLocation[0]);
    }
    checkForPaths() {
    }
    getRoute(path) {
        return this.routes.find(route => route.path === path);
    }
    load_route(route) {
        const { path, pageRenderer } = route;
        let pathToNavigate = path;
        if (this.DEFAULT_HOST_PATH !== undefined) {
            pathToNavigate = this.DEFAULT_HOST_PATH + path;
        }
        window.history.replaceState({}, "", pathToNavigate);
        return pageRenderer;
    }
    render(renderMethod) {
        renderMethod();
    }
    navigate(path) {
        if (path === "/") {
            this.returnHome();
            return;
        }
        const route = this.getRoute(path);
        const rendererMethod = this.load_route(route);
        this.render(rendererMethod);
    }
    returnHome() {
        if (this.DEFAULT_HOST_PATH) {
            window.location.replace(this.DEFAULT_HOST_PATH + "/");
        }
        else {
            window.location.replace("");
        }
    }
}

/*
    * Main method for creating the Router object for the project
*/
function createRouter(routes, repoName, customListener) {
    return new gpSpaRouter(routes, repoName, customListener);
}
/*
    * Default listener method that will be attached to the Window object
    * if there is no custom listener declared.
*/
function defaultListener(routerInstance) {
    const currentWindowLocation = window.location;
    // Checking if the path was pushed as a hashed path: "#/path"
    const hashPath = currentWindowLocation.hash.replace("#/", "/");
    // Checking if the path was pushed as a normal path: "/path"
    const path = currentWindowLocation.pathname.replace(routerInstance.DEFAULT_HOST_PATH, "");
    const navigationPath = hashPath || path;
    console.log(navigationPath);
    routerInstance.navigate(navigationPath);
}

createRouter([
    {path: '/about', pageRenderer: about},
    {path: '/repository', pageRenderer: repository},
], 'simple-githubpages-spa-router');

const root = document.getElementById("root");

function about() {
    root.innerHTML = `
        <p>
            This is a demo page to showcase the basic use of the router.
        </p>
        <a href="#/">Main page</a>
    `;
}

function repository() {
    root.innerHTML = `
        <p>
            If you want to use this package you can visit the GitHub repository.
        </p>
        <ul>
            <li>
                <a href="https://github.com/cloudUser98/simple-githubpages-spa-router">
                    simple-githubpages-spa-router
                </a>
            </li>
        </ul>
        <a href="#/">Main page</a>
    `;
}
