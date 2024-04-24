import { publish } from "./event-bus";
import { initAddOn } from "./dependecny-loader";

const filePathPrefix = "/pages/";
const filePathSuffix = ".html";
const routes = {
    "/": "home",
    "/home": "home",
    "/home/*": "home",
    "/about": "about",
    "/about/*": "about",
    "/courses": "home",
    "/courses/*": "home",
    "/contact": "contact",
    "/contact/*": "contact",
    "/profile-update": "profileUpdate",
    "/profile-update/*": "profileUpdate",
    "/register": "register",
    "/register/*": "register",
    "/course": "notFound",
    "/course/": "notFound",
    "/course/*": "course",
    "/content": "notFound",
    "/content/": "notFound",
    "/content/*": "content",
    "/profile": "notFound",
    "/profile/": "notFound",
    "/profile/*": "profile",
    404: "notFound"
};
const SIDE_BAR_OPTIONS = {
    "mainSidebar": "mainSidebar",
    "contentSidebar": "contentSidebar"
};
let cachedPages = {};
let cachedSideBar = { "mainSidebar": true };
let previousSideBarPath = "";
let previousMainBodyPath = "";

export function initRouter() {
    window.onpopstate = handleLocation;
    window.route = route;
    handleLocation();
}
// main page routing
const route = (event) => {
    event = event || window.event;
    event.preventDefault();
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

const handleLocation = async () => {
    const path = window.location.pathname;
    if (previousMainBodyPath != path) {
        previousMainBodyPath = path;
        const route = findMatchingRoute(path);
        if (!cachedPages[route]) {
            await initAddOn(route);
            console.log('loaded additional js files');
            const mainBody = await fetch(filePathPrefix + route + filePathSuffix).then((data) => data.text());
            cachedPages[route] = true;
            document.getElementById(route).innerHTML = mainBody;
        }
        for (let key in cachedPages) document.getElementById(key).style.display = (key === route) ? "block" : "none";
        loadMainScripts(path);
        const currentSidebar = route === "content" ? "contentSidebar" : "mainSidebar";
        if (previousSideBarPath != currentSidebar) {
            previousSideBarPath = currentSidebar;
            if (!cachedSideBar[currentSidebar]) {
                const sidebarRoute = SIDE_BAR_OPTIONS[currentSidebar];
                const sidebarBody = await fetch(filePathPrefix + sidebarRoute + filePathSuffix).then((data) => data.text());
                document.getElementById(currentSidebar).innerHTML = sidebarBody;
                cachedSideBar[currentSidebar] = true;
            }
            for (let key in cachedSideBar) document.getElementById(key).style.display = (key === currentSidebar) ? "block" : "none";
            publish(currentSidebar == "mainSidebar" ? "loadMainSidebar" : "loadContentSidebar");
        }
    }
};
function loadMainScripts(path) {
    const matchCoursePath = path.match(/^\/course\/(\w+)$/);
    const matchProfilepath = path.match(/^\/profile\/(\w+)$/);
    const matchContentpath = path.match(/^\/content\/(\w+)$/);

    if (matchCoursePath) {
        publish('unloadHome');
        publish('loadCourseDetails', matchCoursePath[1]);
    } else if (matchProfilepath) {
        publish('unloadHome');
        publish('initProfile', matchProfilepath[1]);
    } else if (matchContentpath) {
        publish('unloadHome');
        publish('loadCourseContent', matchContentpath[1]);
    } else {
        switch (path) {
            case "/courses":
                publish('loadHome', 'only-course');
                break;
            case "/":
            case "/home":
                publish('unloadHome');
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