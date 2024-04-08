import { publish } from "./event-bus";
import { EVENTS } from "./const";
import { getUserPrivateData } from "./fetch-data";
import { getUid } from "./firebase-config";

// Toggle Button
const toggleBtn = document.querySelector('#toggle-btn');
const toggleModeIcon = document.querySelector('#mode-icon');
const toggleModeText = document.querySelector('#mode-text');

const userBtn = document.querySelector('#user-btn');
const logoImg = document.getElementsByClassName("logo-img");
const menusModal = document.querySelector('.header .flex .menus-modal');
const profile = document.querySelector('.header .flex .menus-modal .menus');

const profileMenuPrivate = document.querySelectorAll('.header .flex .menus .private');
const profileMenuOnlyPublic = document.querySelectorAll('.header .flex .menus .only-public');

export function initHeaders() {
    headerListeners();
    let darkMode = localStorage.getItem('dark-mode');
    if (darkMode === 'enabled') {
        enableDarkMode();
    }
}
function headerListeners() {
    // static actions 
    profileButtonListeners();
    darkModeListeners();
    //trigger events
    document.getElementById('signOutButton').addEventListener('click', () => { removeMenuOptions(); publish(EVENTS.SIGN_OUT); });
}

function profileButtonListeners() {
   
    userBtn.onclick = () => {
        toggleMenuOptions();
    }
}

function darkModeListeners() {
    toggleBtn.onclick = (e) => {
        let darkMode = localStorage.getItem('dark-mode');
        if (darkMode === 'disabled')
            enableDarkMode();
        else
            disableDarkMode();
    }
}

function enableDarkMode() {
    toggleBtn.classList.replace('fa-sun', 'fa-moon');
    toggleModeIcon.classList.replace('fa-moon', 'fa-sun');
    toggleModeText.innerHTML = "Enable Light Mode";
    logoImg[0].src = "/images/Logo/logo_dark.svg"
    document.body.classList.add('dark');
    localStorage.setItem('dark-mode', 'enabled');
}

function disableDarkMode() {
    toggleBtn.classList.replace('fa-moon', 'fa-sun');
    toggleModeIcon.classList.replace('fa-sun', 'fa-moon');
    toggleModeText.innerHTML = "Enable Dark Mode";
    logoImg[0].src = "/images/Logo/logo_light.svg"
    document.body.classList.remove('dark');
    localStorage.setItem('dark-mode', 'disabled');
}

export function removeMenuOptions() {
    menusModal.classList.remove('is-visible');
    profile.classList.remove('active');
}

export function closeMenuOptions(event) {
    if (event.target === menusModal) {
        removeMenuOptions();
    }
}

function toggleMenuOptions() {
    profile.classList.toggle('active');
    // userButton.classList.toggle('fa-rotate-270');
    menusModal.classList.toggle('is-visible');
}

export function updateProfileMenu(userLoggedIn) {
    if (userLoggedIn) {
        let uid = getUid();
    console.log("I am here: ");

        console.log(uid);
        getUserPrivateData(uid) // TODO: Use it from args
        .then((userData) => {
            document.getElementById('user-photo-header').src = userData.userProfileSrc;
            document.getElementById('user-menu-photo').src = userData.userProfileSrc;
            document.getElementById('user-menu-name').innerHTML = userData.username;
            document.getElementById('user-menu-mail').innerHTML = userData.mailId;
            profileMenuOnlyPublic.forEach((node) => { node.style.display = "none" });
            profileMenuPrivate.forEach((node) => { node.style.display = "block" });
            document.getElementById('user-photo-header').style.display = "block";
            document.getElementById('guest-photo-header').style.display = "none";
            document.getElementById('profile-link').href = "/profile/"+uid;

        }).catch(() => { publish(EVENTS.PUSH_POPUP_MESSAGE, ["FAILURE", "Something went wrong, unable to load user profile."]); })
    } else {
        profileMenuPrivate.forEach((node) => { node.style.display = "none" });
        profileMenuOnlyPublic.forEach((node) => { node.style.display = "block" });
        document.getElementById('user-photo-header').style.display = "none";
        document.getElementById('guest-photo-header').style.display = "block";
        document.getElementById('guest-menu-photo').src = "/images/profile/guest-user.svg";
    }
}