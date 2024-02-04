import { publish } from "./event-bus";

let userLoggedIn;
export function initAuthentication(){
    userLoggedIn = true; //TODO: Dummy Input | Remove this line later
    userLoggedIn = isUserLoggedIn();
    publish('updateProfileMenu',userLoggedIn);
}
export function signOut() {
    userLoggedIn = false;
    publish('updateProfileMenu',userLoggedIn);
}
export function isUserLoggedIn(){
    return userLoggedIn;
}

