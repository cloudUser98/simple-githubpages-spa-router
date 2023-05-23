// Porque me deja importar con esa direccion
import {routerObject, routerInterface, route } from '../index'
import { baseRouter, gpSpaRouter } from '../modules/gh-spa-router';

export {
    createRouter,
    defaultListener,
}

function createRouter(routes: route[], repoName?: string, customListener?: () => void) {
    console.log("creating a route");
    return new gpSpaRouter(routes, repoName, customListener);
}

/*
    * Default listener method that will be attached to the Window object
    * if there is no custom listener declared.
*/

function defaultListener(routerInstance: routerObject) {
    let path = window.location.hash.replace("#", "")

    console.log("catcech path: ", path);
    if (path.includes("/")) routerInstance.navigate(path);
}

function home(routerInstance: routerObject) {
}
