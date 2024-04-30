import { getUserPublicData, updateUserData } from "./fetch-data";
import { getUid } from "./firebase-config";
import { getUserPrivateData, pushPopupMessage } from "./setup";

let staticLoaded = false;
var myProfile = {};
const dataFields = ["username", "about-me", "work", "location", "tech-stack", "facebook", "instagram", "linkedin", "github"];

export function initProfile(uid) {
    let myUid = getUid();
    if (!staticLoaded)
        initStaticContent();
    loadPublicProfile(uid, myUid);
    if (uid == myUid) {
        document.querySelectorAll('.profile .private').forEach(function (event) {
            event.classList.remove("disabled"); //TODO: not completed. continue from here.
        });
        loadPrivateProfile(uid);
    }
    else {
        document.querySelectorAll('.profile .private').forEach(function (event) {
            event.classList.add("disabled"); //TODO: not completed. continue from here.
        });
    }

}
function initStaticContent() {
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
                    pushPopupMessage(["SUCCESS", `${dataField} successfully updated.`]);
                })
                    .catch(() => { pushPopupMessage(["FAILURE", "Something went wrong, unable to save changes."]); });
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
    staticLoaded = true;
}

function loadPublicProfile(uid, myUid) {
    console.log("loading profile: ");
    console.log(uid);
    getUserPublicData(uid).then((data) => {
        console.log("data is here");
        console.log(data);
        if (myUid == uid)
            myProfile = data; //TODO: only on self profile
        setUserProfilePhoto(data.userProfileSrc);
        setUserRole(data.role);
        console.log(data);
        for (const dataField of dataFields) {
            let field = document.getElementById(dataField);
            let dataFieldElement = field.querySelector('.data-field');
            dataFieldElement.innerHTML = data[dataField];
        }

        // Read tutor data 
        if(data.tutorDetails){
            for (const property in data.tutorDetails.stats) {
                initUserActivities(property, data.tutorDetails.stats[property]);
            }
            createCoursesSection(data.tutorDetails.publishedCourses,'.box-container.published-courses' );
            document.querySelectorAll('.profile .tutor').forEach(function (event) {
                event.classList.remove("disabled"); //TODO: not completed. continue from here.
            });
        }else{
            document.querySelectorAll('.profile .tutor').forEach(function (event) {
                event.classList.add("disabled"); //TODO: not completed. continue from here.
            });
        }

    }).catch((e) => {
        console.log(e);
        pushPopupMessage(["FAILURE", "Something went wrong, unable to load profile."]);
    });

}

function loadPrivateProfile(uid) {

    getUserPrivateData(uid).then((data) => {
        for (const property in data.activities) {
            initUserActivities(property, data.activities[property]);
        }
        createCoursesSection(data.enrolledCourses,'.box-container.enrolled-courses' );
    }
    ).catch(() => {
        pushPopupMessage(["FAILURE", "Something went wrong, unable to load user private info."]);
    });
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

/* Teacher Section */

/* Private Section */
function initUserActivities(fieldId, fieldValue) {
    var field = document.getElementById(fieldId);
    var dataField = field.querySelector('h2');
    dataField.innerHTML = fieldValue;
}
function createCoursesSection(courses, rootElement) {
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

        // Append img, title, and link to the box div
        box.appendChild(img);
        box.appendChild(title);
        box.appendChild(link);

        // Append the box div to the container
        container.appendChild(box);
    });
}


