import { createDocument, getUserObject, readAllDocuments, readDocument } from "./firebase-config";
import { getAllCourses, getAllCoursesByStreamId, getAllStreams, getCurrentUserObject, signIn, signOut } from "./services";

let output = {
    AllItems: {},
    CourseDetail: {},
    'CourseDetail/testCourse/EnrolledUsers/': {},
    'CourseDetail/problemSolvingLeetCode/EnrolledUsers/': {},
    'CourseDetail/problemSolvingLeetCode/Content/': {},
    'CourseDetail/problemSolvingLeetCode/Reviews/': {},
    'CourseDetail/testCourse/Content/testChapter/Likes': {},
    'CourseDetail/problemSolvingLeetCode/Content/Basics/Comments': {},
    CoursesByStreams: {},
    TutorApplications: {},
    TutorDetails: {},
    UserPrivateProfile: {},
    UserPublicProfile: {}
};
// { Guest: { Failed: {}, Success: {} }, Admin: { Failed: {}, Success: {} }, 'Super User': { Failed: {}, Success: {} }, 'Stack Builder': { Failed: {}, Success: {} }, 'Stack Explorer': { Failed: {}, Success: {} } };
const userCred = {
    guest: {},
    admin: { email: "admin@emptystacks.com", password: "Testing@123" },
    superUser: { email: "superuser@emptystacks.com", password: "Testing@123" },
    stackBuilder: { email: "stackBuilder@emptystacks.com", password: "Testing@123" },
    stackExplorer: { email: "stackExplorer@emptystacks.com", password: "Testing@123" },
}
const collections = {
    AllItems: [{ docId: 'allStreams' }, { docId: 'allCourses' }],
    CourseDetail: [{ docId: 'problemSolvingLeetCode' }],
    'CourseDetail/testCourse/EnrolledUsers/': [{ docId: 'aQnUacQl2IVL3ZzGNBpPkWCtoDN2' }, {docId: 'nW7X7cyUllazbIjQZYtpVMDu71k2'}],
    'CourseDetail/problemSolvingLeetCode/EnrolledUsers/': [{ docId: 'aQnUacQl2IVL3ZzGNBpPkWCtoDN2' }],
    'CourseDetail/problemSolvingLeetCode/Content/': [{ docId: 'Basics' }],
    'CourseDetail/problemSolvingLeetCode/Reviews/': [{ docId: 'aQnUacQl2IVL3ZzGNBpPkWCtoDN2' }],
    'CourseDetail/testCourse/Content/testChapter/Likes': [{ docId: 'eDLhJLXv7ChEf6vBCSSbHUphTlV2' }],
    'CourseDetail/problemSolvingLeetCode/Content/Basics/Comments': [{ docId: 'O8usBpinSMHeCkIsRSAf' }],
    CoursesByStreams: [{ docId: 'FullStack' }],
    TutorApplications: [{ docId: 'aQnUacQl2IVL3ZzGNBpPkWCtoDN2' }],
    TutorDetails: [{ docId: '12345' }],
    UserPrivateProfile: [{ docId: 'DcOWtPF3Ecdm7RQBk5mNLamUPH62' },{docId: 'nW7X7cyUllazbIjQZYtpVMDu71k2'}],
    UserPublicProfile: [{ docId: 'DcOWtPF3Ecdm7RQBk5mNLamUPH62' }],

};
export async function testFirestoreRules() {
    await testAllUsers();
}

let userRole = '';
async function testAllUsers() {
    for (const [userKey, token] of Object.entries(userCred)) {
        console.log(userKey);
        if (userKey != 'guest') {
            await signIn("Email&Password", { email: token.email, password: token.password });
            let user = getCurrentUserObject();
            let privateProfile = await readDocument('UserPrivateProfile', user.uid);
            userRole = privateProfile.role;
        } else {
            userRole = 'Guest';
            await signOut();
        }
        console.log("Role: " + userRole);
        await listFullCollection();
        await getCollectionByDocId();
        await signOut();
    }
    console.log('***** SUCCEEDED ****** ');
    console.log(JSON.stringify(output));
}

async function listFullCollection() {
    for (const [collectionName, docs] of Object.entries(collections)) {
        try {
            if (!output[collectionName]['ReadAll']) {
                output[collectionName]['ReadAll'] = {}
            }
            let response = await readAllDocuments(collectionName);
            output[collectionName]['ReadAll'][userRole] = true;
        } catch {
            output[collectionName]['ReadAll'][userRole] = false;
        }
    }
}

async function getCollectionByDocId() {
    for (const [collectionName, docs] of Object.entries(collections)) {
        for (let doc of docs) {
            try {
                if (!output[collectionName][doc.docId]) {
                    output[collectionName][doc.docId] = {}
                }
                let response = await readDocument(collectionName, doc.docId);
                output[collectionName][doc.docId][userRole] = true;
            } catch {
                output[collectionName][doc.docId][userRole] = false;
            }
        };
    }
}

