import { allStreams, courseContent, courseContentComments, courseContentDetails, courseDetails, courseReviews, coursesByStreams, topCourses, topStreams, userPrivateProfile, userPublicProfile } from "../test/test-data";

export function mockgetUserPrivateDataAPICall(uid) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("User Private read from the server.");
            resolve(userPrivateProfile[uid]);
        }, 1000);
    });
}
export function mockgetUserDataAPICall(uid) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Data read from the server.");
            resolve(userPublicProfile[uid]);
        }, 1000);
    });
}
export function mockUpdateUserDataAPICall(uid, newData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            userPublicProfile[uid] = { ...userPublicProfile[uid], ...newData };
            console.log("Data updated on the server:", userPublicProfile);
            resolve();
        }, 1000);
    });
}
export function mockgetTopStreamsAPICall() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Top Streams read from the server.");
            resolve(topStreams);
        }, 1000);
    });
}
export function mockgetAllStreamsAPICall() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("All Streams read from the server.");
            resolve(allStreams);
        }, 1000);
    });
}
export function mockgetTopCoursesAPICall() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Top Courses read from the server.");
            resolve(topCourses);
        }, 1000);
    });
}

export function mockgetTextCourseAPICall(courseId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(courseDetails[courseId]);
            resolve(courseDetails[courseId]);
        }, 1000);
    });
}

export function mockgetCourseReviewAPICall(courseId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {

            console.log("Course Reviews read from the server.");
            resolve(courseReviews[courseId]);
        }, 1000);
    });
}

export function mockgetCourseContentDetailsAPICall(courseId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Course Content Details read from the server.");
            resolve(courseContentDetails[courseId]);
        }, 1000);
    });
}
export function mockgetCourseContentAPICall(courseId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Course Content Details read from the server.");
            resolve(courseContent[courseId]);
        }, 1000);
    });
}
export function mockgetCourseContentCommentsAPICall(courseId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Course Content Details read from the server.");
            resolve(courseContentComments[courseId]);
        }, 1000);
    });
}
export function mockCourseContentAddCommentAPICall(courseId, newCommentObject){
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            // TODO: Doesn't work for first comment.
            courseContentComments[courseId].push(newCommentObject);
            resolve();
        }, 1000);
    })
}
// Creating User Profile
export function mockCreateUserDataAPICall(uid, newData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (uid in userPublicProfile) {
                reject();
            } else {
                userPublicProfile[uid] = {
                    "username": newData.username,
                    "about-me": "I am a curious little kid.",
                    "work": "",
                    "location": "",
                    "tech-stack": "",
                    "facebook": "",
                    "instagram": "",
                    "linkedin": "",
                    "github": "",
                    "userProfileSrc": newData.userProfileSrc,
                    "role": "Stack Explorer"
                };
                userPrivateProfile[uid] = {
                    "username": newData.username,
                    "userProfileSrc": newData.userProfileSrc,
                    "mailId": newData.email,
                    "role": "Stack Explorer",
                    "activities": {
                        "saved-courses": 0,
                        "liked-tutorials": 0,
                        "completed-courses": 0,
                    },
                    "enrolledCourses": []
                };
                console.log("User Profile created on the server:");
                resolve(); 

            }

        }, 1000);
    });
}

export function mockIsValidUid(uid) {

}

export function mockGetCoursesByStreams(streamid){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Course Content Details read from the server.");
            resolve(coursesByStreams[streamid]);
        }, 1000);
    });
}