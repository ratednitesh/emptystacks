import { loadContentMainSection, loadContentSidebar } from "./content-loader";
import { loadCourseDetails } from "./course-details-loader";
import { closeMenuOptions, removeMenuOptions, updateProfileMenu } from "./header";
import { loadHome, loadMainSidebar, unloadHome, unloadSideBar, updateQuickSelectOptions } from "./home-loader";
import { signOut } from "./manage-auth";
import { pushPopupMessage } from "./popup-message";
import { closeModal, escModal, loginSuccess } from "./user-auth-modal";

const eventListeners = {};
export function initEventBus() {
    subscribe('signOut', signOut);
    subscribe('updateProfileMenu', updateProfileMenu);
    subscribe('updateQuickSelectOptions', updateQuickSelectOptions);
    subscribe('loadHome', loadHome);
    subscribe('unloadHome', unloadHome);
    subscribe('loadContentSidebar', loadContentSidebar);
    subscribe('loadContentMainSection', loadContentMainSection);
    subscribe('loadMainSidebar', loadMainSidebar);
    subscribe('unloadSideBar', unloadSideBar);
    subscribe('loadCourseDetails', loadCourseDetails);
    // subscribe('signIn',signIn);
    subscribe('globalClickEvent',closeModal);
    subscribe('loginSuccess',loginSuccess);
    subscribe('globalKeyEvent',escModal);
    subscribe('globalClickEvent',closeMenuOptions);
    subscribe('removeMenuOptions',removeMenuOptions);
    subscribe('pushPopupMessage',pushPopupMessage);
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
