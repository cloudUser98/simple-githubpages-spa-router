import { routerObject, route }  from './types/router-types'
//import CONFIG from "./../routerconfig.js";


export function catchLoadedRoute(window_location: string) {

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

    router.navigate(paths_to_load[0]);
}


// Revisar porque esta ruta funciona aunque fisicamente este niveles arriba
//fetch("./routerconfig.json") 
//    .then(response => response.json())
//    .then(object => {let test = object.DEFAULT_HOST_PATH})
//
// La idea de usar fetch esta deprecada pero seria interesante explorarla mas
// a fondo
//
class basicRouter implements routerObject {
    DEFAULT_HOST_PATH = "cloudUser98";
    // Example of route type object
    // {path: "/", pageRenderer: () => window.location.pathname = router.DEFAULT_HOST_PATH + "/"},
    routes = [] as route[];

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

        window.history.pushState({}, "", this.DEFAULT_HOST_PATH + route);
    
        // Executing the method that renders the page
        pageRenderer()
    }

    navigate(path: string) {
        console.log("navegando a ", path);
        const route = this.getRoute(path);
        this.load_route(route);
    }
}

// export const router:RouterObject = {
//     DEFAULT_HOST_PATH: CONFIG.DEFAULT_HOST_PATH,
//     routes: { 
//         "/": () => window.location.pathname = router.DEFAULT_HOST_PATH + "/",
//         "/404_not_found": page_404,
//         "/project_euler": project_euler,
//         "/curriculum": Curriculum,
//         "/study": study,
//         "/render-patterns": renderPatterns,
//     },
//     route: function(path: string) {
//         if (path in this.routes) return true
//     },
//     load_route: function(path: string, pageLoader: Function) {
//         // Change of the browsers path without reloading the page
//         //let location_paths = window.location.pathname;
//         //console.log("Paths before split: ", location_paths, location_paths.length);
//         //let paths_lol = location_paths.split("/");
//         //let paths = location_paths.split("/", 2);
// 
//         //let url_start = "";
//         // paths[1] && url_start = "/";    why this does not work?
//         //paths[1] && (url_start = "/");
// 
//         // let navigation_path = this.DEFAULT_HOST + "path";
// 
//         window.history.pushState({}, "", this.DEFAULT_HOST_PATH + path);
//     
//         // Executing the method that renders the page
//         pageLoader();
//     },
//     navigate: function(path: string) {
//         console.log("navegando a ", path);
//         if (path in this.routes) {
//            this.load_route(path, this.routes[path as keyof object]);
//         } else {
//             console.log("NO ENCONTRO LA PAGINA");
//             this.load_route("/404_not_found", page_404);
//         }
//     }
// }

window.addEventListener("hashchange", () => {
    let path = window.location.hash.replace("#", "")
    console.log("LOOOOOOOOOOL", path)

    // Preventing rendering of route if the path is a normal hash route
    if (path.includes("/")) router.navigate(path);
});
