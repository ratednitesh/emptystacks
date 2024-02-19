import { publish } from "./event-bus";
var cachedPages = {
    "home": null,
    "about": null,
    "contact": null,
    "profileUpdate": null,
    "register": null,
    "course": null,
    "content": null,
    "watchVideo": null,
    "profile": null,
    "notFound": null,
    // "mainSidebar": null,
    // "contentSidebar": null
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
    "/watch-video": "/pages/watchVideo.html",
    "/profile": "/pages/notFound.html",
    "/profile/": "/pages/notFound.html",
    "/profile/*": "/pages/profile.html",
    404: "/pages/notFound.html"
};

const SIDE_BAR_OPTIONS = {
    "NO-SIDEBAR": "",
    "MAIN-SIDEBAR": "/pages/mainSidebar.html",
    "TEXT-SIDEBAR": "/pages/contentSidebar.html"
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
    var MAX_TRY = 10;
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
function loadSideBarScripts(sidebarSelect) {
    if (sidebarSelect == "MAIN-SIDEBAR") {
        publish('loadMainSidebar');
    } else if (sidebarSelect == "TEXT-SIDEBAR") {
        publish('loadContentSidebar');
    }
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
        var mainBody;
        if (cachedPages[match]) {
            console.log("********* Loaded from cache ******\n" + match);
        }
        else {
            mainBody = await fetch(route).then((data) => data.text());
            cachedPages[match] = true;
            document.getElementById(match).innerHTML = mainBody;
            loadMainScripts(path);
        }
        for (let key in cachedPages) document.getElementById(key).style.display = (key === match) ? "block" : "none";

        const currentSidebar = path === "/content" ? "TEXT-SIDEBAR" : (mainSideBarVisible ? "MAIN-SIDEBAR" : "NO-SIDEBAR");
        if (previousSideBarPath != currentSidebar) {
            previousSideBarPath = currentSidebar;
            if (currentSidebar == "NO-SIDEBAR") {
                publish('unloadSideBar');
            } else {
                const sidebarRoute = SIDE_BAR_OPTIONS[currentSidebar];
                const sidebarBody = await fetch(sidebarRoute).then((data) => data.text());
                document.getElementById("side-bar").innerHTML = sidebarBody;
                loadSideBarScripts(currentSidebar);
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
    // Check if the path matches any route in the routes object
    const matchingRoute = Object.keys(routes).find(route => {
        if (route.endsWith("*")) {
            // Handle routes with additional segments
            const prefix = route.slice(0, -1); // Remove the wildcard '*'
            return path.startsWith(prefix);
        } else {
            // Handle exact match routes
            return route === path;
        }
    });
    // Return the matching route or the default 404 route
    return routes[matchingRoute] || routes[404];
}