import { subscribe } from './event-bus.js';

export async function initAddOn(page) {
    if (page == "home")
        try {
            import('./home.js').then(module => {
                subscribe('updateQuickSelectOptions', module.updateQuickSelectOptions);
                subscribe('loadHome', module.loadHome);
                subscribe('unloadHome', module.unloadHome);
            });
        } catch (error) {
            console.error('Error importing home js:', error);
            throw error;
        }
    else if (page == "profile")
        try {
            import('./profile.js').then(module => {
                subscribe('initProfile', module.initProfile);
            });
        } catch (error) {
            console.error('Error importing profile js:', error);
            throw error;
        }
    else if (page == "course")
        try {
            import('./course.js').then(module => {
                subscribe('loadCourseDetails', module.loadCourseDetails);
            });
        } catch (error) {
            console.error('Error importing course js:', error);
            throw error;
        }
}