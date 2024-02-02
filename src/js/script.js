let bannerInterval;
function loadHome() {

    const enrolledCourses = document.querySelectorAll(".book .cover");
    // enrolledCourses.forEach((enrolledCourse, i=0)=>{console.log(enrolledCourse.style);console.log(i);enrolledCourse.style.zIndex=i++;});
    let index = 0;
    if (enrolledCourses.length != 0)
        enrolledCourses[index].classList.add("visible");
    // enrolledCourses[index].style.display="block";

    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");
    if (nextBtn != null)
        nextBtn.addEventListener("click", (_) => {
            enrolledCourses[index].classList.replace('visible', 'hidden');
            if (index == enrolledCourses.length - 1) {
                index = -1;
            }
            enrolledCourses[++index].classList.replace('hidden', 'visible');
        });
    if (prevBtn != null)
        prevBtn.addEventListener("click", (_) => {

            enrolledCourses[index].classList.replace('visible', 'hidden');
            if (index == 0) {
                index = enrolledCourses.length;
            }
            enrolledCourses[--index].classList.replace('hidden', 'visible');

        });

        let i=1;
    bannerInterval=  setInterval(()=>{showSlide(i++);if(i>3)i=1;},2500);
    showSlide(1);
}
function unloadHome(){
    clearInterval(bannerInterval);
}
function loadCourseDetails() {
    

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
  
}
function loadMainSidebar() {
    let menuBtn = document.querySelector('#menu-btn');
    menuBtn.style.display = "inline-block";
    let sideBar = document.querySelector('.side-bar');
    sideBar.classList.remove('active');
    body.classList.remove('active');
    document.querySelector('#menu-btn').onclick = () => {
        sideBar.classList.toggle('active');
        body.classList.toggle('active');

    }
    document.querySelector('.side-bar .close-side-bar').onclick = () => {
        sideBar.classList.remove('active');
        body.classList.remove('active');

    }
}


function loadContentSidebar() {
    let sideBar = document.querySelector('.side-bar');
    let menuBtn = document.querySelector('#menu-btn');
    menuBtn.style.display = "inline-block";

    sideBar.classList.add('active');
    body.classList.add('active');
    document.querySelector('#menu-btn').onclick = () => {
        sideBar.classList.toggle('active');
        body.classList.toggle('active');

    }
    document.querySelector('.side-bar .close-side-bar').onclick = () => {
        sideBar.classList.remove('active');
        body.classList.remove('active');

    }
     // Assuming you have the necessary HTML structure
     subMenus = document.querySelectorAll(".sub-menu > a");
     subMenus.forEach(function (link) {
         link.addEventListener("click", function (e) {
             // Close all other sub-menus
             document.querySelectorAll(".sidebar .sub-menu ul").forEach(function (submenu) {
                 if (submenu !== link.nextElementSibling) {
                     submenu.style.display = "none";
                 }
             });
             // Toggle the visibility of the clicked sub-menu
             if (link.nextElementSibling.style.display == "" || link.nextElementSibling.style.display == "none") {
                 link.nextElementSibling.style.display = "block";
             } else {
                 link.nextElementSibling.style.display = "none";
             }
 
             // Prevent the click event from propagating up the DOM hierarchy
             e.stopPropagation();
         });
     });
}

function unloadSideBar() {
    document.getElementById("side-bar").innerHTML = "";
    body.classList.remove('active');
    let menuBtn = document.querySelector('#menu-btn');
    menuBtn.style.display = "none";

}

function loadContentMainSection() {
   
}

function expandAll() {
    var expandItems = document.querySelectorAll('.expand');

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
    var expandItems = document.querySelectorAll('.expand');

    accordionItems.forEach(function (item) {
        item.classList.remove('active');

    });
    expandItems.forEach(function (expandItem) {
        expandItem.classList.replace('fa-angle-up', 'fa-angle-down');
    });
    document.getElementById("collapse-button").hidden = true;
    document.getElementById("expand-button").hidden = false;
}

function showSlide(n){
    setSlide(index= n);

}

function setSlide(index){
    let slides = document.querySelectorAll('.banner-slide');
    let dots = document.querySelectorAll(".slider .fa-circle");
    if(index> slides.length)
        index=1;
    if(index<1)
        index=slides.length;
    dots.forEach((node,i)=>{  if(index-1==i)node.classList.replace('fa-regular','fa-solid');else node.classList.replace('fa-solid','fa-regular');})
    slides.forEach((node,i)=>{  if(index-1==i)node.style.display="block";else node.style.display="none";})

}