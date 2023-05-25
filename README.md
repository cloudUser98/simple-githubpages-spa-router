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

## Usage

You can install the library as a npm package with the next command:
```
$ npm install simple-githubpages-spa-router
```

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
