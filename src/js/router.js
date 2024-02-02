// sidebar routing 
let selectedSidebar = "";
let previousLocation = "";
const mainSideBarVisible = false; 

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
    var newRoute = event.target.href;
    var MAX_TRY = 10;
    while (newRoute == undefined && MAX_TRY > 0) {
        newRoute = event.target.parentElement.href;
        MAX_TRY--;
    }
    window.history.pushState({}, "", newRoute);
    handleLocation();
};


function loadSideBarScripts(sidebarSelect) {
    if (sidebarSelect == "MAIN-SIDEBAR") {
      
        loadMainSidebar();
    } else if (sidebarSelect == "TEXT-SIDEBAR") {
        loadContentSidebar();
    }
}

function loadMainScripts(path) {
    if (path == "/content") {
        unloadHome();
        loadContentMainSection();
    }
    else if (path == "/course") {
        unloadHome();
        loadCourseDetails();
    } else if(path=="/" || path =="/home"){
        loadHome();
    }else{
        unloadHome();
    }
}

const handleLocation = async () => {
    const path = window.location.pathname;
    if (previousLocation != path) {
        previousLocation = path;
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
        if (selectedSidebar != currentSidebar) {
            selectedSidebar = currentSidebar;
            if (currentSidebar == "NO-SIDEBAR" ){
                unloadSideBar();
            } else {
                const sidebarRoute = SIDE_BAR_OPTIONS[currentSidebar];
                const sidebarBody = await fetch(sidebarRoute).then((data) => data.text());
                document.getElementById("side-bar").innerHTML = sidebarBody;
                loadSideBarScripts(currentSidebar);
            }
        }
    }
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
