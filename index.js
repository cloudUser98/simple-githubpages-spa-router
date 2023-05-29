import { createRouter } from 'simple-githubpages-spa-router'

const router = createRouter([
    {path: '/about', pageRenderer: about},
    {path: '/repository', pageRenderer: repository},
], 'cloudUser98-devlog');

const root = document.getElementById("root");

function about() {
    root.innerHTML = `
        <p>
            This is a demo page to showcase the basic use of the router.
        </p>
        <a href="#/">Main page</a>
    `
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
    `
}