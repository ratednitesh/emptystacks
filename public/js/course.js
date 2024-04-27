import { publish } from "./event-bus";
import { generateUserReview, getCourseContentDetailsAPICalls, getCourseDetailsAPICalls } from "./fetch-data";
import { pushPopupMessage } from "./setup";

let lastCourseId;
const levelNames = ['Easy', 'Intermediate', 'Expert'];

export function loadCourseDetails(courseId) {
    console.log(courseId);
    console.log("courseId");
    if (lastCourseId != courseId) {
        lastCourseId = courseId;
        getCourseData(courseId);
        generateUserReview(courseId).then(
            (reviewsHtml) => {
                console.log("read course reviews");
                console.log(reviewsHtml);
                if (reviewsHtml) {
                    const boxContainer = document.querySelector('.reviews .box-container');
                    if (boxContainer) {
                        boxContainer.innerHTML = reviewsHtml;
                    }
                }else
                document.querySelector('.reviews').style.display="none";
            }
        ).catch(
            (e) => { console.log(e); pushPopupMessage(["FAILURE", "Something went wrong, unable to load course reviews."]); }
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
                publish('notFoundRoute');
            }
        }
    )
        .catch(
            (e) => {
                console.log(e);
                pushPopupMessage(["FAILURE", "Something went wrong, unable to load course."]);
            }
        )
}


function getCourseContentDetails(courseId) {
    getCourseContentDetailsAPICalls(courseId).then(
        (courseData) => {
            var courseDetails = document.querySelector(".course-details .container .accordion");

            for (const [course, topics] of Object.entries(courseData)) {
                const accordionItem = document.createElement("div");
                accordionItem.classList.add("accordion-item");

                const accordionHeader = document.createElement("div");
                accordionHeader.classList.add("accordion-header");
                const headerTitle = document.createElement("h2");
                const headerIcon = document.createElement("i");
                headerIcon.classList.add("es-circle-empty", "bullet");
                headerTitle.appendChild(headerIcon);
                headerTitle.innerHTML += ` ${course}`;
                
                if (typeof topics === "string") {
                    const headingLink = document.createElement("a");
                    headingLink.href = topics;
                    headingLink.setAttribute("onclick", "route()");
                    headingLink.appendChild(headerTitle);
                    accordionHeader.appendChild(headingLink);
                    accordionItem.appendChild(accordionHeader);
                }
                else if (typeof topics === "object") {
                    const expandIcon = document.createElement("i");
                    expandIcon.classList.add("expand", "es-angle-up");
                    headerTitle.appendChild(expandIcon);
                    accordionHeader.classList.add("expandable");
                    accordionHeader.appendChild(headerTitle);
                    accordionItem.appendChild(accordionHeader);
                    const accordionContent = document.createElement("div");
                    accordionContent.classList.add("accordion-content");

                    for (const [topic, href] of Object.entries(topics)) {
                        const courseList = document.createElement("li");
                        courseList.classList.add("course-list");
                        const topicLink = document.createElement("a");
                        topicLink.href = href;
                        topicLink.setAttribute("onclick", "route()");
                        topicLink.innerHTML = `<i class="es-circle-empty"></i>${topic}`;
                        courseList.appendChild(topicLink);
                        accordionContent.appendChild(courseList);
                    }

                    accordionItem.appendChild(accordionContent);
                    accordionItem.classList.add("active");
                }
                courseDetails.appendChild(accordionItem);
            }
            // courseDetails.innerHTML = courseData;
            document.querySelectorAll('.expandable').forEach(function (header) {
                header.addEventListener('click', function () {
                    var item = this.parentNode;
                    item.classList.toggle('active');
                    if (this.children[0].children[1].classList[1] == 'es-angle-down')
                        this.children[0].children[1].classList.replace('es-angle-down', 'es-angle-up');
                    else
                        this.children[0].children[1].classList.replace('es-angle-up', 'es-angle-down');
                });
            });
            document.getElementById("expand-button").addEventListener('click', () => {
                var expandItems = document.querySelectorAll('.expand');
                var accordionItems = document.querySelectorAll('.accordion-item');
                accordionItems.forEach(function (item) {
                    item.classList.add('active');
                });
                expandItems.forEach(function (expandItem) {
                    expandItem.classList.replace('es-angle-down', 'es-angle-up');
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
                    expandItem.classList.replace('es-angle-up', 'es-angle-down');
                });
                document.getElementById("collapse-button").hidden = true;
                document.getElementById("expand-button").hidden = false;
            });

        }
    )
        .catch(
            (e) => {
                console.log(e);
                pushPopupMessage(["FAILURE", "Something went wrong, unable to load course content details."]);
            }
        )
}

function getCourseVideoDetails(courseId) {
    getCourseContentDetailsAPICalls(courseId).then(
        (courseVideoDetails) => {
            var playlistHtml = "";
            for (const [title, cvd] of Object.entries(courseVideoDetails)) {
                var videoHtml = `<a href="${cvd.href}"  onclick="route()" class="box">
                <i class="es-play-lg"></i>
                <img src="${cvd.thumbnail}"alt="">
                <h2>${title}</h2>
                </a>`;
                playlistHtml += videoHtml
            };
            var videoDetails = document.querySelector(".video-container .box-container");
            videoDetails.innerHTML = playlistHtml;
        }
    ).catch(
        (e) => {
            console.log(e);
            pushPopupMessage(["FAILURE", "Something went wrong, unable to load course content details."]);
        }
    );
}