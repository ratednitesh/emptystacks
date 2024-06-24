
import { signup_selected } from "./setup";
import { notification } from './helper';
import { getAllCourses, getAllStreams, getUserId, getUserPrivateProfile } from "./db-services";
import { modifyDisabledClass, showCoursesUI, showStreamsUI } from "./ui-services";
const highlightSection = document.querySelector('.highlight-section');
const quickSelect = document.querySelector('.quick-select');
const bookContainer = document.querySelector('#enrolled-courses-home');
const homeOptionPrivate = quickSelect.querySelectorAll('.flex-container .private');
const homeOptionOnlyPublic = quickSelect.querySelectorAll('.flex-container .only-public');
const slideshow = document.querySelector(".slideshow");
const noEnroll = document.querySelector(".no-enroll");
const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#prev");
const studentDiv = document.querySelector('.box.student-mode');
const tutorDiv = document.querySelector('.box.tutor-mode');
const regTutorSideBar = document.getElementById('register-tutor');

let bannerInterval, isBannerLoaded = false;
let enrolledCourses = [], enrolledCourseIndex = -1;

// Initializers and Listeners: Home 
export function initHome() {
    initBanner();
    initPopularCourses();
    initQuickSelect();
}
// Initializer and Listeners: Banner
function initBanner() {
    showSlide(1);
    document.getElementById('slide-1').addEventListener('click', () => { showSlide(1); });
    document.getElementById('slide-2').addEventListener('click', () => { showSlide(2); });
    document.getElementById('slide-3').addEventListener('click', () => { showSlide(3); });
}
// Initializer and Listeners: Popular Courses
function initPopularCourses() {
    getAllCourses().then(
        (coursesData) => {
            showCoursesUI(coursesData, '.courses .flex-container','home-');
        }
    ).catch((e) => {
        console.error(e);
        notification(501, 'popular courses');
    });

}
// Initializer and Listeners: Quick Select
function initQuickSelect() {
    // Init Start Jouney option on Home
    var startJourneyHome = document.querySelector('#start-journey-home');
    startJourneyHome.addEventListener("click", function () {
        signup_selected();
    });
    document.querySelector(".home-reg-tutor").addEventListener('click', () =>
        document.querySelector(".reg-tutor-modal").classList.add('is-visible'));
    homeOptionPrivate.forEach((node) => { if (!getUserId()) modifyDisabledClass(node,1); else modifyDisabledClass(node,0); });
    homeOptionOnlyPublic.forEach((node) => { if (getUserId()) modifyDisabledClass(node,1); else modifyDisabledClass(node,0); });
    // Init streams
    initStreams();
    // Prev/ Next Enrolled Courses Listeners
    initQuickCourses();
}
// Initializer and Listeners: Streams
function initStreams() {
    // Get the Stream container
    getAllStreams().then(
        (streams) => {
            showStreamsUI(streams, '#stream-options');
        }
    ).catch(
        () => {
            notification(501, 'streams');
        }
    );
}
// Initializer and Listeners: Enrolled Courses
function initQuickCourses() {
    if (nextBtn != null)
        nextBtn.addEventListener("click", (_) => {
            showSelectedEnrolledCourse(enrolledCourseIndex, enrolledCourseIndex + 1);
        });
    if (prevBtn != null)
        prevBtn.addEventListener("click", (_) => {
            showSelectedEnrolledCourse(enrolledCourseIndex, enrolledCourseIndex - 1);
        });
}

//  Load Home / Courses
export function loadHome(args) {
    if (args == 'only-course') {
        modifyDisabledClass(quickSelect,1);
        modifyDisabledClass(highlightSection,1);
    } else {
        modifyDisabledClass(quickSelect,0);
        modifyDisabledClass(highlightSection,0);
        if (!isBannerLoaded) {
            loadBanner();
            isBannerLoaded = true;
        }
        loadEnrolledCourses();
    }
}
// Unload Home / Courses
export function unloadHome() {
    unloadBanner();
}
// Load Banner 
function loadBanner() {
    let i = 2;
    bannerInterval = setInterval(() => { showSlide(i++); if (i > 3) i = 1; }, 3500);
}
// Unload Banner
function unloadBanner() {
    clearInterval(bannerInterval);
    isBannerLoaded = false;
}

