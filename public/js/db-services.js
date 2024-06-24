import { addDocument, createDocument, deleteDocument, firebaseChangePassword, firebaseEmailPasswordSignIn, firebaseGoogleSignIn, firebaseSignOut, firebaseSignup, getUid, getUserObject, initFirebase, readAllDocuments, readDocument, updateDocument, updateDocumentWithArray } from "./firebase-config";



let allCourses, allStreams, courseDetail = {};
export async function initServices() {
    await initFirebase();
}

/** ALL ITEMS **/
export async function getAllCourses() {
    if (!allCourses) {
        allCourses = await readDocument("AllItems", 'allCourses');
    }
    return allCourses;
}

export async function getAllStreams() {
    if (!allStreams) {
        allStreams = await readDocument("AllItems", 'allStreams');
    }
    return allStreams;
}

/** COURSES BY STREAM **/
export async function getAllCoursesByStreamId(streamId) {
    return await readDocument("CoursesByStreams", streamId);
}

/** COMMENTS **/
export async function getAllComments(courseId, chapterId) {
    return await readAllDocuments("CourseDetail/" + courseId + "/Content/" + chapterId + "/Comments");
}

export async function deleteComment(courseId, chapterId, commentId) {
    await deleteDocument("CourseDetail/" + courseId + "/Content/" + chapterId + "/Comments", commentId);
}

export async function updateComment(courseId, chapterId, commentId, commentObject) {
    await updateDocument("CourseDetail/" + courseId + "/Content/" + chapterId + "/Comments", commentId, commentObject, 'addDate');
}

export async function addComment(courseId, chapterId, commentObject) {
    commentObject.user = getUserTokenObject();
    return await addDocument("CourseDetail/" + courseId + "/Content/" + chapterId + "/Comments", commentObject, 'addDate');
}

/** REVIEWS **/
export async function createReview(courseId, reviewObject) {
    reviewObject.user = getUserTokenObject();
    await createDocument("CourseDetail/" + courseId + "/Reviews", getUid(), reviewObject, false, 'addDate');
}

export async function readAllReviews(courseId) {
    return await readAllDocuments("CourseDetail/" + courseId + "/Reviews");
}

/** TUTOR APPLICATIONS **/
export async function applyForTutor(formData) {
    formData.user = getUserTokenObject();
    await createDocument('TutorApplications', getUid(), formData, false, 'addDate');
}

/** COURSE DETAIL **/
export async function getCourseDetail(courseId) {
    if (!courseDetail[courseId]) {
        courseDetail[courseId] = await readDocument("CourseDetail", courseId);
    }
    else
        console.log('reading from cache')
    return courseDetail[courseId];
}

/** GET USER ID **/
export function getUserId() {
    return getUid();
}

/** CONTENT **/
export async function getChapterContent(courseId, chapterId) {
    return await readDocument("CourseDetail/" + courseId + "/Content/", chapterId);
}

/** SIGN UP **/
export async function signUp(username, email, password) {
    let userToken = {
        displayName: username,
        password: password,
        email: email,
        photoURL: "/images/profile/student.svg"
    };
    let user = await firebaseSignup(userToken);
    await createUserPrivateProfile(user);
    await createUserPublicProfile(user);
}

export async function signIn(provider, token) {
    if (provider == "Email&Password") {
        await firebaseEmailPasswordSignIn(token.email, token.password)
    } else if (provider == "Google") {
        await firebaseGoogleSignIn();
    }
    let user = getUserObject();
    let privateProfile = await readDocument("UserPrivateProfile", user.uid);
    if (Object.keys(privateProfile).length == 0) {
        await createUserPrivateProfile(user);
    }
    let publicProfile = await readDocument("UserPublicProfile", user.uid);
    if (Object.keys(publicProfile).length == 0) {
        await createUserPublicProfile(user);
    }
}
export async function signOut() {
    await firebaseSignOut();
}

export async function forgotPassword(email) {
    await firebasePasswordReset(email);
}

