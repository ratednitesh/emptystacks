import { publish } from "./event-bus";

let toggleBtn;
let toggleModeIcon;
let toggleModeText;
let logoImg;

export function initHeaders() {
    toggleBtn = document.querySelector('#toggle-btn');
    toggleModeIcon = document.querySelector('#mode-icon');
    toggleModeText = document.querySelector('#mode-text');
    logoImg = document.getElementsByClassName("logo-img");
    headerListeners();
    let darkMode = localStorage.getItem('dark-mode');
    if (darkMode === 'enabled') {
        enableDarkMode();
    }
}

export function updateProfileMenu(userLoggedIn) {
    let profileMenuPrivate = document.querySelectorAll('.header .flex .menus .private');
    profileMenuPrivate.forEach((node) => { if (!userLoggedIn) node.style.display = "none"; else node.style.display = "block" });
    let profileMenuOnlyPublic = document.querySelectorAll('.header .flex .menus .only-public');
    profileMenuOnlyPublic.forEach((node) => { if (userLoggedIn) node.style.display = "none"; else node.style.display = "block" });
}

function headerListeners() {
    // static actions 
    profileButtonListeners();
    darkModeListeners();
    //trigger events
    document.getElementById('signOutButton').addEventListener('click', () => { publish('signOut') });
}

function profileButtonListeners() {
    let profile = document.querySelector('.header .flex .menus');
    let searchForm = document.querySelector('.header .flex .search-form');
    let searchFBox = document.getElementById('search_box');

    document.querySelector('#search-btn').onclick = () => {
        searchForm.classList.toggle('active');
        searchFBox.focus();
        profile.classList.remove('active');
    }


    document.querySelector('#user-btn').onclick = () => {
        profile.classList.toggle('active');
        searchForm.classList.remove('active');
    }

    window.onscroll = () => {
        profile.classList.remove('active');
        searchForm.classList.remove('active');
        if (window.innerWidth < 1200) {
            // sideBar.classList.remove('active');
            document.body.classList.remove('active');

        }
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

function enableDarkMode () {
    toggleBtn.classList.replace('fa-sun', 'fa-moon');
    toggleModeIcon.classList.replace('fa-moon', 'fa-sun');
    toggleModeText.innerHTML = "Enable Light Mode";
    logoImg[0].src = "images/Logo/logo_dark.svg"
    document.body.classList.add('dark');
    localStorage.setItem('dark-mode', 'enabled');
}
function disableDarkMode() {
    toggleBtn.classList.replace('fa-moon', 'fa-sun');
    toggleModeIcon.classList.replace('fa-sun', 'fa-moon');
    toggleModeText.innerHTML = "Enable Dark Mode";
    logoImg[0].src = "images/Logo/logo_light.svg"
    document.body.classList.remove('dark');
    localStorage.setItem('dark-mode', 'disabled');
}