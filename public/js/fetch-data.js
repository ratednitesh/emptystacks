import { mockUpdateUserDataAPICall, mockgetCourseReviewAPICall, mockgetTopCoursesAPICall, mockgetTopStreamsAPICall, mockgetUserActivityDataAPICall, mockgetUserDataAPICall, mockgetUserEnrolledCoursesAPICall, mockgetUserPrivateDataAPICall } from "./mock-api";

let cachedData = {
    userData: null,
    userPrivateData: null,
    activities: null,
    enrolledCourses: null,
    topStreams: null,
    topCourses: null
}
export function getUserPrivateData() {
    return new Promise((resolve, reject) => {
        // If data is already cached, resolve with the cached data
        if (cachedData.userPrivateData) {
            console.log('Read private from cache');
            resolve(cachedData.userPrivateData);
        } else {
            // Simulate an API call
            mockgetUserPrivateDataAPICall()
                .then(response => {
                    // Store the API response in the cachedData object
                    console.log('Resolved');
                    cachedData.userPrivateData = response;
                    resolve(response); // Resolve with the API response
                })
                .catch(error => {
                    reject(error); // Reject with the error from the API call
                });
        }
    });
}

export function getUserPublicData() {
    return new Promise((resolve, reject) => {
        // If data is already cached, resolve with the cached data
        if (cachedData.userData) {
            console.log('Read from cache');
            resolve(cachedData.userData);
        } else {
            // Simulate an API call
            mockgetUserDataAPICall()
                .then(response => {
                    // Store the API response in the cachedData object
                    console.log('Resolved');
                    cachedData.userData = response;
                    resolve(response); // Resolve with the API response
                })
                .catch(error => {
                    reject(error); // Reject with the error from the API call
                });
        }
    });
}



export function updateUserData(newData) {
    return new Promise((resolve, reject) => {
        // Simulate an asynchronous operation (e.g., updating data on the server)
        mockUpdateUserDataAPICall(newData)
            .then(() => {
                cachedData.userData = { ...cachedData.userData, ...newData };
                resolve(); // Resolve the Promise once the data is updated
            })
            .catch(error => {
                reject(error); // Reject with the error from the API call
            });
    });
}


export function getUserActivities() {
    return new Promise((resolve, reject) => {
        // If data is already cached, resolve with the cached data
        if (cachedData.activities) {
            console.log('Read activities from cache');
            resolve(cachedData.activities);
        } else {
            // Simulate an API call
            mockgetUserActivityDataAPICall()
                .then(response => {
                    // Store the API response in the cachedData object
                    console.log('Activity Resolved');
                    cachedData.activities = response;
                    console.log(response);
                    resolve(response); // Resolve with the API response
                })
                .catch(error => {
                    reject(error); // Reject with the error from the API call
                });
        }
    });
}



export function getEnrolledCourses() {
    return new Promise((resolve, reject) => {
        // If data is already cached, resolve with the cached data
        if (cachedData.enrolledCourses) {
            console.log('Read enrolled courses from cache');
            resolve(cachedData.enrolledCourses);
        } else {
            // Simulate an API call
            mockgetUserEnrolledCoursesAPICall()
                .then(response => {
                    // Store the API response in the cachedData object
                    console.log('Enrolled Courses Resolved');
                    cachedData.enrolledCourses = response;
                    console.log(response);
                    resolve(response); // Resolve with the API response
                })
                .catch(error => {
                    reject(error); // Reject with the error from the API call
                });
        }
    });
}



export function getTopStreams() {
    return new Promise((resolve, reject) => {
        // If data is already cached, resolve with the cached data
        if (cachedData.topStreams) {
            console.log('Read top streams from cache');
            resolve(cachedData.topStreams);
        } else {
            // Simulate an API call
            mockgetTopStreamsAPICall()
                .then(response => {
                    // Store the API response in the cachedData object
                    console.log('Top Streams Resolved');
                    cachedData.topStreams = response;
                    console.log(response);
                    resolve(response); // Resolve with the API response
                })
                .catch(error => {
                    reject(error); // Reject with the error from the API call
                });
        }
    });
}



export function getTopCourses() {
    return new Promise((resolve, reject) => {
        // If data is already cached, resolve with the cached data
        if (cachedData.topCourses) {
            console.log('Read enrolled courses from cache');
            resolve(cachedData.topCourses);
        } else {
            // Simulate an API call
            mockgetTopCoursesAPICall()
                .then(response => {
                    // Store the API response in the cachedData object
                    console.log('Top Courses Resolved');
                    cachedData.topCourses = response;
                    console.log(response);
                    resolve(response); // Resolve with the API response
                })
                .catch(error => {
                    reject(error); // Reject with the error from the API call
                });
        }
    });
}


export function generateUserReview(courseId) {
    return new Promise((resolve, reject) => {
        mockgetCourseReviewAPICall(courseId).then(
            (courseReview) => {
                var reviewsHtml = '';
                if(!courseReview)
                resolve();
                courseReview.forEach((r) => {
                    var userInfo = r.user;
                    const starsHTML = generateStarRating(r.rating);
                    reviewsHtml += `
                        <div class="box">
                            <p>${r.review}</p>
                            <div class="user">
                                <img src="${userInfo.userProfileSrc}" alt="${userInfo.name}">
                                <div>
                                    <h3>${userInfo.name}</h3>
                                    ${starsHTML}
                                </div>
                            </div>
                        </div>
                    `;
                });
                resolve(reviewsHtml);
            }
        ).catch(
            error => {
                reject(error);
            }
        );
    });
}
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    let starsHTML = '';

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }

    // Add half star if necessary
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }

    // Add empty stars to fill up to 5
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }

    // Wrap stars in a div
    return '<div class="stars">' + starsHTML + '</div>';
}
