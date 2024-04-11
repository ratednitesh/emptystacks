import { publish } from "./event-bus";
import { createNewUser, emailPasswordSignIn, firebaseSignOut, googleSignIn, isUserLoggedIn, tryPasswordResetEmail } from "./firebase-config";
import { pushPopupMessage } from "./helper";

let userLoggedIn;
export function initAuthentication() {
    userLoggedIn = isUserLoggedIn();
    console.log("user logged in status:" + userLoggedIn);
    publish('updateUserPrivateData', userLoggedIn);
}
export function signOut() {
    firebaseSignOut().then(() => {
        userLoggedIn = isUserLoggedIn();
        if (!userLoggedIn) {
            pushPopupMessage(["SUCCESS", "Logout successful!"]);
            publish('updateUserPrivateData', userLoggedIn);
            publish('updateQuickSelectOptions', userLoggedIn);
        } else {
            pushPopupMessage(["FAILURE", "Sign out Failed!"])
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
                publish('updateUserPrivateData', userLoggedIn);
                publish('updateQuickSelectOptions', userLoggedIn);
                pushPopupMessage(["SUCCESS", "Login successful!"])
            }
        }).catch(() => {
            pushPopupMessage(["FAILURE", "Sign In Failed!"])
        });
    } else if (provider == 'emailAddress') {
        emailPasswordSignIn(userToken).then(() => {
            userLoggedIn = isUserLoggedIn();
            if (userLoggedIn) {
                console.log("User Logged In");
                publish('loginSuccess');
                publish('updateUserPrivateData', userLoggedIn);
                publish('updateQuickSelectOptions', userLoggedIn);
                pushPopupMessage(["SUCCESS", "Login successful!"])
            }
        }).catch(() => {
            pushPopupMessage(["FAILURE", "Sign In Failed!"])
        });
    }
}

export function signUp(userToken) {
    createNewUser(userToken).then(() => {
        userLoggedIn = isUserLoggedIn();
        if (userLoggedIn) {
            console.log("User Logged In");
            publish('loginSuccess');
            publish('updateUserPrivateData', userLoggedIn);
            publish('updateQuickSelectOptions', userLoggedIn);
            pushPopupMessage(["SUCCESS", "Registration successful!"]);
            setTimeout(() => { pushPopupMessage(["SUCCESS", `A verification link is sent to ${userToken.email}`]) }, 5000);
        }
    }).catch(() => {
        pushPopupMessage(["FAILURE", "Registration Failed!"])
    });
}

export function forgotPassword(email) {
    tryPasswordResetEmail(email).then(
        () => { pushPopupMessage(["SUCCESS", "A password reset email has been sent!"]) }
    ).catch(() => {
        pushPopupMessage(["FAILURE", "Something went wrong, please try again later!"])
    });
}

export function loginStatus() {
    return userLoggedIn;
}