export async function changePassword(currentPassword, newPassword) {
    await firebaseChangePassword(currentPassword, newPassword);
}
export function getCurrentUserObject() {
    return getUserObject();
}

function getUserTokenObject() {
    let user = getUserObject();
    return {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
    }
}
async function createUserPublicProfile(user) {
    const userPublicToken = {
        displayName: user.displayName,
        photoURL: user.photoURL,
        role: "Stack Explorer",
        aboutMe: "A dedicated emptyStacks explorer.",
        work: "",
        location: "",
        techStack: "",
        facebook: "",
        instagram: "",
        linkedin: "",
        github: "",
    }
    await createDocument("UserPublicProfile", user.uid, userPublicToken, false, 'addDate');
}

async function createUserPrivateProfile(user) {
    const userPrivateToken = {
        role: "Stack Explorer",
        enrolledCourses: {},
        likedTutorials: {}
    };

    await createDocument("UserPrivateProfile", user.uid, userPrivateToken, false, 'addDate');
}

export async function getUserPrivateProfile() {
    let uid = getUid();
    if (uid)
        return await readDocument("UserPrivateProfile", uid);
    return false;
}

export async function getUserPublicProfile(uid) {
    return await readDocument("UserPublicProfile", uid);
}

export async function updateMyPublicProfile(updateObject) {
    await updateDocument("UserPublicProfile", getUserId(), updateObject, 'addDate');
}

/** ENROLL USER **/
export async function enrollToCourse(courseId) {
    if (getUid()) {
        await enrollUserToCourse(courseId);
        await addCourseToUserProfile(courseId);
    }
}

function enrollUserToCourse(courseId) {
    createDocument('CourseDetail/' + courseId + "/EnrolledUsers", getUid(), {
        user: getUserTokenObject()
    }, false, 'addDate');
}

async function addCourseToUserProfile(courseId) {
    let courseToken = await getCourseToken(courseId);
    let key = "enrolledCourses." + courseId;
    let updates = {
        [key]: courseToken
    };
    await updateDocument("UserPrivateProfile", getUid(), updates, 'addDate');
}

async function getCourseToken(courseId) {
    let courseData = await getCourseDetail(courseId);
    return {
        thumbnail: courseData.thumbnail,
        title: courseData.courseName,
        nextChapter: courseData.href,
        chaptersCompleted: [],
        totalChapters: courseData.chapterCount,
        status: "In Progress",
    };
}

/** LIKES **/
export async function likeChapter(courseId, chapterId, status, chapterTitle) {
    if (status == 'liked')
        rateUpChapter(courseId, chapterId);
    addToLikedTutorials(courseId, chapterId, status, chapterTitle);
}
async function addToLikedTutorials(courseId, chapterId, status, chapterTitle) {
    if (getUid()) {
        let key = "likedTutorials." + courseId + "+" + chapterId;
        let updates = {
            [key]: {
                href: courseId + "/" + chapterId,
                title: chapterTitle,
                status: status
            },
        };
        await updateDocument("UserPrivateProfile", getUid(), updates, 'addDate');
    }
}

function rateUpChapter(courseId, chapterId) {
    if (getUid()) {
        createDocument("CourseDetail/" + courseId + "/Content/" + chapterId + "/Likes", getUid(), {
            user: getUserTokenObject(),
        }, false, 'addDate');
    }
}

/** Chapter Completion */
export async function markChapterCompleted(courseId, courseToken) {
    let parentKey = "enrolledCourses." + courseId;
    let updates = {};
    updates[parentKey + ".status"] = courseToken.courseStatus;
    if ('nextChapter' in courseToken)
        updates[parentKey + ".nextChapter"] = courseToken.nextChapter;
    await updateDocumentWithArray("UserPrivateProfile", getUid(), updates, parentKey + ".chaptersCompleted", courseToken.index, 'addDate')
}

export async function getTutorDetails(uid) {
    return await readDocument("TutorDetails", uid);
}