import { publish } from "./event-bus";
var cachedPages = {
    "home": null,
    "about": null,
    "contact": null,
    "profileUpdate": null,
    "register": null,
    "course": null,
    "content": null,
    "profile": null,
    "notFound": null,
};
var cachedSideBar = {
    "mainSidebar": null,
    "contentSidebar": null,
};
const routes = {
    "/": "/pages/home.html",
    "/home": "/pages/home.html",
    "/home/*": "/pages/home.html",
    "/about": "/pages/about.html",
    "/about/*": "/pages/about.html",
    "/courses": "/pages/home.html",
    "/courses/*": "/pages/home.html",
    "/contact": "/pages/contact.html",
    "/contact/*": "/pages/contact.html",
    "/profile-update": "/pages/profileUpdate.html",
    "/profile-update/*": "/pages/profileUpdate.html",
    "/register": "/pages/register.html",
    "/register/*": "/pages/register.html",
    "/course": "/pages/notFound.html",
    "/course/": "/pages/notFound.html",
    "/course/*": "/pages/course.html",
    "/content": "/pages/content.html",
    "/content/*": "/pages/content.html",
    "/profile": "/pages/notFound.html",
    "/profile/": "/pages/notFound.html",
    "/profile/*": "/pages/profile.html",
    404: "/pages/notFound.html"
};

const SIDE_BAR_OPTIONS = {
    "noSidebar": "",
    "mainSidebar": "/pages/mainSidebar.html",
    "contentSidebar": "/pages/contentSidebar.html"
};

let previousSideBarPath = "";
let previousMainBodyPath = "";
let mainSideBarVisible = true;

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


function loadMainScripts(path) {
    const matchCoursePath = path.match(/^\/course\/(\w+)$/);
    const matchProfilepath = path.match(/^\/profile\/(\w+)$/);

    if (matchCoursePath) {
        publish('unloadHome');
        publish('loadCourseDetails', matchCoursePath[1]);
    } else if (matchProfilepath) {
        publish('unloadHome');
        publish('loadProfile', matchProfilepath[1]);
    } else {
        switch (path) {
            case "/content":
                publish('unloadHome');
                publish('loadContentMainSection');
                break;
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

const handleLocation = async () => {
    const path = window.location.pathname;
    if (previousMainBodyPath != path) {
        previousMainBodyPath = path;
        const route = findMatchingRoute(path);
        var regex = /^\/pages\/([^\/]+)\.html$/;
        var match = regex.exec(route)[1];
        if (!cachedPages[match]) {
            const mainBody = await fetch(route).then((data) => data.text());
            cachedPages[match] = true;
            document.getElementById(match).innerHTML = mainBody;
        }
        for (let key in cachedPages) document.getElementById(key).style.display = (key === match) ? "block" : "none";
        loadMainScripts(path);
        const currentSidebar = path === "/content" ? "contentSidebar" : (mainSideBarVisible ? "mainSidebar" : "noSidebar");
        if (previousSideBarPath != currentSidebar) {
            previousSideBarPath = currentSidebar;
            if (currentSidebar == "noSidebar") {
                publish('unloadSideBar');
            } else {
                if (!cachedSideBar[currentSidebar]) {
                    const sidebarRoute = SIDE_BAR_OPTIONS[currentSidebar];
                    const sidebarBody = await fetch(sidebarRoute).then((data) => data.text());
                    document.getElementById(currentSidebar).innerHTML = sidebarBody;
                    cachedSideBar[currentSidebar] = true;
                }
                for (let key in cachedSideBar) document.getElementById(key).style.display = (key === currentSidebar) ? "block" : "none";
                publish(currentSidebar == "mainSidebar" ? "loadMainSidebar" : "loadContentSidebar");
            }
        }
    }
};
export function initRouter() {
    window.onpopstate = handleLocation;
    window.route = route;
    handleLocation();
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