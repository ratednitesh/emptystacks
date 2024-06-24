import { notification, publish } from "./helper";
import { getTutorDetails, getUserId, getUserPrivateProfile, getUserPublicProfile, updateMyPublicProfile } from "./db-services";
import { modifyDisabledClass, showCoursesUI } from "./ui-services";

var myProfile = {};
const dataFields = ["displayName", "aboutMe", "work", "location", "techStack", "facebook", "instagram", "linkedin", "github"];
const profileDiv = document.querySelector('#profile');
const inProgressCourses = {};
const completedCourses = {};
const likedTutorials = {};
// Initializers and Listeners: Profile 
export function initProfile() {
    for (const dataField of dataFields) {
        let field = document.getElementById(dataField);
        let dataFieldElement;
        if (dataField == "displayName") {
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
                var newValue = dataFieldElement.innerHTML;
                //Validations
                if (newValue.length > 30) {
                    notification(313, 30);
                } else {
                    dataFieldElement.contentEditable = false;
                    dataFieldElement.classList.remove("editable");
                    editIcon.classList.toggle('inactive');
                    checkIcon.classList.toggle('inactive');
                    crossIcon.classList.toggle('inactive');
                    if (newValue == myProfile[dataField]) {
                        notification(202, dataField);
                    } else {
                        myProfile[dataField] = newValue;
                        updateMyPublicProfile({ [dataField]: newValue }).then(() => {
                            notification(202, dataField);
                        })
                            .catch(() => { notification(502); });
                    }
                }
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
    let myUid = getUserId();
    if (uid == myUid) {
        if (type == 'only-course') {
            modifyDisabledClass(document.querySelector('.my-courses'),0);
            document.querySelectorAll('.not-my-courses').forEach(function (event) {
                modifyDisabledClass(event,1);
            });
        }
        else {
            document.querySelectorAll('.not-my-courses').forEach(function (event) {
                modifyDisabledClass(event,0);
            });
            profileDiv.querySelectorAll('.private').forEach(function (event) {
                modifyDisabledClass(event,0);
            });
        }
        loadPublicProfile(uid, 1);
        loadPrivateProfile(uid);
    }
    else {
        document.querySelectorAll('.not-my-courses').forEach(function (event) {
            modifyDisabledClass(event,0);
        });
        profileDiv.querySelectorAll('.private').forEach(function (event) {
            modifyDisabledClass(event,1);
        });
        loadPublicProfile(uid, 0);
    }


}
// load public profile
function loadPublicProfile(uid, isMyProfile) {
    getUserPublicProfile(uid).then((data) => {
        if (isMyProfile)
            myProfile = data;
        setUserProfilePhoto(data.photoURL);
        setUserRole(data.role);
        for (const dataField of dataFields) {
            let field = document.getElementById(dataField);
            let dataFieldElement = field.querySelector('.data-field');
            dataFieldElement.innerHTML = data[dataField];
        }
        // Read tutor data 
        if (data.role == 'Stack Builder') {
            profileDiv.querySelectorAll('.tutor').forEach(function (event) {
                modifyDisabledClass(event,0);
            });
            getTutorDetails(uid).then(
                (tutorData) => {
                    if (Object.keys(tutorData).length != 0) {
                        for (const property in tutorData.stats) {
                            initUserActivities(property, tutorData.stats[property]);
                        }
                        createCoursesSection(tutorData.publishedCourses, '.flex-container.published-courses', 'published-');
                    }
                }
            ).catch((e) => {
                console.error(e);
                notification(501, 'tutor profile');
            })
        } else {
            profileDiv.querySelectorAll('.tutor').forEach(function (event) {
                modifyDisabledClass(event,1);
            });
        }
    }).catch((e) => {
        console.error(e);
        notification(501, 'profile');
    });

}

// load private profile
function loadPrivateProfile() {
    getUserPrivateProfile().then((data) => {

        for (const [courseKey, courseDetails] of Object.entries(data.enrolledCourses)) {
            if (courseDetails.status === "In Progress") {
                inProgressCourses[courseKey] = courseDetails;
            } else if (courseDetails.status === "Completed") {
                completedCourses[courseKey] = courseDetails;
            }
        }
        for (const [chapterKey, chapterDetails] of Object.entries(data.likedTutorials)) {
            if (chapterDetails.status == 'liked')
                likedTutorials[chapterKey] = chapterDetails;
        }
        let activities = {
            "saved-courses": Object.keys(inProgressCourses).length,
            "liked-tutorials": Object.keys(likedTutorials).length,
            "completed-courses": Object.keys(completedCourses).length,
        };
        for (const property in activities) {
            initUserActivities(property, activities[property]);
        }
        createCoursesSection(data.enrolledCourses, '.flex-container.enrolled-courses', 'enrolled-');
    }
    ).catch((e) => {
        console.error(e);
        notification(501, 'user private profile');
    });
}
// load my profile
// load my courses
export function loadMyCourses() {
    let uid = getUserId();
    if (uid)
        loadProfile(uid, 'only-course');
    else
        publish('notFoundRoute');

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
function createCoursesSection(courseObjects, rootElement, type) {
    const container = document.querySelector(rootElement);
    container.innerHTML = "";
    showCoursesUI(courseObjects, rootElement, type);
}