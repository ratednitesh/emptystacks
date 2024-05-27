import { USER_PRIVATE_COLLECTION, USER_PUBLIC_COLLECTION, getUid, readDocument, updateDocument } from "./firebase-config";
import { notification } from "./helper";

var myProfile = {};
const dataFields = ["username", "about-me", "work", "location", "tech-stack", "facebook", "instagram", "linkedin", "github"];
const profileDiv = document.querySelector('#profile');

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
                //TODO: add validations for fields change old value = new value
                var newValue = dataFieldElement.innerHTML;
                //Validations
                if (newValue.length > 30) {
                    notification(313, 30);
                } else {
                    myProfile[dataField] = newValue;
                    updateDocument(USER_PUBLIC_COLLECTION, getUid(), { [dataField]: newValue }).then(() => {
                        notification(202, dataField);
                    })
                        .catch(() => { notification(502); });
                    dataFieldElement.contentEditable = false;
                    dataFieldElement.classList.remove("editable");
                    editIcon.classList.toggle('inactive');
                    checkIcon.classList.toggle('inactive');
                    crossIcon.classList.toggle('inactive');
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
    console.log(uid + " " + type);
    let myUid = getUid();
    if (uid == myUid) {
        if (type == 'only-course') {
            document.querySelector('.my-courses').classList.remove('disabled');
            document.querySelectorAll('.not-my-courses').forEach(function (event) {
                event.classList.add("disabled");
            });
        }
        else {
            document.querySelectorAll('.not-my-courses').forEach(function (event) {
                event.classList.remove("disabled");
            });
            profileDiv.querySelectorAll('.private').forEach(function (event) {
                event.classList.remove("disabled");
            });
        }
        loadPublicProfile(uid, 1);
        loadPrivateProfile(uid);
    }
    else {
        document.querySelectorAll('.not-my-courses').forEach(function (event) {
            event.classList.remove("disabled");
        });
        profileDiv.querySelectorAll('.private').forEach(function (event) {
            event.classList.add("disabled");
        });
        loadPublicProfile(uid, 0);
    }


}
// load public profile
function loadPublicProfile(uid, isMyProfile) {
    readDocument(USER_PUBLIC_COLLECTION, uid).then((data) => {
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
            createCoursesSection(data.tutorDetails.publishedCourses, '.flex-container.published-courses', 'published');
            profileDiv.querySelectorAll('.tutor').forEach(function (event) {
                event.classList.remove("disabled");
            });
        } else {
            profileDiv.querySelectorAll('.tutor').forEach(function (event) {
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
    readDocument(USER_PRIVATE_COLLECTION, uid).then((data) => {
        for (const property in data.activities) {
            initUserActivities(property, data.activities[property]);
        }
        createCoursesSection(data.enrolledCourses, '.flex-container.enrolled-courses', 'enrolled');
    }
    ).catch(() => {
        notification(501, 'user private profile');
    });
}
// load my profile
// load my courses
export function loadMyCourses() {
    let uid = getUid();
    loadProfile(uid, 'only-course');

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
    // Select the flex-container element
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
        img.classList.add('thumb-md');
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