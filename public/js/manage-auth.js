import { publish } from "./event-bus";
import { createNewUser, emailPasswordSignIn, firebaseSignOut, googleSignIn, isUserLoggedIn } from "./firebase-config";

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
            publish('pushPopupMessage', ["SUCCESS", "Logout successful!"]);
            publish('updateProfileMenu', userLoggedIn);
        } else {
            publish('pushPopupMessage', ["FAILURE", "Sign out Failed!"])
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
                publish('pushPopupMessage', ["SUCCESS", "Login successful!"])
            }
        }).catch(() => {
            publish('pushPopupMessage', ["FAILURE", "Sign In Failed!"])

        });
    }else if(provider=='emailAddress'){
        emailPasswordSignIn(userToken).then(() => {
            userLoggedIn = isUserLoggedIn();
            if (userLoggedIn) {
                console.log("User Logged In");
                publish('loginSuccess');
                publish('updateProfileMenu', userLoggedIn);
                publish('pushPopupMessage', ["SUCCESS", "Login successful!"])
            }
        }).catch(() => {
            publish('pushPopupMessage', ["FAILURE", "Sign In Failed!"])

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
            publish('pushPopupMessage', ["SUCCESS", "Registration successful!"])
        }
    }).catch(() => {
        publish('pushPopupMessage', ["FAILURE", "Sign In Failed!"])
    });
}

