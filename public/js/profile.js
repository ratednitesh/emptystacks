import { publish } from "./event-bus";
import { getEnrolledCourses, getUserActivities, getUserPublicData, updateUserData } from "./fetch-data";

var userPublicProfile = {};

export function initProfile() {
    getUserPublicData().then((data) => {
        userPublicProfile = data;
        setUserProfilePhoto(data.userProfileSrc);
        setUserRole(data.role);
        console.log(data);
        for (const property in data) {
            if (property != 'userProfileSrc' && property != 'role') {
                initUserPublicProfile(property, data[property]);
                updateUserPublicProfile(property);
            }
        }
        console.log('profile loaded');
    }).catch(() => {
        publish('pushPopupMessage', ["FAILURE", "Something went wrong, unable to load profile."]);
    });
    getUserActivities().then((data) => {
        for (const property in data) {
            initUserActivities(property, data[property]);
        }
        console.log('activities loaded');
    }
    ).catch(() => {
        publish('pushPopupMessage', ["FAILURE", "Something went wrong, unable to load activities."]);
    });
    getEnrolledCourses().then(
        (enrolledCourses) => {
            createEnrolledCourses(enrolledCourses);
        }
    ).catch(() => {
        publish('pushPopupMessage', ["FAILURE", "Something went wrong, unable to load courses."]);
    });
}
function setUserProfilePhoto(userProfileSrc) {
    var userPhoto = document.getElementById('user-photo');
    userPhoto.src = userProfileSrc;
}
function setUserRole(role) {
    var userRole = document.getElementById('user-role');
    userRole.innerHTML = role;
}
function initUserPublicProfile(fieldId, fieldValue) {
    var field = document.getElementById(fieldId);
    var dataField = field.querySelector('.data-field');
    dataField.innerHTML = fieldValue;
}
function updateUserPublicProfile(fieldId) {
    var field = document.getElementById(fieldId);
    var editButton = field.querySelector('.edit');
    var confirmButton = field.querySelector('.check');
    var cancelButton = field.querySelector('.cross');
    var dataField = field.querySelector('.data-field');
    editButton.addEventListener("click", () => {
        dataField.contentEditable = true;
        dataField.classList.add("editable");
        editButton.classList.toggle('inactive');
        confirmButton.classList.toggle('inactive');
        cancelButton.classList.toggle('inactive');
    })
    confirmButton.addEventListener("click", () => {
        //TODO: add validations.
        userPublicProfile[fieldId] = dataField.innerHTML;
        updateUserData(userPublicProfile).then(() => {
            publish('pushPopupMessage', ["SUCCESS", `${fieldId} successfully updated.`]);
        })
            .catch(() => { publish('pushPopupMessage', ["FAILURE", "Something went wrong, unable to save changes."]); });
        dataField.contentEditable = false;
        dataField.classList.remove("editable");
        editButton.classList.toggle('inactive');
        confirmButton.classList.toggle('inactive');
        cancelButton.classList.toggle('inactive');
    });
    cancelButton.addEventListener("click", () => {
        dataField.innerHTML = userPublicProfile[fieldId];

        dataField.contentEditable = false;
        dataField.classList.remove("editable");

        editButton.classList.toggle('inactive');
        confirmButton.classList.toggle('inactive');
        cancelButton.classList.toggle('inactive');
    });
}

function initUserActivities(fieldId, fieldValue) {
    var field = document.getElementById(fieldId);
    var dataField = field.querySelector('h3');
    dataField.innerHTML = fieldValue;
}

function createEnrolledCourses(enrolledCourses) {
    // Select the box-container element
    const container = document.querySelector('.box-container.enrolled-courses');

    // Iterate over the enrolledCourses array
    enrolledCourses.forEach(course => {
        // Create a new box div element
        const box = document.createElement('div');
        box.classList.add('box');

        // Create an img element for the thumbnail
        const img = document.createElement('img');
        img.src = course.thumbnail;
        img.classList.add('thumb');
        img.alt = '';

        // Create an h3 element for the title
        const title = document.createElement('h3');
        title.classList.add('title');
        title.textContent = course.title;

        const link = document.createElement('a');
        link.href = course.href;
        link.textContent = 'View Course';
        link.classList.add('inline-btn');
        // Add the onclick event for routing
        link.onclick = route;

        // Append img, title, and link to the box div
        box.appendChild(img);
        box.appendChild(title);
        box.appendChild(link);

        // Append the box div to the container
        container.appendChild(box);
    });
}


