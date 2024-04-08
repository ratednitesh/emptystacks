import { loadContentMainSection } from "./content-loader";
import { loadCourseDetails } from "./course-details-loader";
import { closeMenuOptions, removeMenuOptions, updateProfileMenu } from "./header";
import { loadHome, unloadHome, updateQuickSelectOptions } from "./home-loader";
import { signOut } from "./manage-auth";
import { pushPopupMessage } from "./popup-message";
import { initProfile } from "./profile";
import { notFoundRoute } from "./router";
import { closeModal, escModal, loginSuccess } from "./user-auth-modal";
import { loadContentSidebar, loadMainSidebar, updateUserInfoOnSideBar } from "./sidebar";
import { EVENTS } from "./const";

const eventListeners = {};
export function initEventBus() {
    subscribe(EVENTS.SIGNOUT, signOut);
    subscribe(EVENTS.UPDATE_PROFILE_MENU, updateProfileMenu);
    subscribe(EVENTS.UPDATE_QUICK_SELECT_OPTIONS, updateQuickSelectOptions);
    subscribe(EVENTS.LOAD_HOME, loadHome);
    subscribe(EVENTS.UNLOAD_HOME, unloadHome);
    subscribe(EVENTS.LOAD_CONTENT_SIDEBAR, loadContentSidebar);
    subscribe(EVENTS.LOAD_CONTENT_MAIN_SECTION, loadContentMainSection);
    subscribe(EVENTS.LOAD_MAIN_SIDEBAR, loadMainSidebar);
    subscribe(EVENTS.LOAD_COURSE_DETAILS, loadCourseDetails);
    subscribe(EVENTS.INIT_PROFILE, initProfile);
    subscribe(EVENTS.NOT_FOUND_ROUTE, notFoundRoute);
    subscribe(EVENTS.GLOBAL_CLICK_EVENT, closeModal);
    subscribe(EVENTS.LOGIN_SUCCESS, loginSuccess);
    subscribe(EVENTS.GLOBAL_KEY_EVENT, escModal);
    subscribe(EVENTS.GLOBAL_CLICK_EVENT, closeMenuOptions);
    subscribe(EVENTS.REMOVE_MENU_OPTIONS, removeMenuOptions);
    subscribe(EVENTS.PUSH_POPUP_MESSAGE, pushPopupMessage);
    subscribe(EVENTS.UPDATE_USER_INFO_ON_SIDEBAR, updateUserInfoOnSideBar);
}
function subscribe(eventName, callback) {
    if (!eventListeners[eventName])
        eventListeners[eventName] = [];
    eventListeners[eventName].push(callback);
}

export function publish(eventName, data) {
    if (eventListeners[eventName]) {
        eventListeners[eventName].forEach(callback => callback(data));
    }
}
