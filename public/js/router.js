import { initAddOn, subscribe, publish, copyToClipboard } from "./helper";
import { removeMenuOptions } from "./setup";
import { modifyDisabledClass } from "./ui-services";

// const variables
const filePathPrefix = "/pages/";
const filePathSuffix = ".html";
const routes = {
    "/": "home",
    "/about": "about",
    "/about/*": "about",
    "/courses": "home",
    "/courses/*": "home",
    "/contact": "contact",
    "/contact/*": "contact",
    "/course": "notFound",
    "/course/": "notFound",
    "/course/*": "course",
    "/content": "notFound",
    "/content/": "notFound",
    "/content/*": "content",
    "/profile": "notFound",
    "/profile/": "notFound",
    "/profile/*": "profile",
    "/my-courses": "profile",
    "/my-courses/*": "profile",
    "/streams": "streams",
    "/streams/": "streams",
    "/streams/*": "streams",
    "/builder": "builder",
    "/builder/": "builder",
    "/builder/*": "builder",
    "/private-course": "notFound",
    "/private-course/": "notFound",
    "/private-course/*": "privateCourse",
    404: "notFound"
};
const sideBar = document.querySelector('#sideBar');

let cachedPages = { "search": true };
let previousSideBarPath = "";
let previousMainBodyPath = "";

export function initRouter() {
    subscribe('notFoundRoute', notFoundRoute);
    window.onpopstate = handleLocation;
    window.route = route;
    handleLocation();
}
// main page routing
const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    removeMenuOptions();
    var element = event.target;
    var newRoute = element.href;
    var MAX_TRY = 5;
    while (newRoute == undefined && MAX_TRY > 0) {
        newRoute = element.parentElement.href;
        element = element.parentElement;
        MAX_TRY--;
    }
    window.history.pushState({}, "", newRoute);
    handleLocation();
};

export function notFoundRoute() {
    window.history.pushState({}, "", "/404");
    handleLocation();
}
export function routeTo(path, subpath){
    window.history.pushState({}, "", "/"+path +"/"+subpath);
    handleLocation();
}
const handleLocation = async () => {
    const path = window.location.pathname;
    if (previousMainBodyPath != path) {
        previousMainBodyPath = path;
        const route = findMatchingRoute(path);
        if (!cachedPages[route]) {
            const mainBody = await fetch(filePathPrefix + route + filePathSuffix).then((data) => data.text());
            cachedPages[route] = true;
            document.getElementById(route).innerHTML = mainBody;
            await initAddOn(route);
        }
        for (let key in cachedPages) document.getElementById(key).classList.toggle('disabled', key !== route);
        loadMainScripts(path);
        const currentSidebar = route === "content" ? "contentSidebar" : "mainSidebar";
        if (previousSideBarPath != currentSidebar) {
            previousSideBarPath = currentSidebar;
            if (currentSidebar == "mainSidebar") {
                modifyDisabledClass(document.getElementById('mainSidebar'), 0);
                modifyDisabledClass(document.getElementById('contentSidebar'), 1);
                sideBar.classList.remove('active');
                document.body.classList.remove('active');
            }
            else {
                modifyDisabledClass(document.getElementById('mainSidebar'), 1);
                modifyDisabledClass(document.getElementById('contentSidebar'), 0);
                sideBar.classList.add('active');
                document.body.classList.add('active');
            };
        }

    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
function loadMainScripts(path) {
    const matchCoursePath = path.match(/^\/course\/([\w/-]+)$/);
    const matchProfilepath = path.match(/^\/profile\/([\w/-]+)$/);
    const matchContentpath = path.match(/^\/content\/([\w/-]+)$/);
    const matchStreamspath = path.match(/^\/streams\/([\w/-]+)$/);
    const matchPrivateCoursePath = path.match(/^\/private-course\/([\w/-]+)$/);
    if (matchCoursePath) {
        publish('unloadHome');
        publish('loadCoursePage', matchCoursePath[1]);
    } else if (matchProfilepath) {
        publish('unloadHome');
        publish('loadProfile', matchProfilepath[1]);
    } else if (matchContentpath) {
        publish('unloadHome');
        publish('loadContent', matchContentpath[1]);
    } else if (matchStreamspath) {
        publish('unloadHome');
        publish('loadStreams', matchStreamspath[1]);
    }else if (matchPrivateCoursePath) {
        publish('unloadHome');
        publish('loadPrivateCourse', matchPrivateCoursePath[1]);
    } else {
        switch (path) {
            case "/courses":
                publish('loadHome', 'only-course');
                break;
            case "/my-courses":
                publish('unloadHome');
                publish('loadMyCourses');
                break;
            case "/builder":
                publish('unloadHome');
                publish('loadBuilder');
                break;
            case "/":
                publish('loadHome');
                break;
            default:
                publish('unloadHome');
        }
    }
}

function findMatchingRoute(path) {
    const matchingRoute = Object.keys(routes).find(route => {
        if (route.endsWith("*")) {
            const prefix = route.slice(0, -1); // Remove the wildcard '*'
            return path.startsWith(prefix);
        } else {
            return route === path;
        }
    });
    return routes[matchingRoute] || routes[404];
}

export function copyPathToClipboard() {
    copyToClipboard("www.emptystacks.com" + previousMainBodyPath);
}