// Function to dynamically import mock-api.js
async function importMockApi() {
    try {
        const { mockgetUserPrivateDataAPICall, mockgetUserDataAPICall, mockUpdateUserDataAPICall, mockgetTopStreamsAPICall, mockgetTopCoursesAPICall, mockgetCourseReviewAPICall, mockgetTextCourseAPICall,  
            mockgetCourseContentDetailsAPICall, mockgetCourseContentAPICall, mockgetCourseContentCommentsAPICall } = await import('/public/test/mock-api.js');
        
        return {
            mockgetUserPrivateDataAPICall,
            mockgetUserDataAPICall,
            mockUpdateUserDataAPICall,
            mockgetTopStreamsAPICall,
            mockgetTopCoursesAPICall,
            mockgetCourseReviewAPICall,
            mockgetTextCourseAPICall,
            mockgetCourseContentDetailsAPICall,
            mockgetCourseContentAPICall,
            mockgetCourseContentCommentsAPICall
        };
    } catch (error) {
        console.error('Error importing mock API:', error);
        throw error;
    }
}
let cachedData = {
    userData: {},
    activities: null,
    enrolledCourses: null,
    topStreams: null,
    topCourses: null
}


export async function getUserPublicData(uid) {
    const mockApi = await importMockApi();
    return new Promise((resolve, reject) => {
        // If data is already cached, resolve with the cached data
        if (cachedData.userData[uid]) {
            console.log('Read from cache');
            resolve(cachedData.userData[uid]);
        } else {
            // Simulate an API call
            mockApi.mockgetUserDataAPICall(uid)
                .then(response => {
                    // Store the API response in the cachedData object
                    console.log('Resolved');
                    cachedData.userData[uid] = response;
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
            resolve(cachedData.topStreams);
        } else {
            // Simulate an API call
            mockApi.mockgetTopStreamsAPICall()
                .then(response => {
                    // Store the API response in the cachedData object
                    cachedData.topStreams = response;
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
            resolve(cachedData.topCourses);
        } else {
            // Simulate an API call
            mockApi.mockgetTopCoursesAPICall()
                .then(response => {
                    // Store the API response in the cachedData object
                    cachedData.topCourses = response;
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
                                <a  onclick="route()" href="/profile/${userInfo.uid}">
                                <img src="${userInfo.userProfileSrc}" alt="${userInfo.name}">
                                </a>
                                <div>
                                    <h2>${userInfo.name}</h2>
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

export async function getCourseContentAPICalls(courseId) {
    const mockApi = await importMockApi();
    return new Promise((resolve, reject) => {
        // If data is already cached, resolve with the cached data
      
            // Simulate an API call
            mockApi.mockgetCourseContentAPICall(courseId)
                .then(response => {
                    // Store the API response in the cachedData object
                    resolve(response); // Resolve with the API response
                })
                .catch(error => {
                    reject(error); // Reject with the error from the API call
                });
        
    });
}

export async function getCourseContentCommentsAPICalls(courseId) {
    const mockApi = await importMockApi();
    return new Promise((resolve, reject) => {
        // If data is already cached, resolve with the cached data
      
            // Simulate an API call
            mockApi.mockgetCourseContentCommentsAPICall(courseId)
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
