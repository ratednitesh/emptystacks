import { getTopCourses, getTopStreams } from "./fetch-data";
import { signup_selected, getUserPrivateData, loginStatus, pushPopupMessage } from "./setup";

let bannerInterval;
let initHomeStatus = false, initCoursesStatus = false;
//  Load and Unload Home 
export function loadHome(args) {
    if (args != 'only-course') {
        if (!initHomeStatus) {
            initHome();
            initHomeStatus = true;
        }
        document.querySelector('.quick-select').style.display = "block";
        document.querySelector('.highlight-section').style.display = "block";
        loadBanner();
    } else {
        document.querySelector('.quick-select').style.display = "none";
        document.querySelector('.highlight-section').style.display = "none";
    }
    if (!initCoursesStatus) {
        initPopularCourses();
        initCoursesStatus = true;
    }
}
export function unloadHome() {
    unloadBanner();
}
function loadBanner() {
    let i = 2;
    bannerInterval = setInterval(() => { showSlide(i++); if (i > 3) i = 1; }, 3500);
}
function unloadBanner() {
    clearInterval(bannerInterval);
}
function initHome() {
    initBanner();
    initQuickSelect();
}
function initBanner() {
    showSlide(1);
    document.getElementById('slide-1').addEventListener('click', () => { showSlide(1); });
    document.getElementById('slide-2').addEventListener('click', () => { showSlide(2); });
    document.getElementById('slide-3').addEventListener('click', () => { showSlide(3); });
}

function initQuickSelect() {
    var startJourneyHome = document.querySelector('#start-journey-home');
    startJourneyHome.addEventListener("click", function () {
        signup_selected();
    });
    updateQuickSelectOptions(loginStatus());
    initQuickCourses();
    initStreams();
}


function initStreams() {
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
                iconElement.classList.add( stream.icon);

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
        () => { pushPopupMessage(["FAILURE", "Something went wrong, unable to load streams."]); }
    );
    // Loop through the streams array and create anchor tags for each item


}

function initQuickCourses() {
    getUserPrivateData("zhcyWRZpJKZohfqSt6Xihyo4Awq2") // TODO: Use it from args
    .then(
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
                imageTag.alt = "Course Name";

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
    ).catch(() => { pushPopupMessage(["FAILURE", "Something went wrong, unable to load top courses."]); });
}

export function updateQuickSelectOptions(isUserLoggedIn) {

    let homeOptionPrivate = document.querySelectorAll('.quick-select .box-container .private');
    homeOptionPrivate.forEach((node) => { if (!isUserLoggedIn) node.style.display = "none"; else node.style.display = "block" });
    let homeOptionOnlyPublic = document.querySelectorAll('.quick-select .box-container .only-public');
    homeOptionOnlyPublic.forEach((node) => { if (isUserLoggedIn) node.style.display = "none"; else node.style.display = "block" });
}

function showSlide(index) {
    let slides = document.querySelectorAll('.banner-slide');
    let dots = document.querySelectorAll(".slider .circle");
    if (index > slides.length)
        index = 1;
    if (index < 1)
        index = slides.length;
    dots.forEach((node, i) => { if (index - 1 == i) node.classList.replace('es-circle-empty', 'es-circle'); else node.classList.replace('es-circle', 'es-circle-empty'); })
    slides.forEach((node, i) => { if (index - 1 == i) node.style.display = "block"; else node.style.display = "none"; })
}

function initPopularCourses() {
    getTopCourses().then(
        (coursesData) => {
            // Select the box-container element
            const boxContainer = document.querySelector('.courses .box-container');

            // Iterate over coursesData and create HTML elements
            coursesData.forEach(course => {
                // Create box element
                const box = document.createElement('div');
                box.classList.add('box');

                // Create thumbnail image
                const thumbnailImg = document.createElement('img');
                thumbnailImg.src = course.thumbnail;
                thumbnailImg.alt = 'Course Thumbnail';
                thumbnailImg.classList.add('thumb');

                // Create title
                const title = document.createElement('p');
                title.classList.add('title');
                title.textContent = course.title;

                // Create link
                const link = document.createElement('a');
                link.href = course.href;
                link.textContent = 'View Course';
                link.classList.add('inline-btn');
                link.setAttribute('onclick', 'route()');

                // Append elements to the box
                box.appendChild(thumbnailImg);
                box.appendChild(title);
                box.appendChild(link);

                // Append box to the box-container
                boxContainer.appendChild(box);
               
            });
            const viewMoreCourses = document.querySelector("#view-more-courses");
            viewMoreCourses.addEventListener(
                'click', () => { 
                    viewMoreCourses.style.display="none"; 
                    document.querySelector("#that-all").style.display="block";
                }
            );

        }
    ).catch(() => { pushPopupMessage(["FAILURE", "Something went wrong, unable to load top courses."]); });

}