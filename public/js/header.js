import { publish } from "./event-bus";
import { getUserPrivateData } from "./fetch-data";

let toggleBtn;
let toggleModeIcon;
let toggleModeText;
let logoImg;
let menusModal;
let profile;
let searchForm;
let searchFBox;
let userButton;

export function initHeaders() {
    toggleBtn = document.querySelector('#toggle-btn');
    toggleModeIcon = document.querySelector('#mode-icon');
    toggleModeText = document.querySelector('#mode-text');
    userButton = document.querySelector('#user-btn');
    logoImg = document.getElementsByClassName("logo-img");
    menusModal = document.querySelector('.header .flex .menus-modal');
    profile = document.querySelector('.header .flex .menus-modal .menus');
    searchForm = document.querySelector('.header .flex .search-form');
    searchFBox = document.getElementById('search_box');
    headerListeners();
    let darkMode = localStorage.getItem('dark-mode');
    if (darkMode === 'enabled') {
        enableDarkMode();
    }
}

export function updateProfileMenu(userLoggedIn) {
    let profileMenuPrivate = document.querySelectorAll('.header .flex .menus .private');
    let profileMenuOnlyPublic = document.querySelectorAll('.header .flex .menus .only-public');
    if (userLoggedIn) {
        console.log('user is logged in section');
        getUserPrivateData("zhcyWRZpJKZohfqSt6Xihyo4Awq2").then((userData) => {
            document.getElementById('user-photo-header').src = userData.userProfileSrc;
            document.getElementById('user-menu-photo').src = userData.userProfileSrc;
            document.getElementById('user-menu-name').innerHTML = userData.username;
            document.getElementById('user-menu-mail').innerHTML = userData.mailId;
            profileMenuPrivate.forEach((node) => { node.style.display = "block" });
            profileMenuOnlyPublic.forEach((node) => { node.style.display = "none" });
            document.getElementById('user-photo-header').style.display = "block";
            document.getElementById('guest-photo-header').style.display = "none";
        }).catch(() => { publish('pushPopupMessage', ["FAILURE", "Something went wrong, unable to load user profile."]); })
    } else {
        profileMenuPrivate.forEach((node) => { node.style.display = "none" });
        profileMenuOnlyPublic.forEach((node) => { node.style.display = "block" });
        document.getElementById('user-photo-header').style.display = "none";
        document.getElementById('guest-photo-header').style.display = "block";
    }




}

function headerListeners() {
    // static actions 
    profileButtonListeners();
    darkModeListeners();
    //trigger events
    document.getElementById('signOutButton').addEventListener('click', () => { removeMenuOptions(); publish('signOut'); });
}

function profileButtonListeners() {


    document.querySelector('#search-btn').onclick = () => {
        searchForm.classList.toggle('active');
        searchFBox.focus();
        removeMenuOptions();
    }


    userButton.onclick = () => {
        toggleMenuOptions();
        searchForm.classList.remove('active');
    }

    // window.onscroll = () => {
    // searchForm.classList.remove('active');
    //     removeMenuOptions();
    //     if (window.innerWidth < 1200) {
    //         // sideBar.classList.remove('active');
    //         document.body.classList.remove('active');

    //     }
    // }
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

function toggleMenuOptions() {
    profile.classList.toggle('active');
    // userButton.classList.toggle('fa-rotate-270');
    menusModal.classList.toggle('is-visible');
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
