import { actvities, courseContentDetails, courseDetails, courseReviews, courseVideoDetails, enrolledCourses, topCourses, topStreams, userPrivateProfile, userPublic, userPublicProfile } from "./test-data";

export function mockgetUserPrivateDataAPICall() {
    return new Promise((resolve, reject) => {
        // Simulate a delay of 1 second
        setTimeout(() => {
            // Simulate a successful response with dummy data
            console.log("User Private read from the server.");
            resolve(userPrivateProfile); // Resolve the Promise with the dummy data
        }, 1000); // 1000 milliseconds delay (1 second)
    });
}
export function mockgetUserDataAPICall() {
    // Simulate some asynchronous operation (e.g., fetching data)
    return new Promise((resolve, reject) => {
        // Simulate a delay of 1 second
        setTimeout(() => {
            // Simulate a successful response with dummy data
            console.log("Data read from the server.");
            resolve(userPublicProfile); // Resolve the Promise with the dummy data
        }, 1000); // 1000 milliseconds delay (1 second)
    });
}
export function mockUpdateUserDataAPICall(newData) {
    // Simulate some asynchronous operation (e.g., updating data on the server)
    return new Promise((resolve, reject) => {
        // Simulate a delay of 1 second
        setTimeout(() => {
            // Simulate a successful response
            // Update userPublicProfile after successful API call
            userPublicProfile = { ...userPublicProfile, ...newData };
            console.log("Data updated on the server:", userPublicProfile);
            resolve(); // Resolve the Promise
        }, 1000); // 1000 milliseconds delay (1 second)
    });
}
export function mockgetUserActivityDataAPICall() {
    // Simulate some asynchronous operation (e.g., fetching data)
    return new Promise((resolve, reject) => {
        // Simulate a delay of 1 second
        setTimeout(() => {
            // Simulate a successful response with dummy data
            console.log("Activity read from the server.");
            resolve(actvities); // Resolve the Promise with the dummy data
        }, 1000); // 1000 milliseconds delay (1 second)
    });
}
export function mockgetUserEnrolledCoursesAPICall() {
    // Simulate some asynchronous operation (e.g., fetching data)
    return new Promise((resolve, reject) => {
        // Simulate a delay of 1 second
        setTimeout(() => {
            // Simulate a successful response with dummy data
            console.log("Enrolled Courses read from the server.");
            resolve(enrolledCourses); // Resolve the Promise with the dummy data
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

export function mockgetTextCourseAPICall(courseId){
    return new Promise((resolve, reject) => {
        // Simulate a delay of 1 second
        setTimeout(() => {
            // Simulate a successful response with dummy data
            console.log("Course Details read from the server.");
            console.log(courseDetails[courseId]);

            resolve(courseDetails[courseId]); // Resolve the Promise with the dummy data
        }, 1000); // 1000 milliseconds delay (1 second)
    });
}

export function mockgetUserInfoAPICall(userId){
    return new Promise((resolve, reject) => {
        // Simulate a delay of 1 second
        setTimeout(() => {
            // Simulate a successful response with dummy data
            console.log("User Info read from the server.");
            console.log(userPublic[userId]);
            resolve(userId); // Resolve the Promise with the dummy data
        }, 1000); // 1000 milliseconds delay (1 second)
    });
}
export function mockgetCourseReviewAPICall(courseId){
    return new Promise((resolve, reject) => {
        // Simulate a delay of 1 second
        setTimeout(() => {
            // Simulate a successful response with dummy data
            console.log("Course Reviews read from the server.");
            resolve(courseReviews[courseId]); // Resolve the Promise with the dummy data
        }, 1000); // 1000 milliseconds delay (1 second)
    });
}

export function mockgetCourseContentDetailsAPICall(courseId){
    return new Promise((resolve, reject) => {
        // Simulate a delay of 1 second
        setTimeout(() => {
            // Simulate a successful response with dummy data
            console.log("Course Content Details read from the server.");
            resolve(courseContentDetails); // Resolve the Promise with the dummy data
        }, 1000); // 1000 milliseconds delay (1 second)
    });
}

export function mockgetCourseVideoDetailsAPICall(courseId){
    return new Promise((resolve, reject) => {
        // Simulate a delay of 1 second
        setTimeout(() => {
            // Simulate a successful response with dummy data
            console.log("Course Content Details read from the server.");
            resolve(courseVideoDetails[courseId]); // Resolve the Promise with the dummy data
        }, 1000); // 1000 milliseconds delay (1 second)
    });
}