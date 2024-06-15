import { initializeApp } from 'firebase/app';
import { getFirestore, orderBy, serverTimestamp } from 'firebase/firestore/lite';
import { doc, setDoc, getDoc, deleteField, updateDoc, query, where, getDocs, increment, arrayUnion, deleteDoc, collection, addDoc, limit } from "firebase/firestore/lite";

import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification, updateProfile, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";

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
export async function firebaseSignup(userToken) {
    const userCredential = await createUserWithEmailAndPassword(auth, userToken.email, userToken.password);
    const user = userCredential.user;

    await updateProfile(user, {
        displayName: userToken.displayName,
        photoURL: userToken.photoURL
    });
    await sendEmailVerification(auth.currentUser);
    return user;
}

// Google Sign In
export async function firebaseGoogleSignIn() {
    await signInWithPopup(auth, googleProvider);
}

// Sign In
export async function firebaseEmailPasswordSignIn(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
}

// Password Reset
export async function firebasePasswordReset(email) {
    await sendPasswordResetEmail(auth, email);
}

// Change Password
export async function firebaseChangePassword(currentPassword, newPassword) {
    const user = auth.currentUser;
    if (!user) {
        console.error("No user is currently signed in.");
        throw "User not logged In";
    }
    const credentials = EmailAuthProvider.credential(user.email, currentPassword);
    try {
        await reauthenticateWithCredential(user, credentials);
    }
    catch (e) {
        throw "Incorrect Old Password."
    }
    try {
        await updatePassword(user, newPassword);
    }
    catch (e) {
        throw "Something went wrong. Please try again later."
    }
}

// Sign Out
export async function firebaseSignOut() {
    await auth.signOut();
}

/***  Firestore CRUD APIs ****/
// CREATE 
export async function createDocument(collectionName, id, data, mergeStatus, flag) {
    try {
        if (flag == 'addDate')
            data.createdAt = serverTimestamp();
        // use merge : true if want to create new doc if not already present. Is it? 
        await setDoc(doc(db, collectionName, id), data, { merge: mergeStatus });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function addDocument(collectionName, data, flag) {
    if (flag == 'addDate')
        data.createdAt = serverTimestamp();
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
}

// READ
export async function readDocument(collectionName, id) {
    try {
        const docRef = doc(db, collectionName, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            let data = docSnap.data();
            if (data.createdAt) {
                data.createdAt = docSnap.data().createdAt.toDate();
            }
            if (data.updatedAt) {
                data.updatedAt = docSnap.data().updatedAt.toDate();
            }
            return data;
        } else {
            // docSnap.data() will be undefined in this case
            console.error("No such document!");
            return {};
        }
    } catch (e) {
        console.error("Error reading document: ", e);
        throw e;
    }
}

// READ ALL DOCUMENTS
export async function readAllDocuments(collectionName) {
    try {
        const q = query(collection(db, collectionName));
        const querySnapshot = await getDocs(q);
        const allData = querySnapshot.docs.map(doc => { return { [doc.id]: doc.data() } });
        let result = {};
        querySnapshot.forEach(doc => {
            let data = doc.data();
            if (data.createdAt) {
                data.createdAt = doc.data().createdAt.toDate();
            }
            if (data.updatedAt) {
                data.updatedAt = doc.data().updatedAt.toDate();
            }
            result[doc.id] = data;
        });
        return result;
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
        let result = {};
        querySnapshot.forEach(doc => {
            result[doc.id] = doc.data();
        });
        return result;
    } catch (e) {
        console.error("Error updating document: ", e);
        throw e;
    }
}

// UPDATE 
export async function updateDocument(collectionName, id, data) {
    await updateDoc(doc(db, collectionName, id), data);
}
export async function updateDocumentWithArray(collectionName, id, data, arrayField, newElement) {
    data[arrayField] = arrayUnion(newElement);
    await updateDocument(collectionName, id, data);
}

// DELETE DOC
export async function deleteDocument(collectionName, docId) {
    try {
        await deleteDoc(doc(db, collectionName, docId));
    } catch (error) {
        console.error("Error removing document: ", error);
        throw error;
    }
}
// DELETE FIELD
export async function deleteFieldInADocument(collectionName, id, dataField) {
    try {
        await updateDoc(doc(db, collectionName, id), { [dataField]: deleteField() });
    } catch (e) {
        console.error("Error deleting field in the document: ", e);
        throw e;
    }
}

/*** HELPER  *****/
export function getUid() {
    if (auth.currentUser)
        return auth.currentUser.uid;
    else
        return undefined;
}

export function getUserObject() {
    if (auth.currentUser)
        return auth.currentUser;
    else
        return undefined;
}