# simple-githubpages-spa-router
Simple web router for SPA hosted in Github Pages

## Disclaimer
__Im not by any means an experienced web developer__, this repository started as a 
side project while developing my personal Devlog web page with Github Pages. 

Im using this side project for personal studying purposes only.

__Topics im studying with this project:__
- Typescript (the basics)
- Library development with typescript
- Manipulation of the Window __Location__ and __History__ properties with Javascript
- The basics of how SPA's could work under the hood
- Client side rendering ideas

## Any comments are completely welcome, I am passionate about always learning new things

## About
This is a simple web router written in Typescript that can help you if you are 
trying to build a simple SPA using Github Pages as your hosting service.

## Requirements
+ Rollup or any other bundler or library that let you resolve Node modules imports in the client side when building your project

## Usage

+ [Installation](#installation)
+ [createRouter()](#createrouter)
+ [Basic implementation](#basic-implementation)

### Installation

You can install the library as a npm package with the next command:
```
$ npm install simple-githubpages-spa-router
```
### createRouter()

#### Parameters:

##### __routes__
Array of the routes defined for the project.

For more information on creating routes please use [this example](#creating-routes).

##### __repoName__
Name of the page repository, this parameter is optional and you can define it only if your github page does not count with a custom domain and it is using the defatult one, example: github.io/repoName/

##### __customListener__
Optional custom method that will be attached to the listener for the event "popstate" from the window element.
If not defined the router will use the default listener method.

### Creating routes

A route is represented as an object with the following structure:

```javascript
// Render method example
function renderAbout() {
    body = document.getElementById("body");
    
    body!.innterHTML = `<h1> About </h1>`;
}

var route = { "/about", renderAbout }
```

### Basic implementation

Import the module in your main javascript file and use the method __createRouter()__ to initialize a new gpSpaRouter instance to use in your project.

```javascript
// index.js
import renderMethod1 from "./first_module";
import renderMethod2 from "./second_module";

import { createRouter } from "simple-githubpages-spa-router";

let router = createRouter([
    {path: "/first_path", pageRenderer: renderMethod1},
    {path: "/second_path", pageRenderer: renderMethod2},
]);
```
