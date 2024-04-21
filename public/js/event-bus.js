import { loadContentMainSection } from "./content";
import { loadMainSidebar, loadContentSidebar } from "./setup";
import { notFoundRoute } from "./router";

const eventListeners = {};
export function initEventBus() {
    subscribe('loadContentSidebar', loadContentSidebar);
    subscribe('loadContentMainSection', loadContentMainSection);
    subscribe('loadMainSidebar', loadMainSidebar);
    subscribe('notFoundRoute', notFoundRoute);
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
