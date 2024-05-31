import { initializeApp } from 'firebase/app';
import { getFirestore, orderBy } from 'firebase/firestore/lite';
import { doc, setDoc, getDoc, deleteField, updateDoc, query, where, getDocs, increment, arrayUnion, collection, addDoc, limit } from "firebase/firestore/lite";

import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification, updateProfile } from "firebase/auth";

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

// INITIALIZATION
export async function initFirebase() {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                console.log('User Logged In');
                console.log(user);
            }
            else {
                console.log('User "NOT" Logged In');
            }
            resolve();
        });
    });
}

/*** AUTHENTICATION ***/

// Sign Up
export async function createNewUser(userToken) {
    try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, userToken.email, userToken.password);
        const user = userCredential.user;

        // Update the user's profile to include the username
        await updateProfile(user, {
            displayName: userToken.username,
            photoURL: "/images/profile/no-photo.svg"
        });
        // Send email verification
        await sendEmailVerification(auth.currentUser);
        console.log('User created and email verification sent.');

        // Create User Profile / Document
        if (!await readDocument("UsersPrivate", user.uid)) {
            await createUserProfile(user);
        }
    } catch (error) {
        console.log(error.code + " " + error.Message);
        console.error('Error in Registration.');
        throw error; // Ensure the error is propagated to the caller
    }
}

// Google Sign In
export async function googleSignIn() {
    try {
        const userCredential = await signInWithPopup(auth, googleProvider);
        console.log('User Signed In with Google');
        const credential = GoogleAuthProvider.credentialFromResult(userCredential);
        // const token = credential.accessToken;
        const user = userCredential.user;
        if (!await readDocument("UsersPrivate", user.uid)) {
            console.log('user not registered. Create user private / public docs' + user.uid)
            await createUserProfile(user);
        }
    } catch (error) {
        console.log(error);
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error('Error Sign In with Google' + credential);
        throw error;
    }
}

// Sign In
export async function emailPasswordSignIn(userToken) {
    try {
        await signInWithEmailAndPassword(auth, userToken.email, userToken.password);
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Sigin Failed.');
        throw error;
    }
}

// Password Reset
export async function tryPasswordResetEmail(email) {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Your email id is not found in our systems.');
        throw error;
    }
}

// Sign Out
export async function firebaseSignOut() {
    try {
        await auth.signOut();
    } catch (error) {
        console.error("Error Sign Out" + error);
        throw error;
    }
}

/***  Firestore CRUD APIs ****/
// CREATE 
export async function createDocument(collectionName, id, data, mergeStatus) {
    try {
        // use merge : true if want to create new doc if not already present.
        await setDoc(doc(db, collectionName, id), data, { merge: mergeStatus });
        console.log(`Document: ${collectionName} with id: ${id} added.`);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function addDocument(collectionName, data) {
    try {
        // use merge : true if want to create new doc if not already present.
        console.log(data);
        await addDoc(collection(db, collectionName), data);
        console.log(`Document: ${collectionName} added.`);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// READ
export async function readDocument(collectionName, id) {
    try {
        const docRef = doc(db, collectionName, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            return docSnap.data();
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
            return false;
        }
    } catch (e) {
        console.error("Error updating document: ", e);
        throw e;
    }
}

// READ MULTIPLE
// export async function readDocuments(collectionName, queryString) {
//     const q = query(collection(db, collectionName), limit());// where("capital", "==", true));
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//         // doc.data() is never undefined for query doc snapshots
//         console.log(doc.id, " => ", doc.data());
//         //  return from here.
//     });
// }
// READ ALL DOCUMENTS
export async function readAllDocuments(collectionName) {
    try {
        const q = query(collection(db, collectionName));
        const querySnapshot = await getDocs(q);
        const allData = querySnapshot.docs.map(doc => doc.data()); //All Data as an array.
        return allData;
    } catch (e) {
        console.error("Error updating document: ", e);
        throw e;
    }
}

// READ LIMITED DOCUMENTS
export async function readAllDocumentsWithLimit(collectionName, maxLimit) {
    try {
        const q = query(collection(db, collectionName), limit(maxLimit));
        const querySnapshot = await getDocs(q);
        const allData = querySnapshot.docs.map(doc => doc.data()); //All Data as an array.
        return allData;
    } catch (e) {
        console.error("Error updating document: ", e);
        throw e;
    }
}

// READ SORTED DOCUMENTS
export async function readAllDocumentsSorted(collectionName, sortBy) {
    try {
        const q = query(collection(db, collectionName), orderBy(sortBy));
        const querySnapshot = await getDocs(q);
        const allData = querySnapshot.docs.map(doc => doc.data()); //All Data as an array.
        return allData;
    } catch (e) {
        console.error("Error updating document: ", e);
        throw e;
    }
}
// UPDATE 
export async function updateDocument(collectionName, id, data) {
    try {
        await updateDoc(doc(db, collectionName, id), data);
        console.log(`Document: ${collectionName} with id: ${id} updated. ${data}`);

    } catch (e) {
        console.error("Error updating document: ", e);
        throw e;
    }
}

export async function updateEnrolledCourse(courseId, courseToken, incrementer) {
    let key = "enrolledCourses." + courseId;
    let updates = {
        [key]: courseToken,
        "activities.saved-courses": increment(incrementer == "saved" ? 1 : 0), // only for the first time
        "activities.completed-courses": increment(incrementer == "completed" ? 1 : 0)
    };
    await updateDocument("UsersPrivate", getUid(), updates);
}

// DELETE FIELD
export async function deleteFieldInADocument(collectionName, id, dataField) {
    try {
        await updateDoc(doc(db, collectionName, id), { [dataField]: deleteField() });
        console.log(`Document: ${collectionName} with id: ${id} deleted.`);

    } catch (e) {
        console.error("Error deleting field in the document: ", e);
    }
}

/*** HELPER  *****/
export function getUid() {
    if (auth.currentUser)
        return auth.currentUser.uid;
    else
        return undefined;
}

function getUserPrivateToken() {
    if (getUid()) {
        return {
            "username": auth.currentUser.displayName, "email": auth.currentUser.email, "userProfileSrc": auth.currentUser.photoURL, "role": "Stack Explorer",
            "activities": {
                "saved-courses": 0,
                "liked-tutorials": 0,
                "completed-courses": 0,
            },
            "enrolledCourses": []
        }
    }
    else return "";
}

function getUserPublicToken() {
    if (getUid()) {
        return {
            "username": auth.currentUser.displayName, "email": auth.currentUser.email, "userProfileSrc": auth.currentUser.photoURL, "role": "Stack Explorer",
            "about-me": "A dedicated emptyStacks explorer.",
            "work": "",
            "location": "",
            "tech-stack": "",
            "facebook": "",
            "instagram": "",
            "linkedin": "",
            "github": "",
            "userProfileSrc": "/images/profile/photo_1.png",
        }
    }
    else return "";
}

async function createUserProfile(user) {
    try {
        await createDocument("UsersPrivate", user.uid, getUserPrivateToken(), false);
        await createDocument("UsersPublic", user.uid, getUserPublicToken(), false);
    } catch (error) {
        throw error;
    }

}