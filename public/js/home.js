
import { getUid, isUserLoggedIn } from "./firebase-config";
import { signup_selected, getUserPrivateData } from "./setup";
import { notification } from './helper';

const bookContainer = document.querySelector('.box.private .book .enrolled-courses-home');
const homeOptionPrivate = document.querySelectorAll('.quick-select .box-container .private');
const homeOptionOnlyPublic = document.querySelectorAll('.quick-select .box-container .only-public');
const slideshow = document.querySelector(".slideshow");
const noEnroll = document.querySelector(".no-enroll");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

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
                    // TODO: Enhance this
                    viewMoreCourses.classList.add('disabled');
                    document.querySelector("#that-all").classList.remove('disabled');
                }
            );

        }
    ).catch((e) => {
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
    // Init streams
    initStreams();
    // Show / Hide  Quick select options based on user login status
    updateQuickSelectOptions();
    // Prev/ Next Enrolled Courses Listeners
    initQuickCourses();
}
// Initializer and Listeners: Streams
function initStreams() {
    // Get the Stream container
    getTopStreams().then(
        (streams) => {
            const streamContainer = document.getElementById('stream-options');
            streams.forEach(stream => {
                // Create the anchor tag
                const anchorTag = document.createElement('a');
                anchorTag.href = '/streams/'+stream.text;
                anchorTag.setAttribute("onclick", "route()");

                // Create the icon element
                const iconElement = document.createElement('i');
                iconElement.classList.add(stream.icon);

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
        () => {
            notification(501, 'streams');
        }
    );
    // Loop through the streams array and create anchor tags for each item


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
        document.querySelector('.quick-select').classList.add('disabled');
        document.querySelector('.highlight-section').classList.add('disabled');
    } else {
        document.querySelector('.quick-select').classList.remove('disabled');
        document.querySelector('.highlight-section').classList.remove('disabled');
        if (!isBannerLoaded) {
            loadBanner();
            isBannerLoaded = true;
        }
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

// On auth state change, call this function to update show/ hide section
export function updateQuickSelectOptions() {
    homeOptionPrivate.forEach((node) => { if (!isUserLoggedIn()) node.classList.add('disabled'); else node.classList.remove('disabled'); });
    homeOptionOnlyPublic.forEach((node) => { if (isUserLoggedIn()) node.classList.add('disabled'); else node.classList.remove('disabled'); });
    updateEnrolledCourses();
}
// On auth State change, Update enrolled Courses 
function updateEnrolledCourses() {
    if (isUserLoggedIn())
        getUserPrivateData(getUid())
            .then(
                (data) => {
                    var quickCourses = data.enrolledCourses;
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
                        imageTag.classList.add('thumb');
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
                        let percent = (course.chaptersCompleted / course.totalChapters) * 100;
                        console.log(percent);
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
                        enrolledCourses[0].classList.remove('disabled');
                        slideshow.classList.remove('disabled')
                        noEnroll.classList.add('disabled');
                    }
                    else {
                        console.log("TODO: Add a logic to display a message that no courses are enrolled. Hide prev/ next button");
                        slideshow.classList.add('disabled');
                        noEnroll.classList.remove('disabled');
                    }
                }
            ).catch((e) => {
                console.log(e);
                notification(501, 'enrolled courses');
            });
    else {
        bookContainer.innerHTML = "";
        enrolledCourses = [];
        enrolledCourseIndex = -1;
    }
}
// Show hide selected enrolled course
function showSelectedEnrolledCourse(oldIndex, newIndex) {
    if (oldIndex != -1) {
        enrolledCourses[oldIndex].classList.add('disabled');
        if (newIndex == enrolledCourses.length) {
            newIndex = 0;
        }
        else if (newIndex == -1) {
            newIndex = enrolledCourses.length - 1;
        }
        enrolledCourses[newIndex].classList.remove('disabled');
        enrolledCourseIndex = newIndex;
    }
}
// Show hide banner slide based on selected index.
function showSlide(index) {
    let slides = document.querySelectorAll('.banner-slide');
    let dots = document.querySelectorAll(".slider .circle");
    if (index > slides.length)
        index = 1;
    if (index < 1)
        index = slides.length;
    dots.forEach((node, i) => { if (index - 1 == i) node.classList.replace('es-circle-empty', 'es-circle'); else node.classList.replace('es-circle', 'es-circle-empty'); })
    slides.forEach((node, i) => { if (index - 1 == i) node.classList.remove('disabled'); else node.classList.add('disabled'); })
}

// TODO: Potentially need to remove following function */
async function importMockApi() {
    try {
        const { mockgetTopStreamsAPICall, mockgetTopCoursesAPICall } = await import('/public/test/mock-api.js');
        return {
            mockgetTopStreamsAPICall,
            mockgetTopCoursesAPICall,

        };
    } catch (error) {
        console.error('Error importing mock API:', error);
        throw error;
    }
}
async function getTopStreams() {
    const mockApi = await importMockApi();
    return new Promise((resolve, reject) => {
        // If data is already cached, resolve with the cached data

        // Simulate an API call
        mockApi.mockgetTopStreamsAPICall()
            .then(response => {
                //TODO: Store the API response in the cachedData object
                resolve(response); // Resolve with the API response
            })
            .catch(error => {
                reject(error); // Reject with the error from the API call
            });

    });
}
async function getTopCourses() {
    const mockApi = await importMockApi();
    return new Promise((resolve, reject) => {
        // If data is already cached, resolve with the cached data

        // Simulate an API call
        mockApi.mockgetTopCoursesAPICall()
            .then(response => {
                // TODO: Store the API response in the cachedData object
                resolve(response); // Resolve with the API response
            })
            .catch(error => {
                reject(error); // Reject with the error from the API call
            });

    });
}
