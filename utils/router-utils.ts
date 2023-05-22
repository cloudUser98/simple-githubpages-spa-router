// Porque me deja importar con esa direccion
import {routerObject, route} from '../index'
import { baseRouter, gpSpaRouter } from 'gh-spa-router';

export {
    createRouter,
    defaultListener,
    catchLoadedRoute,
}

function createRouter(routes: route[], hostPath?: string, customListener?: () => void) {
    return new gpSpaRouter(routes, hostPath, customListener);
}

function defaultListener() {
    let path = window.location.hash.replace("#", "")

    //if (path.includes("/")) this.router.navigate(path);
}

function catchLoadedRoute(window_location: string) {

    // Revisar porque url = url.split("?"); da error

    // Getting the requested path for the page load
    // by splitting the browser's URL and getting the values after the "?" symbol
    let url = window_location.split("?")[1];

    console.log("requested paths: ", url);

    if (!url) return; // if there is no "?" symbol in the URL the page won't be loaded

    let paths_to_load: Array<string> = [];
    let path: string = "";

    for (let i: number = 0; i < url.length; i++) {
        let char = url.charAt(i);
        let next_char = url.charAt(i+1);
        char === "/" ? path = "/" : path += char;
        console.log("path: ", path, " and the next character is: ", next_char);

        if (next_char === "/" || next_char === '') paths_to_load.push(path);
    }

    console.log("Array of paths to load: ", paths_to_load);

    //this.navigate(paths_to_load[0]);
}
