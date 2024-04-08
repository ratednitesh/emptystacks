import { EVENTS } from "./const";
import { publish } from "./event-bus";
import { generateUserReview, getCourseContentDetailsAPICalls, getCourseDetailsAPICalls, getCourseVideoDetailsAPICalls } from "./fetch-data";

let lastCourseId;
const levelNames = ['Beginner', 'Intermediate', 'Expert'];

export function loadCourseDetails(courseId) {
    if (lastCourseId != courseId) {
        lastCourseId = courseId;
        getCourseData(courseId);
        generateUserReview(courseId).then(
            (reviewsHtml) => {
                if (reviewsHtml) {
                    const boxContainer = document.querySelector('.reviews .box-container');
                    if (boxContainer) {
                        boxContainer.innerHTML = reviewsHtml;
                    }
                }
            }
        ).catch(
            (e) => { console.log(e); publish(EVENTS.PUSH_POPUP_MESSAGE, ["FAILURE", "Something went wrong, unable to load course reviews."]); }
        );
    }
}

function getCourseData(courseId) {
    getCourseDetailsAPICalls(courseId).then(
        (courseData) => {
            if (courseData) {
                var textCourse = document.querySelector('.text-course');
                textCourse.querySelectorAll('.chapters').forEach((event) => {
                    event.innerHTML = courseData.chapterCount;
                });
                textCourse.querySelector('#thumbnail').src = courseData.thumbnail;
                textCourse.querySelector('#publishDate').innerHTML = courseData.publishDate;
                textCourse.querySelector('#courseName').innerHTML = courseData.courseName;
                textCourse.querySelector('#description').innerHTML = courseData.description;
                textCourse.querySelector('#content-link').href = courseData.href;
                const level = courseData.level;
                const n = 4 - level; // Calculate the value of n based on the level
                textCourse.querySelector('#course-level').innerHTML = levelNames[level - 1];
                const bars = document.querySelectorAll('.signal-bars .bar:nth-last-child(n+' + n + ')');
                bars.forEach(bar => {
                    bar.style.background = 'var(--main-color)';
                });
                var tutorData = courseData.author;
                console.log('tutorData');
                console.log(tutorData);
                textCourse.querySelector('#tutor-img').src = tutorData.userProfileSrc;
                textCourse.querySelector('#tutor-name').innerHTML = tutorData.name;
                textCourse.querySelector('#tutor-role').innerHTML = tutorData.role;
                if (courseData.type == "text") {
                    document.querySelector(".course-details").style.display = "block";
                    document.querySelector(".video-container").style.display = "none";
                    getCourseContentDetails(courseId);
                }
                else {
                    document.querySelector(".video-container").style.display = "block";
                    document.querySelector(".course-details").style.display = "none";
                    getCourseVideoDetails(courseId);
                }
            } else {
                publish(EVENTS.NOT_FOUND_ROUTE);
            }
        }
    )
        .catch(
            (e) => {
                console.log(e);
                publish(EVENTS.PUSH_POPUP_MESSAGE, ["FAILURE", "Something went wrong, unable to load course."]);
            }
        )
}


function getCourseContentDetails(courseId) {
    getCourseContentDetailsAPICalls(courseId).then(
        (courseData) => {
            var courseDetails = document.querySelector(".course-details");
            courseDetails.innerHTML = courseData;
            document.querySelectorAll('.expandable').forEach(function (header) {
                header.addEventListener('click', function () {
                    var item = this.parentNode;
                    item.classList.toggle('active');
                    if (this.children[0].children[1].classList[2] == 'fa-angle-down')
                        this.children[0].children[1].classList.replace('fa-angle-down', 'fa-angle-up');
                    else
                        this.children[0].children[1].classList.replace('fa-angle-up', 'fa-angle-down');
                });
            });
            document.getElementById("expand-button").addEventListener('click', () => {
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
            });
            document.getElementById("collapse-button").addEventListener('click', () => {
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
            });
        }
    )
        .catch(
            (e) => {
                console.log(e);
                publish(EVENTS.PUSH_POPUP_MESSAGE, ["FAILURE", "Something went wrong, unable to load course content details."]);
            }
        )
}

function getCourseVideoDetails(courseId) {
    getCourseVideoDetailsAPICalls(courseId).then(
        (courseVideoDetails) => {
            var playlistHtml = "";
            courseVideoDetails.forEach((cvd) => {
                var videoHtml = `<a href="/content"  onclick="route()" class="box">
                <i class="fas fa-play"></i>
                <img src="${cvd.thumbnail}"alt="">
                <h3>${cvd.title}</h3>
                </a>`;
                playlistHtml += videoHtml
            });
            var videoDetails = document.querySelector(".video-container .box-container");
            videoDetails.innerHTML = playlistHtml;
        }
    ).catch(
        (e) => {
            console.log(e);
            publish(EVENTS.PUSH_POPUP_MESSAGE, ["FAILURE", "Something went wrong, unable to load course content details."]);
        }
    );
}