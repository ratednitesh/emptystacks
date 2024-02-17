import { publish } from "./event-bus";

const routes = {
    "/": "/pages/home.html",
    "/home": "/pages/home.html",
    "/home/*": "/pages/home.html",
    "/about": "/pages/about.html",
    "/about/*": "/pages/about.html",
    "/courses": "/pages/courses.html",
    "/courses/*": "/pages/courses.html",
    "/contact": "/pages/contact.html",
    "/contact/*": "/pages/contact.html",
    "/profile-update": "/pages/update.html",
    "/profile-update/*": "/pages/update.html",
    "/register": "/pages/register.html",
    "/register/*": "/pages/register.html",

    "/course": "/pages/not-found.html",
    "/course/": "/pages/not-found.html",
    "/course/*": "/pages/text-course.html",


    "/content": "/pages/course-content.html",
    "/playlist": "/pages/playlist.html",
    "/watch-video": "/pages/watch-video.html",
    "/profile": "/pages/profile.html",
    404: "/pages/not-found.html"
};

const SIDE_BAR_OPTIONS = {
    "NO-SIDEBAR": "",
    "MAIN-SIDEBAR": "/pages/main-sidebar.html",
    "TEXT-SIDEBAR": "/pages/course-content-sidebar.html"
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

export function notFoundRoute(){
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
    if (matchCoursePath) {
        publish('unloadHome');
        publish('loadCourseDetails', matchCoursePath[1]);
    } else {
        switch (path) {
            case "/content":
                publish('unloadHome');
                publish('loadContentMainSection');
                break;
            case "/profile":
                publish('unloadHome');
                publish('loadProfile');
                break;
            case "/courses":
                publish('unloadHome');
                publish('loadCourses');
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
        const mainBody = await fetch(route).then((data) => data.text());
        document.getElementById("main-page").innerHTML = mainBody;
        
        loadMainScripts(path);
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