import { loadPopularCourses } from "./common";
import { publish } from "./event-bus";
import { loginStatus } from "./manage-auth";
import { getTopStreams, getUserPrivateData } from "./fetch-data";
import { loadSignUpForm } from "./user-auth-modal";
var slideImagesSrc = ['/images/banners/1.jpg', '/images/banners/2.jpg', '/images/banners/3.jpg'];
let bannerInterval;
let sideBar;
export function loadHome(args) {
    if(args !='only-course'){
        document.querySelector('.quick-select').style.display="block";
        document.querySelector('.highlight-section').style.display="block";
        loadBanner();
        loadQuickSelect();
    }else{
        document.querySelector('.quick-select').style.display="none";
        document.querySelector('.highlight-section').style.display="none";
    }
    loadPopularCourses();
}
export function unloadHome() {
    clearInterval(bannerInterval);
}


export function loadMainSidebar() {
    let menuBtn = document.querySelector('#menu-btn');
    sideBar = document.querySelector('.side-bar');
    menuBtn.style.display = "inline-block";
    
    sideBar.classList.remove('active');
    document.body.classList.remove('active');
    document.querySelector('#menu-btn').onclick = () => {
        sideBar.classList.toggle('active');
        document.body.classList.toggle('active');

    }
    document.querySelector('.side-bar .close-side-bar').onclick = () => {
        sideBar.classList.remove('active');
        document.body.classList.remove('active');

    }
    updateUserInfoOnSideBar(loginStatus());

}

export function unloadSideBar() {
    document.getElementById("side-bar").innerHTML = "";
    document.body.classList.remove('active');
    let menuBtn = document.querySelector('#menu-btn');
    menuBtn.style.display = "none";

}

export function updateUserInfoOnSideBar(isUserLoggedIn){
    if (isUserLoggedIn)
    getUserPrivateData("zhcyWRZpJKZohfqSt6Xihyo4Awq2").then(
        (userPrivateData) => {
            sideBar.querySelector('#user-photo-sb').src = userPrivateData.userProfileSrc;
            sideBar.querySelector('#user-name-sb').innerHTML = userPrivateData.username;
            sideBar.querySelector('#user-role-sb').innerHTML = userPrivateData.role;

        }
    ).catch((e) => {
        console.error(e);
        publish('pushPopupMessage', ["FAILURE", "Something went wrong, unable to load side-bar profile."]);
    });
    else{
        sideBar.querySelector('#user-photo-sb').src = "/images/profile/guest-user.svg";
            sideBar.querySelector('#user-name-sb').innerHTML = 'Hello Guest!';
    }
}
function loadBanner(){
    // const observer = new IntersectionObserver((entries, observer) => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             const targetImage = entry.target;
    //             document.querySelector('.image-loader').style.display = "none";
    //             targetImage.style.opacity = 1;
    //             observer.unobserve(targetImage);
    //         }
    //     });
    // });
    var j = 1;
    while (j <= 3) {
        document.getElementById('slide-img-' + j).src = slideImagesSrc[j - 1];
        j++;
    }
    // const bannerSlides = document.querySelectorAll('.banner-slide');
    // bannerSlides.forEach(bannerSlide => {
    //     bannerSlide.style.opacity = 0; // Initially hide the images
    //     observer.observe(bannerSlide);
    // });
    let i = 1;
    bannerInterval = setInterval(() => { showSlide(i++); if (i > 3) i = 1; }, 3500);
    document.getElementById('slide-1').addEventListener('click', () => { showSlide(1); });
    document.getElementById('slide-2').addEventListener('click', () => { showSlide(2); });
    document.getElementById('slide-3').addEventListener('click', () => { showSlide(3); });
}
function loadQuickSelect(){
    var startJourneyHome = document.querySelector('#start-journey-home');
    startJourneyHome.addEventListener("click", function () {
        loadSignUpForm();
    });
    updateQuickSelectOptions(loginStatus());
    loadQuickCourses();
    loadStreams();
}


function loadStreams() {
    // Get the Stream container

    getTopStreams().then(
        (streams) => {
            const streamContainer = document.getElementById('stream-options');
            streams.forEach(stream => {
                // Create the anchor tag
                const anchorTag = document.createElement('a');
                anchorTag.href = '#';

                // Create the icon element
                const iconElement = document.createElement('i');
                iconElement.classList.add('fas', stream.icon);

                // Create the span element for the text
                const spanElement = document.createElement('span');
                spanElement.textContent = stream.text;

                // Append the icon and span elements to the anchor tag
                anchorTag.appendChild(iconElement);
                anchorTag.appendChild(spanElement);

                // Append the anchor tag to the flex container
                streamContainer.appendChild(anchorTag);
            });
        }
    ).catch(
        () => { publish('pushPopupMessage', ["FAILURE", "Something went wrong, unable to load streams."]); }
    );
    // Loop through the streams array and create anchor tags for each item


}

function loadQuickCourses() {
    getUserPrivateData("zhcyWRZpJKZohfqSt6Xihyo4Awq2").then(
        (data) => {
            var quickCourses = data.enrolledCourses;
            console.log(quickCourses);
            // Reference to the book container
            const bookContainer = document.querySelector('.box.private .book');

            // Iterate over quickCourses array
            quickCourses.forEach((course) => {
                // Create cover div
                const coverDiv = document.createElement('div');
                coverDiv.classList.add('cover', 'hidden', 'fade');

                // Create anchor tag
                const anchorTag = document.createElement('a');
                anchorTag.href = course.href;
                anchorTag.setAttribute('onclick', 'route()');

                // Create image tag
                const imageTag = document.createElement('img');
                imageTag.src = course.thumbnail;
                imageTag.classList.add('thumb');

                // Create paragraph tag for course title
                const paragraphTag = document.createElement('p');
                paragraphTag.textContent = course.title;

                // Append image and paragraph tags to anchor tag
                anchorTag.appendChild(imageTag);
                anchorTag.appendChild(paragraphTag);

                // Append anchor tag to cover div
                coverDiv.appendChild(anchorTag);

                // Append cover div to book container before slideshow div
                bookContainer.insertBefore(coverDiv, bookContainer.querySelector('.slideshow'));
            });
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

        }
    ).catch(() => { publish('pushPopupMessage', ["FAILURE", "Something went wrong, unable to load top courses."]); });
}

export function updateQuickSelectOptions(isUserLoggedIn) {

    let homeOptionPrivate = document.querySelectorAll('.quick-select .box-container .private');
    homeOptionPrivate.forEach((node) => { if (!isUserLoggedIn) node.style.display = "none"; else node.style.display = "block" });
    let homeOptionOnlyPublic = document.querySelectorAll('.quick-select .box-container .only-public');
    homeOptionOnlyPublic.forEach((node) => { if (isUserLoggedIn) node.style.display = "none"; else node.style.display = "block" });
}

function showSlide(n) {
    setSlide(n);

}

function setSlide(index) {
    let slides = document.querySelectorAll('.banner-slide');
    let dots = document.querySelectorAll(".slider .fa-circle");
    if (index > slides.length)
        index = 1;
    if (index < 1)
        index = slides.length;
    dots.forEach((node, i) => { if (index - 1 == i) node.classList.replace('fa-regular', 'fa-solid'); else node.classList.replace('fa-solid', 'fa-regular'); })
    slides.forEach((node, i) => { if (index - 1 == i) node.style.display = "block"; else node.style.display = "none"; })

}