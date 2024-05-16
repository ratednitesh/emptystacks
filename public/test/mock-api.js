import { courseContent, courseContentComments, courseContentDetails, courseDetails, courseReviews, topCourses, topStreams, userPrivateProfile, userPublicProfile } from "../test/test-data";

export function mockgetUserPrivateDataAPICall(uid) {
    return new Promise((resolve, reject) => {
        // Simulate a delay of 1 second
        setTimeout(() => {
            // Simulate a successful response with dummy data
            console.log("User Private read from the server.");
            resolve(userPrivateProfile[uid]); // Resolve the Promise with the dummy data
        }, 1000); // 1000 milliseconds delay (1 second)
    });
}
export function mockgetUserDataAPICall(uid) {
    // Simulate some asynchronous operation (e.g., fetching data)
    return new Promise((resolve, reject) => {
        // Simulate a delay of 1 second
        setTimeout(() => {
            // Simulate a successful response with dummy data
            console.log("Data read from the server.");
            resolve(userPublicProfile[uid]); // Resolve the Promise with the dummy data
        }, 1000); // 1000 milliseconds delay (1 second)
    });
}
export function mockUpdateUserDataAPICall(uid, newData) {
    // Simulate some asynchronous operation (e.g., updating data on the server)
    return new Promise((resolve, reject) => {
        // Simulate a delay of 1 second
        setTimeout(() => {
            // Simulate a successful response
            // Update userPublicProfile after successful API call
            userPublicProfile[uid] = { ...userPublicProfile[uid], ...newData };
            console.log("Data updated on the server:", userPublicProfile);
            resolve(); // Resolve the Promise
        }, 1000); // 1000 milliseconds delay (1 second)
    });
}
export function mockgetTopStreamsAPICall() {
    // Simulate some asynchronous operation (e.g., fetching data)
    return new Promise((resolve, reject) => {
        // Simulate a delay of 1 second
        setTimeout(() => {
            // Simulate a successful response with dummy data
            console.log("Top Streams read from the server.");
            resolve(topStreams); // Resolve the Promise with the dummy data
        }, 1000); // 1000 milliseconds delay (1 second)
    });
}
export function mockgetTopCoursesAPICall() {
    // Simulate some asynchronous operation (e.g., fetching data)
    return new Promise((resolve, reject) => {
        // Simulate a delay of 1 second
        setTimeout(() => {
            // Simulate a successful response with dummy data
            console.log("Top Courses read from the server.");
            resolve(topCourses); // Resolve the Promise with the dummy data
        }, 1000); // 1000 milliseconds delay (1 second)
    });
}

export function mockgetTextCourseAPICall(courseId) {
    return new Promise((resolve, reject) => {
        // Simulate a delay of 1 second
        setTimeout(() => {
            // Simulate a successful response with dummy data
            console.log(courseDetails[courseId]);
            resolve(courseDetails[courseId]); // Resolve the Promise with the dummy data
        }, 1000); // 1000 milliseconds delay (1 second)
    });
}
// TODO: Potentially we can remove this.
export function mockgetUserInfoAPICall(userId) {
    return new Promise((resolve, reject) => {
        // Simulate a delay of 1 second
        setTimeout(() => {
            // Simulate a successful response with dummy data
            resolve(userId); // Resolve the Promise with the dummy data
        }, 1000); // 1000 milliseconds delay (1 second)
    });
}
export function mockgetCourseReviewAPICall(courseId) {
    return new Promise((resolve, reject) => {
        // Simulate a delay of 1 second
        setTimeout(() => {
            // Simulate a successful response with dummy data
            console.log("Course Reviews read from the server.");
            resolve(courseReviews[courseId]); // Resolve the Promise with the dummy data
        }, 1000); // 1000 milliseconds delay (1 second)
    });
}

export function mockgetCourseContentDetailsAPICall(courseId) {
    return new Promise((resolve, reject) => {
        // Simulate a delay of 1 second
        setTimeout(() => {
            // Simulate a successful response with dummy data
            console.log("Course Content Details read from the server.");
            resolve(courseContentDetails[courseId]); // Resolve the Promise with the dummy data
        }, 1000); // 1000 milliseconds delay (1 second)
    });
}
export function mockgetCourseContentAPICall(courseId) {
    return new Promise((resolve, reject) => {
        // Simulate a delay of 1 second
        setTimeout(() => {
            // Simulate a successful response with dummy data
            console.log("Course Content Details read from the server.");
            resolve(courseContent[courseId]); // Resolve the Promise with the dummy data
        }, 1000); // 1000 milliseconds delay (1 second)
    });
}
export function mockgetCourseContentCommentsAPICall(courseId) {
    return new Promise((resolve, reject) => {
        // Simulate a delay of 1 second
        setTimeout(() => {
            // Simulate a successful response with dummy data
            console.log("Course Content Details read from the server.");
            resolve(courseContentComments[courseId]); // Resolve the Promise with the dummy data
        }, 1000); // 1000 milliseconds delay (1 second)
    });
}
// Creating User Profile
export function mockCreateUserDataAPICall(uid, newData) {
    // Simulate some asynchronous operation (e.g., updating data on the server)
    return new Promise((resolve, reject) => {
        // Simulate a delay of 1 second

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
                        "total-comments": 0,
                    },
                    "enrolledCourses": []
                };
                console.log("User Profile created on the server:");
                resolve(); // Resolve the Promise

            }
            // Simulate a successful response
            // Update userPublicProfile after successful API call

        }, 1000); // 1000 milliseconds delay (1 second)
    });
}

export function mockIsValidUid(uid) {

}