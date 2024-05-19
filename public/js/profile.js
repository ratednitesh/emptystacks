import { getUid } from "./firebase-config";
import { getUserPrivateData } from "./setup";
import { notification, updateUserData } from "./helper";

var myProfile = {};
const dataFields = ["username", "about-me", "work", "location", "tech-stack", "facebook", "instagram", "linkedin", "github"];

// Initializers and Listeners: Profile 
export function initProfile() {
    for (const dataField of dataFields) {
        let field = document.getElementById(dataField);
        let dataFieldElement;
        if (dataField == "username") {
            dataFieldElement = document.createElement("h2");
            dataFieldElement.classList.add("data-field");
        }
        else {
            dataFieldElement = document.createElement("span");
            dataFieldElement.classList.add("data-field");
        }
        let editIcon = document.createElement("i");
        editIcon.classList.add("edit", "edit-field", "es-pencil", "private");
        let checkIcon = document.createElement("i");
        checkIcon.classList.add("check", "inactive", "edit-field", "es-ok", "private");
        let crossIcon = document.createElement("i");
        crossIcon.classList.add("cross", "inactive", "edit-field", "es-cancel", "private");
        field.appendChild(dataFieldElement);
        field.appendChild(editIcon);
        field.appendChild(checkIcon);
        field.appendChild(crossIcon);
        (() => {
            editIcon.addEventListener("click", () => {
                dataFieldElement.contentEditable = true;
                dataFieldElement.classList.add("editable");
                editIcon.classList.toggle('inactive');
                checkIcon.classList.toggle('inactive');
                crossIcon.classList.toggle('inactive');
            })
            checkIcon.addEventListener("click", () => {
                //TODO: add validations for fields change
                myProfile[dataField] = dataFieldElement.innerHTML;
                updateUserData("uid", myProfile).then(() => {
                    notification(202, dataField);
                })
                    .catch(() => { notification(502); });
                dataFieldElement.contentEditable = false;
                dataFieldElement.classList.remove("editable");
                editIcon.classList.toggle('inactive');
                checkIcon.classList.toggle('inactive');
                crossIcon.classList.toggle('inactive');
            });
            crossIcon.addEventListener("click", () => {
                dataFieldElement.innerHTML = myProfile[dataField];
                dataFieldElement.contentEditable = false;
                dataFieldElement.classList.remove("editable");
                editIcon.classList.toggle('inactive');
                checkIcon.classList.toggle('inactive');
                crossIcon.classList.toggle('inactive');
            });
        })();
    }
    document.querySelector(".profile-acc-sett").addEventListener('click', () =>
        document.querySelector(".acc-sett-modal").classList.add('is-visible'));
}

// Load profile
export function loadProfile(uid, type) {
    if (type == 'only-course')
        document.querySelectorAll('.not-my-courses').forEach(function (event) {
            event.classList.add("disabled");
        });
    else
        document.querySelectorAll('.not-my-courses').forEach(function (event) {
            event.classList.remove("disabled");
        });
    console.log('here');
    let myUid = getUid();
    if (uid == myUid) {
        document.querySelectorAll('.profile .private').forEach(function (event) {
            event.classList.remove("disabled");
        });
        loadPublicProfile(uid, 1);
        loadPrivateProfile(uid);
    }
    else {
        document.querySelectorAll('.profile .private').forEach(function (event) {
            event.classList.add("disabled");
        });
        loadPublicProfile(uid, 0);
    }
}
// load public profile
function loadPublicProfile(uid, isMyProfile) {
    getUserPublicData(uid).then((data) => {
        if (isMyProfile)
            myProfile = data;
        setUserProfilePhoto(data.userProfileSrc);
        setUserRole(data.role);
        for (const dataField of dataFields) {
            let field = document.getElementById(dataField);
            let dataFieldElement = field.querySelector('.data-field');
            dataFieldElement.innerHTML = data[dataField];
        }
        // Read tutor data 
        if (data.tutorDetails) {
            for (const property in data.tutorDetails.stats) {
                initUserActivities(property, data.tutorDetails.stats[property]);
            }
            createCoursesSection(data.tutorDetails.publishedCourses, '.box-container.published-courses', 'published');
            document.querySelectorAll('.profile .tutor').forEach(function (event) {
                event.classList.remove("disabled");
            });
        } else {
            document.querySelectorAll('.profile .tutor').forEach(function (event) {
                event.classList.add("disabled");
            });
        }
        // TODO:  publish('notFoundRoute');

    }).catch((e) => {
        console.log(e);
        notification(501, 'profile');
    });

}

// load private profile
function loadPrivateProfile(uid) {

    getUserPrivateData(uid).then((data) => {
        for (const property in data.activities) {
            initUserActivities(property, data.activities[property]);
        }
        createCoursesSection(data.enrolledCourses, '.box-container.enrolled-courses', 'enrolled');
    }
    ).catch(() => {
        notification(501, 'user private profile');
    });
}
// load my profile
// load my courses
export function loadMyCourses() {

    loadProfile(getUid(), 'only-course');

}

/* Public Section */
function setUserProfilePhoto(userProfileSrc) {
    var userPhoto = document.getElementById('user-photo');
    userPhoto.src = userProfileSrc;
}
function setUserRole(role) {
    var userRole = document.getElementById('user-role');
    userRole.innerHTML = role;
}

/* Private Section */
function initUserActivities(fieldId, fieldValue) {
    var field = document.getElementById(fieldId);
    var dataField = field.querySelector('h2');
    dataField.innerHTML = fieldValue;
}
function createCoursesSection(courses, rootElement, type) {
    // Select the box-container element
    const container = document.querySelector(rootElement);
    container.innerHTML = "";
    // Iterate over the courses array
    courses.forEach(course => {
        // Create a new box div element
        const box = document.createElement('div');
        box.classList.add('box');

        // Create an img element for the thumbnail
        const img = document.createElement('img');
        img.src = course.thumbnail;
        img.classList.add('thumb');
        img.alt = '';

        // Create an h2 element for the title
        const title = document.createElement('h2');
        title.classList.add('title');
        title.textContent = course.title;

        const link = document.createElement('a');
        link.href = course.href;
        link.textContent = 'View Course';
        link.classList.add('inline-btn');
        // Add the onclick event for routing
        link.onclick = route;
        box.appendChild(img);
        if (type == 'enrolled') {
            const progressDiv = document.createElement('div');
            progressDiv.classList.add('progress-bar-container');
            const progressBar = document.createElement('div');
            progressBar.classList.add('progress-bar');
            let percent = (course.chaptersCompleted.length / course.totalChapters) * 100;
            console.log(percent);
            progressBar.style.width = percent + '%';
            progressDiv.appendChild(progressBar);
            box.appendChild(progressDiv);
        }
        box.appendChild(title);
        box.appendChild(link);

        // Append the box div to the container
        container.appendChild(box);
    });
}

// TODO: Potentially need to remove following function */
async function importMockApi() {
    try {
        const { mockgetUserDataAPICall } = await import('/public/test/mock-api.js');
        return {
            mockgetUserDataAPICall,

        };
    } catch (error) {
        console.error('Error importing mock API:', error);
        throw error;
    }
}
async function getUserPublicData(uid) {
    const mockApi = await importMockApi();
    return new Promise((resolve, reject) => {

        // Simulate an API call
        mockApi.mockgetUserDataAPICall(uid)
            .then(response => {
                //TODO: Store the API response in the cachedData object
                resolve(response); // Resolve with the API response
            })
            .catch(error => {
                reject(error); // Reject with the error from the API call
            });
    });
}
