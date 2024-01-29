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

let sideBar = document.querySelector('.side-bar');
document.querySelector('#menu-btn').onclick = () => {
    sideBar.classList.toggle('active');
    body.classList.toggle('active');

}
document.querySelector('.side-bar .close-side-bar').onclick = () => {
    sideBar.classList.remove('active');
    body.classList.remove('active');

}
window.onscroll = () => {
    profile.classList.remove('active');
    searchForm.classList.remove('active');
    if (window.innerWidth < 1200) {
        sideBar.classList.remove('active');
        body.classList.remove('active');

    }
}

let toggleBtn = document.querySelector('#toggle-btn');
let darkMode = localStorage.getItem('dark-mode');

const enableDarkMode = () => {
    toggleBtn.classList.replace('fa-sun', 'fa-moon');
    body.classList.add('dark');
    localStorage.setItem('dark-mode', 'enabled');
}

const disableDarkMode = () => {
    toggleBtn.classList.replace('fa-moon', 'fa-sun');
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

var expandItems = document.querySelectorAll('.expand');

function expandAll() {
    var accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(function (item) {
        item.classList.add('active');
    });
    expandItems.forEach(function (expandItem) {
        expandItem.classList.replace('fa-angle-down', 'fa-angle-up');
    });
    document.getElementById("collapse-button").hidden = false;
    document.getElementById("expand-button").hidden = true;

}
function collapseAll() {
    var accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(function (item) {
        item.classList.remove('active');

    });
    expandItems.forEach(function (expandItem) {
        expandItem.classList.replace('fa-angle-up', 'fa-angle-down');
    });
    document.getElementById("collapse-button").hidden = true;
    document.getElementById("expand-button").hidden = false;
}

document.querySelectorAll('.accordion-header').forEach(function (header) {
    header.addEventListener('click', function () {
        var item = this.parentNode;
        item.classList.toggle('active');
        if (this.children[0].children[1].classList[2] == 'fa-angle-down')
            this.children[0].children[1].classList.replace('fa-angle-down', 'fa-angle-up');
        else
            this.children[0].children[1].classList.replace('fa-angle-up', 'fa-angle-down');

    });
});

const enrolledCourses = document.querySelectorAll(".book .cover");
// enrolledCourses.forEach((enrolledCourse, i=0)=>{console.log(enrolledCourse.style);console.log(i);enrolledCourse.style.zIndex=i++;});
let index =0;
if(enrolledCourses.length != 0)
enrolledCourses[index].classList.add("visible");
// enrolledCourses[index].style.display="block";

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
if(nextBtn!=null)
nextBtn.addEventListener("click", (_) => {

    enrolledCourses[index].classList.replace('visible','hidden');
        if(index== enrolledCourses.length-1){
            index=-1;
        }
        enrolledCourses[++index].classList.replace('hidden','visible');
});
if(prevBtn!=null)
prevBtn.addEventListener("click", (_) => {

    enrolledCourses[index].classList.replace('visible','hidden');
    if(index== 0){
        index=enrolledCourses.length;
    }
    enrolledCourses[--index].classList.replace('hidden','visible');

});

// Assuming you have the necessary HTML structure
document.querySelectorAll(".sub-menu > a").forEach(function (link) {
    link.addEventListener("click", function (e) {
      // Close all other sub-menus
      document.querySelectorAll(".sidebar .sub-menu ul").forEach(function (submenu) {
        if (submenu !== link.nextElementSibling) {
          submenu.style.display = "none";
        }
      });
//   console.log(link.nextElementSibling.style.display);
      // Toggle the visibility of the clicked sub-menu
      if (link.nextElementSibling.style.display =="" || link.nextElementSibling.style.display == "none") {
        link.nextElementSibling.style.display = "block";
      } else {
        link.nextElementSibling.style.display = "none";
      }
  
      // Prevent the click event from propagating up the DOM hierarchy
      e.stopPropagation();
    });
  });
  