const eventListeners = {};

export function subscribe(eventName, callback) {
    if (!eventListeners[eventName])
        eventListeners[eventName] = [];
    eventListeners[eventName].push(callback);
}
export function publish(eventName, data) {
    if (eventListeners[eventName]) {
        eventListeners[eventName].forEach(callback => callback(data));
    }
}
const statusCodes = {
    200: "Registration Successful!",
    201: "Login Successful!",
    202: "Successfully Updated: ",
    203: "Processing Request...",
    204: "Logout Successful",
    205: "A verification link is sent to ",
    206: "A password reset email has been sent!",
    207: "Link Copied! ",
    208: "Course Saved! ",
    209: "Request Submitted.",
    210: "Password Changed! Sign In again with New Password.",
    211: "Comment Added",
    212: "Review submitted.",
    213: "Added to liked tutorials",

    301: "Please agree to Terms & Conditions!",
    302: "Username is required!",
    303: "Email Id is required!",
    304: "Email Id is not valid!",
    305: "Password is required!",
    306: "Password must be at least 8 characters long.",
    307: "Password cannot be more than 25 charaters.",
    308: "",
    309: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
    310: "Please provide all mandatory fields",
    311: "Password and Confirm Password Strings do not match",
    312: "Comment cannot be blank",
    313: "Max Characters: ",

    500: "Something went wrong, please try again later",
    501: "Something went wrong, unable to load: ",
    502: "Something went wrong, unable to save changes",
    503: "Sign In Failed!",
    504: "Sign out Failed!",
    505: "Registration Failed!",
    506: "Sorry, This feature is not supported currently."
}
export function notification(statusCode, message) {
    let el = document.createElement('DIV');
    el.classList.add('popup');
    el.innerHTML = statusCodes[statusCode];
    if (message != undefined)
        el.innerHTML += message;
    let color;
    if (statusCode >= 500)
        color = "#c5503b";
    else if (statusCode > 300)
        color = "#eab735";
    else if (statusCode >= 200)
        color = "#38c464";
    el.style.backgroundColor = color;
    document.body.appendChild(el);
    setTimeout(() => {
        el?.remove();
    }, 5000);
}

export async function initAddOn(page) {
    return new Promise((resolve, reject) => {
        try {
            console.log('loading additional js files: ' + page);
            if (page == "home")

                import('./home.js').then(module => {
                    console.log("import done for home");
                    module.initHome();
                    subscribe('loadHome', module.loadHome);
                    subscribe('unloadHome', module.unloadHome);
                    resolve();
                });

            else if (page == "profile")
                import('./profile.js').then(module => {
                    module.initProfile();
                    subscribe('loadProfile', module.loadProfile);
                    subscribe('loadMyCourses', module.loadMyCourses);
                    resolve();
                });

            else if (page == "course")
                import('./course.js').then(module => {
                    module.initCoursePage();
                    subscribe('loadCoursePage', module.loadCoursePage);
                    resolve();
                });
            else if (page == "content")
                import('./content.js').then(module => {
                    console.log("loading content");
                    module.initContent();
                    subscribe('loadContent', module.loadContent);
                    resolve();
                });
            else if (page == "streams")
                import('./streams.js').then(module => {
                    console.log("loading streams");
                    module.initStreams().then(
                        () => {
                            subscribe('loadStreams', module.loadStreams);
                            resolve();
                        }
                    )
                });
            else
                resolve();
        } catch (error) {
            console.error(`Error importing ${page} js:`, error);
            reject();
        }
    });
}
async function importMockApi() {
    try {
        const {
            mockgetCourseContentDetailsAPICall, mockUpdateUserDataAPICall, mockgetTopCoursesAPICall } = await import('/public/test/mock-api.js');
        return {
            mockgetCourseContentDetailsAPICall, mockUpdateUserDataAPICall, mockgetTopCoursesAPICall
        };
    } catch (error) {
        console.error('Error importing mock API:', error);
        throw error;
    }
}
export async function getCourseContentDetailsAPICalls(courseId) {
    const mockApi = await importMockApi();
    return new Promise((resolve, reject) => {
        // If data is already cached, resolve with the cached data

        // Simulate an API call
        mockApi.mockgetCourseContentDetailsAPICall(courseId)
            .then(response => {
                // TODO: Store the API response in the cachedData object
                resolve(response); // Resolve with the API response
            })
            .catch(error => {
                reject(error); // Reject with the error from the API call
            });
    });
}

export function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
}

export async function updateUserData(uid, newData) {
    const mockApi = await importMockApi();
    return new Promise((resolve, reject) => {
        // Simulate an asynchronous operation (e.g., updating data on the server)
        mockApi.mockUpdateUserDataAPICall(uid, newData)
            .then(() => {
                resolve(); // Resolve the Promise once the data is updated
            })
            .catch(error => {
                reject(error); // Reject with the error from the API call
            });
    });
}

export function getFormattedDate(date) {
    // Extract the day, month, and year from the Date object
    const day = String(date.getDate()).padStart(2, '0'); // Ensure day is two digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure month is two digits and add 1 since months are zero-based
    const year = date.getFullYear();

    // Format the date as a string in DD-MM-YYYY format
    return `${day}-${month}-${year}`;
}
export async function getTopCourses() {
    const mockApi = await importMockApi();
    return new Promise((resolve, reject) => {
        // If data is already cached, resolve with the cached data

        // Simulate an API call
        mockApi.mockgetTopCoursesAPICall()
            .then(response => {
                // TODO: Store the API response in the cachedData object
                resolve(response); // Resolve with the API response
            })
            .catch(error => {
                reject(error); // Reject with the error from the API call
            });

    });
}