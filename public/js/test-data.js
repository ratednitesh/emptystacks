var userPrivateProfile = {
    "username": "Nitesh S.",
    "userProfileSrc": "/images/profile/user.jpg",
    "mailId": "nitesh_91@outlook.com",
    "role": "Stack Explorer"
}
var userPublicProfile = {
    "username": "Nitesh S.",
    "about-me": "I am a curious little kid.",
    "work": "Vice President",
    "location": "India",
    "tech-stack": "JAVA Developer",
    "facebook": "ratednitesh",
    "instagram": "ratednitesh",
    "linkedin": "ratednitesh",
    "github": "",
    "userProfileSrc": "/images/profile/user.jpg",
    "role":"Stack Explorer"
};
var actvities = {
    "saved-courses": "43",
    "liked-tutorials": "23",
    "total-comments": "12"
};
var enrolledCourses = [
    {
        "thumbnail": "/images/thumbnails/thumbnail sample.jpg",
        "title": "Solving LeetCode Questions",
        "href": "/playlist"
    },
    {
        "thumbnail": "/images/thumbnails/thumbnail sample.jpg",
        "title": "Solving LeetCode Questions",
        "href": "/playlist"
    }, {
        "thumbnail": "/images/thumbnails/thumbnail sample.jpg",
        "title": "Solving LeetCode Questions",
        "href": "/playlist"
    }
];
var topStreams = [
    { icon: 'fa-code', text: 'development' },
    { icon: 'fa-chart-simple', text: 'business' },
    { icon: 'fa-pen', text: 'design' },
    { icon: 'fa-chart-line', text: 'marketing' },
    { icon: 'fa-music', text: 'music-tech' },
    { icon: 'fa-camera', text: 'photography' },
    { icon: 'fa-cog', text: 'software' },
    { icon: 'fa-vial', text: 'science' },
    { icon: 'fa-cog', text: 'space' },
    { icon: 'fa-vial', text: 'backend' }
];

var topCourses = [
    {
        thumbnail: "/images/thumbnails/thumbnail sample.jpg",
        title: "Some Random Text course",
        href: "/content"
    },
    {
        thumbnail: "/images/thumbnails/thumbnail sample.jpg",
        title: "Solving LeetCode Questions",
        href: "/playlist"
    },
    {
        thumbnail: "/images/thumbnails/thumbnail sample.jpg",
        title: "Solving LeetCode Questions",
        href: "/playlist"
    },
    {
        thumbnail: "/images/thumbnails/thumbnail sample.jpg",
        title: "Solving LeetCode Questions",
        href: "/playlist"
    },
    {
        thumbnail: "/images/thumbnails/thumbnail sample.jpg",
        title: "Solving LeetCode Questions",
        href: "/playlist"
    },
    {
        thumbnail: "/images/thumbnails/thumbnail sample.jpg",
        title: "Solving LeetCode Questions",
        href: "/playlist"
    }
];
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
function mockgetUserPrivateDataAPICall() {
    return new Promise((resolve, reject) => {
        // Simulate a delay of 1 second
        setTimeout(() => {
            // Simulate a successful response with dummy data
            console.log("User Private read from the server.");
            resolve(userPrivateProfile); // Resolve the Promise with the dummy data
        }, 1000); // 1000 milliseconds delay (1 second)
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


function mockgetUserDataAPICall() {
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

function mockUpdateUserDataAPICall(newData) {
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

function mockgetUserActivityDataAPICall() {
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

function mockgetUserEnrolledCoursesAPICall() {
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

function mockgetTopStreamsAPICall() {
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

function mockgetTopCoursesAPICall() {
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