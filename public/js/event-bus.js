import { loadContentMainSection } from "./content";
import {  loadMainSidebar, updateUserPrivateData, loadContentSidebar, loginSuccess } from "./initial-load";
import { notFoundRoute } from "./router";

const eventListeners = {};
export function initEventBus() {
    subscribe('updateUserPrivateData', updateUserPrivateData);
    subscribe('loadContentSidebar', loadContentSidebar);
    subscribe('loadContentMainSection', loadContentMainSection);
    subscribe('loadMainSidebar', loadMainSidebar);
    subscribe('notFoundRoute', notFoundRoute);
    subscribe('loginSuccess', loginSuccess);
}
export function subscribe(eventName, callback) {
    if (!eventListeners[eventName])
        eventListeners[eventName] = [];
    eventListeners[eventName].push(callback);
}

export function publish(eventName, data) {
    if (eventListeners[eventName]) {
        eventListeners[eventName].forEach(callback => callback(data));
    }
}
