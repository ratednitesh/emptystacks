import { loadContentMainSection } from "./content-loader";
import { loadCourseDetails } from "./course-details-loader";
import {  loadMainSidebar, updateUserPrivateData, loadContentSidebar, loginSuccess } from "./initial-load";
import { loadHome, unloadHome, updateQuickSelectOptions } from "./home-loader";
import { initProfile } from "./profile";
import { notFoundRoute } from "./router";
import { EVENTS } from "./const";

const eventListeners = {};
export function initEventBus() {
    subscribe(EVENTS.UPDATE_USER_PRIVATE_DATA, updateUserPrivateData);
    subscribe(EVENTS.UPDATE_QUICK_SELECT_OPTIONS, updateQuickSelectOptions);
    subscribe(EVENTS.LOAD_HOME, loadHome);
    subscribe(EVENTS.UNLOAD_HOME, unloadHome);
    subscribe(EVENTS.LOAD_CONTENT_SIDEBAR, loadContentSidebar);
    subscribe(EVENTS.LOAD_CONTENT_MAIN_SECTION, loadContentMainSection);
    subscribe(EVENTS.LOAD_MAIN_SIDEBAR, loadMainSidebar);
    subscribe(EVENTS.LOAD_COURSE_DETAILS, loadCourseDetails);
    subscribe(EVENTS.INIT_PROFILE, initProfile);
    subscribe(EVENTS.NOT_FOUND_ROUTE, notFoundRoute);
    subscribe(EVENTS.LOGIN_SUCCESS, loginSuccess);
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
