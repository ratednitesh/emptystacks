import { publish } from "./event-bus";

// sidebar routing 
let previousSideBarPath;
let previousMainBodyPath;
let mainSideBarVisible;

const routes = {
    404: "pages/not-found.html",
    "/": "pages/home.html",
    "/home": "pages/home.html",
    "/about": "pages/about.html",
    "/profile": "pages/profile.html",
    "/courses": "pages/courses.html",
    "/contact": "pages/contact.html",
    "/content": "pages/course-content.html",
    "/course": "pages/text-course.html",
    "/playlist": "pages/playlist.html",
    "/register": "pages/register.html",
    "/watch-video": "pages/watch-video.html",
    "/profile-update": "pages/update.html"
};

const SIDE_BAR_OPTIONS = {
    "NO-SIDEBAR": "", "MAIN-SIDEBAR": "pages/main-sidebar.html", "TEXT-SIDEBAR": "pages/text-sidebar.html"
};

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


function loadSideBarScripts(sidebarSelect) {
    if (sidebarSelect == "MAIN-SIDEBAR") {
        publish('loadMainSidebar');
    } else if (sidebarSelect == "TEXT-SIDEBAR") {
        publish('loadContentSidebar');
    }
}

function loadMainScripts(path) {
    if (path == "/content") {
        publish('unloadHome');
        publish('loadContentMainSection');
    }
    else if (path == "/course") {
        publish('unloadHome');
        publish('loadCourseDetails');
    } else if (path == "/" || path == "/home") {
        publish('loadHome');
    } else {
        publish('unloadHome');
    }
}

const handleLocation = async () => {
    const path = window.location.pathname;
    if (previousMainBodyPath != path) {
        previousMainBodyPath = path;
        const route = routes[path] || routes[404];
        const mainBody = await fetch(route).then((data) => data.text());
        document.getElementById("main-page").innerHTML = mainBody;
        loadMainScripts(path);
        var currentSidebar = ""; // TODO
        if (path == "/content") {
            currentSidebar = "TEXT-SIDEBAR";
        } else {
            if (mainSideBarVisible)
                currentSidebar = "MAIN-SIDEBAR";
            else
                currentSidebar = "NO-SIDEBAR";
        }
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
    previousSideBarPath = "";
    previousMainBodyPath = "";
    mainSideBarVisible = true;

    window.onpopstate = handleLocation;
    window.route = route;

    handleLocation();

}