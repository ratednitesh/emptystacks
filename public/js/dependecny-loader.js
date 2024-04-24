import { subscribe } from './event-bus.js';

export async function initAddOn(page) {
    return new Promise((resolve, reject) => {
        try {
            console.log('loading additional js files: ' + page);
            if (page == "home")

                import('./home.js').then(module => {
                    console.log("import done for home");
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