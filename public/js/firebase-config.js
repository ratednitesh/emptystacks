import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail ,sendEmailVerification} from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
// let user;

export function initFirebase() {
    // Login State Manangement 

    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                console.log('User Logged In');
                console.log(user);
                console.log(user.displayName);
                console.log(user.photoURL);
                

                // user = auth.currentUser;
            }
            else
                console.log('User "NOT" Logged In');
            resolve();
        });
    });
}
export function getAuthenticator() {
    return auth;
}

export function googleSignIn() {
    return new Promise((resolve, reject) => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                console.log('User Signed In with Google');

                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                resolve();
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                console.log('Error Sign In with Google');
                reject();
            });
    });
}

export function firebaseSignOut() {
    return new Promise((resolve, reject) => {
        auth.signOut().then(() => { resolve(); });
    });
}

export function isUserLoggedIn() {
    if (auth.currentUser)
        return true;
    else
        false;
}

export function createNewUser(userToken) {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, userToken.email, userToken.password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // ...
                console.log('Registration Successful.');
                sendEmailVerification(auth.currentUser)
                .then(() => {
                    console.log('Pwd vrf link Successful.');
                    resolve();
                  // Email verification sent!
                  // ...
                });
              
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode+ " "+errorMessage);
                // ..
                console.log('Error in Registration.');
                reject();
            });
    });
}
export function emailPasswordSignIn(userToken) {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, userToken.email, userToken.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                console.log('Sigin Successful.');
                resolve();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('Sigin Failed.');
                reject();
            });
    });
}

export function tryPasswordResetEmail(email){
    return new Promise((resolve, reject) => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
        console.log("Password reset link has been sent!")
        resolve();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Your email id is not found in our systems.');
      reject();
    });
});
}
