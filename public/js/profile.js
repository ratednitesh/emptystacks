var userPublicProfile = {
    "username": "Nitesh S.",
    "about-me": "I am a curious little kid.",
    "work": "Vice President",
    "location": "India",
    "tech-stack": "JAVA Developer",
    "facebook": "ratednitesh",
    "instagram": "ratednitesh",
    "linkedin": "ratednitesh",
    "github": ""
};

var actvities = {
    "saved-courses": "43",
    "liked-tutorials": "23",
    "total-comments": "12"
};
var enrolledCourses = [
    {
        "thumbnail": "images/thumbnails/thumbnail sample.jpg",
        "title": "Solving LeetCode Questions",
        "href": "/playlist"
    },
    {
        "thumbnail": "images/thumbnails/thumbnail sample.jpg",
        "title": "Solving LeetCode Questions",
        "href": "/playlist"
    }, {
        "thumbnail": "images/thumbnails/thumbnail sample.jpg",
        "title": "Solving LeetCode Questions",
        "href": "/playlist"
    }
];
const userProfileSrc = "images/profile/user.jpg";
export function initProfile() {
    setUserProfilePhoto();
    for (const property in userPublicProfile) {
        initUserPublicProfile(property);
        updateUserPublicProfile(property);
    }
    for (const property in actvities) {
        initUserActivities(property);
    }
    createEnrolledCourses(enrolledCourses);
}
function setUserProfilePhoto() {
    var userPhoto = document.getElementById('user-photo');
    userPhoto.src = userProfileSrc;
}
function initUserPublicProfile(fieldId) {
    var field = document.getElementById(fieldId);
    var dataField = field.querySelector('.data-field');
    dataField.innerHTML = userPublicProfile[fieldId];
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
        // dataField.style.backgroundColor = "#eee"; 
        // dataField.style.color= "#000";
        editButton.classList.toggle('inactive');
        confirmButton.classList.toggle('inactive');
        cancelButton.classList.toggle('inactive');
    })
    confirmButton.addEventListener("click", () => {
        //add validations.
        userPublicProfile[fieldId] = dataField.innerHTML; // TODO: Backend call
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

function initUserActivities(fieldId) {
    var field = document.getElementById(fieldId);
    var dataField = field.querySelector('h3');
    dataField.innerHTML = actvities[fieldId];
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
        
        // Create a link element for the playlist
        const link = document.createElement('a');
        link.href = course.href;
        link.textContent = 'View Playlist';
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


