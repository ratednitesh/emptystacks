import { loginStatus } from "./manage-auth";
import { getUserPrivateData } from "./fetch-data";
import { EVENTS } from "./const";

const sideBar = document.querySelector('#sideBar');
const menuBtn = document.querySelector('#menu-btn');
let initSidebarStatus = false;
let initContentSidebarStatus = false;
function initSidebar() {
    initializeSidebarListeners();
    initSidebarStatus = true;

}
function initializeSidebarListeners() {
    menuBtn.onclick = () => {
        sideBar.classList.toggle('active');
        document.body.classList.toggle('active');

    }
}
function initializeContentSideBarListeners() {
    let subMenus = document.querySelectorAll(".sub-menu > a");
    subMenus.forEach(function (link) {
        link.addEventListener("click", function (e) {
            // Close all other sub-menus
            document.querySelectorAll(".sidebar .sub-menu ul").forEach(function (submenu) {
                if (submenu !== link.nextElementSibling) {
                    submenu.style.display = "none";
                }
            });
            // Toggle the visibility of the clicked sub-menu
            if (link.nextElementSibling.style.display == "" || link.nextElementSibling.style.display == "none") {
                link.nextElementSibling.style.display = "block";
            } else {
                link.nextElementSibling.style.display = "none";
            }

            // Prevent the click event from propagating up the DOM hierarchy
            e.stopPropagation();
        });
    });
    initContentSidebarStatus = true;
}
export function loadContentSidebar() {
    if (!initSidebarStatus)
        initSidebar();
    if (!initContentSidebarStatus)
        initializeContentSideBarListeners();
    sideBar.classList.add('active');
    document.body.classList.add('active');
}
export function loadMainSidebar() {
    if (!initSidebarStatus)
        initSidebar();
    sideBar.classList.remove('active');
    document.body.classList.remove('active');
    updateUserInfoOnSideBar(loginStatus());
}
export function updateUserInfoOnSideBar(isUserLoggedIn) {
    if (isUserLoggedIn)
        getUserPrivateData("zhcyWRZpJKZohfqSt6Xihyo4Awq2").then(
            (userPrivateData) => {
                sideBar.querySelector('#user-photo-sb').src = userPrivateData.userProfileSrc;
                sideBar.querySelector('#user-name-sb').innerHTML = userPrivateData.username;
                sideBar.querySelector('#user-role-sb').innerHTML = userPrivateData.role;

            }
        ).catch((e) => {
            console.error(e);
            publish(EVENTS.PUSH_POPUP_MESSAGE, ["FAILURE", "Something went wrong, unable to load side-bar profile."]);
        });
    else {
        sideBar.querySelector('#user-photo-sb').src = "/images/profile/guest-user.svg";
        sideBar.querySelector('#user-name-sb').innerHTML = 'Hello Guest!';
    }
}