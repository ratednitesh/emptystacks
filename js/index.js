let body = document.body;
let profile = document.querySelector('.header .flex .menus');
let userLoggedIn = true;
function updateProfileMenu(){
    let profileMenuPrivate = document.querySelectorAll('.header .flex .menus .private');
    profileMenuPrivate.forEach((node)=>{if(!userLoggedIn)node.style.display="none";else node.style.display="block"});
    let profileMenuOnlyPublic = document.querySelectorAll('.header .flex .menus .only-public');
    profileMenuOnlyPublic.forEach((node)=>{if(userLoggedIn)node.style.display="none";else node.style.display="block"});
}
updateProfileMenu();

function signOut(){
    userLoggedIn= false;
    updateProfileMenu();
}
document.querySelector('#user-btn').onclick = () => {
    profile.classList.toggle('active');
    searchForm.classList.remove('active');
}
let searchForm = document.querySelector('.header .flex .search-form');
let searchFBox = document.getElementById('search_box');

document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    searchFBox.focus();
    profile.classList.remove('active');
}


window.onscroll = () => {
    profile.classList.remove('active');
    searchForm.classList.remove('active');
    if (window.innerWidth < 1200) {
        // sideBar.classList.remove('active');
        body.classList.remove('active');

    }
}

let toggleBtn = document.querySelector('#toggle-btn');
let toggleModeIcon = document.querySelector('#mode-icon');
let toggleModeText = document.querySelector('#mode-text');

let logoImg = document.getElementsByClassName("logo-img");
let darkMode = localStorage.getItem('dark-mode');

const enableDarkMode = () => {
    toggleBtn.classList.replace('fa-sun', 'fa-moon');
    toggleModeIcon.classList.replace('fa-moon','fa-sun');
    toggleModeText.innerHTML="Enable Light Mode";
    logoImg[0].src="images/Logo/logo_dark.svg"
    body.classList.add('dark');
    localStorage.setItem('dark-mode', 'enabled');
}

const disableDarkMode = () => {
    toggleBtn.classList.replace('fa-moon', 'fa-sun');
    toggleModeIcon.classList.replace('fa-sun','fa-moon');
    toggleModeText.innerHTML="Enable Dark Mode";
    logoImg[0].src="images/Logo/logo.svg"
    body.classList.remove('dark');
    localStorage.setItem('dark-mode', 'disabled');
}

if (darkMode === 'enabled') {
    enableDarkMode();
}

toggleBtn.onclick = (e) => {
    let darkMode = localStorage.getItem('dark-mode');
    if (darkMode === 'disabled')
        enableDarkMode();
    else
        disableDarkMode();
}
