import { loadContentMainSection, loadContentSidebar } from "./content-loader";
import { loadCourseDetails } from "./course-details-loader";
import { updateProfileMenu } from "./header";
import { loadHome, loadMainSidebar, unloadHome, unloadSideBar } from "./home-loader";
import { signOut } from "./manage-auth";

const eventListeners = {};
export function initEventBus() {
    subscribe('signOut', signOut);
    subscribe('updateProfileMenu', updateProfileMenu);
    subscribe('loadHome', loadHome);
    subscribe('unloadHome', unloadHome);
    subscribe('loadContentSidebar', loadContentSidebar);
    subscribe('loadContentMainSection', loadContentMainSection);
    subscribe('loadMainSidebar', loadMainSidebar);
    subscribe('unloadSideBar', unloadSideBar);
    subscribe('loadCourseDetails', loadCourseDetails);
}
export function subscribe(eventName, callback) {
    if (!eventListeners[eventName]) {
        eventListeners[eventName] = [];
    }
    eventListeners[eventName].push(callback);
}

export function publish(eventName, data) {
    if (eventListeners[eventName]) {
        eventListeners[eventName].forEach(callback => callback(data));
    }
}
