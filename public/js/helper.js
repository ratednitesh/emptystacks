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
    201:"Login Successful!",
    202: "Successfully Updated: ",
    203: "Processing Request...",
    204: "Logout Successful",
    205: "A verification link is sent to ",
    206: "A password reset email has been sent!",

    301: "Please agree to Terms & Conditions!",
    302: "Username is required!",
    303: "Email Id is required!",
    304: "Email Id is not valid!",
    305: "Password is required!",
    306: "Password must be at least 8 characters long.",
    307: "Password cannot be more than 25 charaters.",
308:"",
309:"Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",

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
        el.remove();
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
                    subscribe('updateQuickSelectOptions', module.updateQuickSelectOptions);
                    subscribe('loadHome', module.loadHome);
                    subscribe('unloadHome', module.unloadHome);
                    resolve();
                });

            else if (page == "profile")
                import('./profile.js').then(module => {
                    module.initProfile();
                    subscribe('loadProfile', module.loadProfile);
                    resolve();
                });

            else if (page == "course")
                import('./course.js').then(module => {
                    module.initCoursePage();
                    subscribe('loadCoursePage', module.loadCoursePage);
                    subscribe('disableSignOutUserOptionsForCourse', module.disableSignOutUserOptionsForCourse);
                    resolve();
                });
            else if (page == "content")
                import('./content.js').then(module => {
                    console.log("loading content");
                    module.initContent();
                    subscribe('loadContent', module.loadContent);
                    subscribe('hideComments', module.hideComments);
                    resolve();
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
            mockgetCourseContentDetailsAPICall } = await import('/public/test/mock-api.js');
        return {
            mockgetCourseContentDetailsAPICall,
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
