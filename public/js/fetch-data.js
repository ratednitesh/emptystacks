// Function to dynamically import mock-api.js
async function importMockApi() {
    try {
        const { mockgetUserPrivateDataAPICall, mockgetUserDataAPICall, mockUpdateUserDataAPICall, mockgetTopStreamsAPICall, mockgetTopCoursesAPICall, mockgetCourseReviewAPICall, mockgetTextCourseAPICall, mockgetCourseVideoDetailsAPICall, mockgetCourseContentDetailsAPICall } = await import('/public/test/mock-api.js');
        
        return {
            mockgetUserPrivateDataAPICall,
            mockgetUserDataAPICall,
            mockUpdateUserDataAPICall,
            mockgetTopStreamsAPICall,
            mockgetTopCoursesAPICall,
            mockgetCourseReviewAPICall,
            mockgetTextCourseAPICall,
            mockgetCourseVideoDetailsAPICall,
            mockgetCourseContentDetailsAPICall
        };
    } catch (error) {
        console.error('Error importing mock API:', error);
        throw error;
    }
}
let cachedData = {
    userData: null,
    activities: null,
    enrolledCourses: null,
    topStreams: null,
    topCourses: null
}


export async function getUserPublicData(uid) {
    const mockApi = await importMockApi();
    return new Promise((resolve, reject) => {
        // If data is already cached, resolve with the cached data
        if (cachedData.userData) {
            console.log('Read from cache');
            resolve(cachedData.userData);
        } else {
            // Simulate an API call
            mockApi.mockgetUserDataAPICall(uid)
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

export async function updateUserData(uid, newData) {
    const mockApi = await importMockApi();
    return new Promise((resolve, reject) => {
        // Simulate an asynchronous operation (e.g., updating data on the server)
        mockApi.mockUpdateUserDataAPICall(uid, newData)
            .then(() => {
                cachedData.userData = { ...cachedData.userData, ...newData };
                resolve(); // Resolve the Promise once the data is updated
            })
            .catch(error => {
                reject(error); // Reject with the error from the API call
            });
    });
}

export async function getTopStreams() {
    const mockApi = await importMockApi();
    return new Promise((resolve, reject) => {
        // If data is already cached, resolve with the cached data
        if (cachedData.topStreams) {
            console.log('Read top streams from cache');
            resolve(cachedData.topStreams);
        } else {
            // Simulate an API call
            mockApi.mockgetTopStreamsAPICall()
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

export async function getTopCourses() {
    const mockApi = await importMockApi();
    return new Promise((resolve, reject) => {
        // If data is already cached, resolve with the cached data
        if (cachedData.topCourses) {
            console.log('Read enrolled courses from cache');
            resolve(cachedData.topCourses);
        } else {
            // Simulate an API call
            mockApi.mockgetTopCoursesAPICall()
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

export async function generateUserReview(courseId) {
    const mockApi = await importMockApi();
    return new Promise((resolve, reject) => {
        mockApi.mockgetCourseReviewAPICall(courseId).then(
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
        starsHTML += '<i class="es-star"></i>';
    }

    // Add half star if necessary
    if (hasHalfStar) {
        starsHTML += '<i class="es-star-half"></i>';
    }

    // Add empty stars to fill up to 5
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="es-star-empty"></i>';
    }

    // Wrap stars in a div
    return '<div class="stars">' + starsHTML + '</div>';
}

export async function getCourseDetailsAPICalls(courseId) {
    const mockApi = await importMockApi();
    return new Promise((resolve, reject) => {
        // If data is already cached, resolve with the cached data
      
            // Simulate an API call
            mockApi.mockgetTextCourseAPICall(courseId)
                .then(response => {
                    // Store the API response in the cachedData object
                    resolve(response); // Resolve with the API response
                })
                .catch(error => {
                    reject(error); // Reject with the error from the API call
                });
        
    });
}

export async function getCourseVideoDetailsAPICalls(courseId) {
    const mockApi = await importMockApi();
    return new Promise((resolve, reject) => {
        // If data is already cached, resolve with the cached data
      
            // Simulate an API call
            mockApi.mockgetCourseVideoDetailsAPICall(courseId)
                .then(response => {
                    // Store the API response in the cachedData object
                    resolve(response); // Resolve with the API response
                })
                .catch(error => {
                    reject(error); // Reject with the error from the API call
                });
        
    });
}

export async function getCourseContentDetailsAPICalls(courseId) {
    const mockApi = await importMockApi();
    return new Promise((resolve, reject) => {
        // If data is already cached, resolve with the cached data
      
            // Simulate an API call
            mockApi.mockgetCourseContentDetailsAPICall(courseId)
                .then(response => {
                    // Store the API response in the cachedData object
                    resolve(response); // Resolve with the API response
                })
                .catch(error => {
                    reject(error); // Reject with the error from the API call
                });
        
    });
}
