import { publish } from "./event-bus";
import { createNewUser, emailPasswordSignIn, firebaseSignOut, googleSignIn, isUserLoggedIn, tryPasswordResetEmail } from "./firebase-config";
import { EVENTS } from "./const";

let userLoggedIn;
export function initAuthentication() {
    userLoggedIn = isUserLoggedIn();
    console.log("user logged in status:" + userLoggedIn);
    publish('updateProfileMenu', userLoggedIn);
}
export function signOut() {
    firebaseSignOut().then(() => {
        userLoggedIn = isUserLoggedIn();
        if (!userLoggedIn) {
            publish(EVENTS.PUSH_POPUP_MESSAGE, ["SUCCESS", "Logout successful!"]);
            publish('updateProfileMenu', userLoggedIn);
            publish('updateUserInfoOnSideBar', userLoggedIn);
            publish('updateQuickSelectOptions', userLoggedIn);
        } else {
            publish(EVENTS.PUSH_POPUP_MESSAGE, ["FAILURE", "Sign out Failed!"])
        }
    });
}

export function signIn(provider, userToken) {
    if (provider == 'Google') {
        googleSignIn().then(() => {
            userLoggedIn = isUserLoggedIn();
            if (userLoggedIn) {
                console.log("User Logged In");
                publish('loginSuccess');
                publish('updateProfileMenu', userLoggedIn);
                publish('updateUserInfoOnSideBar', userLoggedIn);
                publish('updateQuickSelectOptions', userLoggedIn);
                publish(EVENTS.PUSH_POPUP_MESSAGE, ["SUCCESS", "Login successful!"])
            }
        }).catch(() => {
            publish(EVENTS.PUSH_POPUP_MESSAGE, ["FAILURE", "Sign In Failed!"])
        });
    } else if (provider == 'emailAddress') {
        emailPasswordSignIn(userToken).then(() => {
            userLoggedIn = isUserLoggedIn();
            if (userLoggedIn) {
                console.log("User Logged In");
                publish('loginSuccess');
                publish('updateProfileMenu', userLoggedIn);
                publish('updateUserInfoOnSideBar', userLoggedIn);
                publish('updateQuickSelectOptions', userLoggedIn);
                publish(EVENTS.PUSH_POPUP_MESSAGE, ["SUCCESS", "Login successful!"])
            }
        }).catch(() => {
            publish(EVENTS.PUSH_POPUP_MESSAGE, ["FAILURE", "Sign In Failed!"])
        });
    }
}

export function signUp(userToken) {
    createNewUser(userToken).then(() => {
        userLoggedIn = isUserLoggedIn();
        if (userLoggedIn) {
            console.log("User Logged In");
            publish('loginSuccess');
            publish('updateProfileMenu', userLoggedIn);
            publish('updateUserInfoOnSideBar', userLoggedIn);
            publish('updateQuickSelectOptions', userLoggedIn);
            publish(EVENTS.PUSH_POPUP_MESSAGE, ["SUCCESS", "Registration successful!"]);
            setTimeout(() => { publish(EVENTS.PUSH_POPUP_MESSAGE, ["SUCCESS", `A verification link is sent to ${userToken.email}`]) }, 5000);
        }
    }).catch(() => {
        publish(EVENTS.PUSH_POPUP_MESSAGE, ["FAILURE", "Registration Failed!"])
    });
}

export function forgotPassword(email) {
    tryPasswordResetEmail(email).then(
        () => { publish(EVENTS.PUSH_POPUP_MESSAGE, ["SUCCESS", "A password reset email has been sent!"]) }
    ).catch(() => {
        publish(EVENTS.PUSH_POPUP_MESSAGE, ["FAILURE", "Something went wrong, please try again later!"])
    });
}

export function loginStatus() {
    return userLoggedIn;
}