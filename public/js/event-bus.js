import { notFoundRoute } from "./router";

const eventListeners = {};
export function initEventBus() {
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
