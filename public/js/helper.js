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
export function pushPopupMessage(data) {
    let el = document.createElement('DIV');
    el.classList.add('popup');
    el.innerHTML = data[1];
    let color;
    switch (data[0]) {
        case 'SUCCESS': color = "#38c464"; break;
        case 'FAILURE': color = "#c5503b"; break;
        case 'WARNING': color = "#eab735"; break;
        case 'INFO': color = "#33a6e8";
    }
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
                    subscribe('initProfile', module.initProfile);
                    resolve();
                });

            else if (page == "course")
                import('./course.js').then(module => {
                    subscribe('loadCourseDetails', module.loadCourseDetails);
                    resolve();
                });
            else if (page == "content")
                import('./content.js').then(module => {
                    console.log("loading content");
                    subscribe('loadCourseContent', module.loadCourseContent);
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
