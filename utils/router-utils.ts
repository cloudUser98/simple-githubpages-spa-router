import {routerObject, route } from '../index'
import { gpSpaRouter } from '../modules/gh-spa-router';

export {
    createRouter,
    defaultListener,
}

/*
    * Main method for creating the Router object for the project
*/
function createRouter(routes: route[], repoName?: string, customListener?: () => void) {
    return new gpSpaRouter(routes, repoName, customListener);
}

/*
    * Default listener method that will be attached to the Window object
    * if there is no custom listener declared.
*/
function defaultListener(routerInstance: routerObject) {
    const currentWindowLocation = window.location;

    // Checking if the path was pushed as a hashed path: "#/path"
    const hashPath = currentWindowLocation.hash.replace("#/", "/")

    // Checking if the path was pushed as a normal path: "/path"
    const path = currentWindowLocation.pathname.replace(routerInstance.DEFAULT_HOST_PATH!, "")

    const navigationPath = hashPath || path;

    routerInstance.navigate(navigationPath);
}