function loadEnrolledCourses() {
    getUserPrivateProfile()
        .then(
            (data) => {
                if (data) {
                    var quickCourses = Object.values(data.enrolledCourses).filter(course => course.status === "In Progress");
                    // Reference to the book container
                    bookContainer.innerHTML = "";
                    // Iterate over quickCourses array
                    quickCourses.forEach((course) => {
                        // Create cover div
                        const coverDiv = document.createElement('div');
                        coverDiv.classList.add('cover', 'disabled', 'fade');
                        // Create anchor tag
                        const anchorTag = document.createElement('a');
                        anchorTag.href = course.nextChapter;
                        anchorTag.setAttribute('onclick', 'route()');
                        // Create image tag
                        const imageTag = document.createElement('img');
                        imageTag.src = course.thumbnail;
                        imageTag.classList.add('thumb-md');
                        imageTag.alt = "Course Name";

                        // Create paragraph tag for course title
                        const paragraphTag = document.createElement('p');
                        paragraphTag.textContent = course.title;

                        // Append image and paragraph tags to anchor tag
                        anchorTag.appendChild(imageTag);
                        // Progress bar
                        const progressDiv = document.createElement('div');
                        progressDiv.classList.add('progress-bar-container');
                        const progressBar = document.createElement('div');
                        progressBar.classList.add('progress-bar');
                        let percent = (course.chaptersCompleted.length / course.totalChapters) * 100;
                        progressBar.style.width = percent + '%';
                        progressDiv.appendChild(progressBar);
                        anchorTag.appendChild(progressDiv);

                        anchorTag.appendChild(paragraphTag);

                        // Append anchor tag to cover div
                        coverDiv.appendChild(anchorTag);

                        // Append cover div to book container before slideshow div
                        bookContainer.appendChild(coverDiv);
                    });
                    enrolledCourses = document.querySelectorAll(".book .cover");
                    enrolledCourseIndex = 0;
                    if (enrolledCourses.length != 0) {
                        modifyDisabledClass(enrolledCourses[0],0);
                        modifyDisabledClass(slideshow,0);
                        modifyDisabledClass(noEnroll,1);
                    }
                    else {
                        modifyDisabledClass(slideshow,1);
                        modifyDisabledClass(noEnroll,0);
                    }
                    disabledTutorMode(data.role == "Stack Builder");
                }
                else {
                    bookContainer.innerHTML = "";
                    enrolledCourses = [];
                    enrolledCourseIndex = -1;
                    disabledTutorMode(false);
                }
            }

        ).catch((e) => {
            console.error(e);
            notification(501, 'enrolled courses');
        })
}

function disabledTutorMode(isTutor) {
    if (isTutor) {
        modifyDisabledClass(studentDiv,1);
        modifyDisabledClass(tutorDiv,0);
        modifyDisabledClass(regTutorSideBar,1);
    } else {
        modifyDisabledClass(studentDiv,0);
        modifyDisabledClass(tutorDiv,1);
        modifyDisabledClass(regTutorSideBar,0);
    }

}
// Show hide selected enrolled course
function showSelectedEnrolledCourse(oldIndex, newIndex) {
    if (oldIndex != -1) {
        modifyDisabledClass(enrolledCourses[oldIndex],1);
        if (newIndex == enrolledCourses.length) {
            newIndex = 0;
        }
        else if (newIndex == -1) {
            newIndex = enrolledCourses.length - 1;
        }
        modifyDisabledClass(enrolledCourses[newIndex],0);
        enrolledCourseIndex = newIndex;
    }
}
// Show hide banner slide based on selected index.
function showSlide(index) {
    let slides = document.querySelectorAll('.banner-slide img');
    let dots = document.querySelectorAll(".slider .circle");
    if (index > slides.length)
        index = 1;
    if (index < 1)
        index = slides.length;
    dots.forEach((node, i) => { if (index - 1 == i) node.classList.replace('es-circle-empty', 'es-circle'); else node.classList.replace('es-circle', 'es-circle-empty'); })
    slides.forEach((node, i) => { if (index - 1 == i) modifyDisabledClass(node,0); else modifyDisabledClass(node,1); })
}