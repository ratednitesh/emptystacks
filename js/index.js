let body = document.body;
let profile = document.querySelector('.header .flex .profile');
document.querySelector('#user-btn').onclick = () => {
    profile.classList.toggle('active');
    searchForm.classList.remove('active');
}
let searchForm = document.querySelector('.header .flex .search-form');
document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
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
let logoImg = document.getElementsByClassName("logo-img");
let darkMode = localStorage.getItem('dark-mode');

const enableDarkMode = () => {
    toggleBtn.classList.replace('fa-sun', 'fa-moon');
    logoImg[0].src="images/Logo/logo_dark.svg"
    body.classList.add('dark');
    localStorage.setItem('dark-mode', 'enabled');
}

const disableDarkMode = () => {
    toggleBtn.classList.replace('fa-moon', 'fa-sun');
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
