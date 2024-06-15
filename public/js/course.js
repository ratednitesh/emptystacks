import { getFormattedDate, notification, publish } from "./helper";
import { getCourseDetail, readAllReviews, getUserId, getUserPrivateProfile, enrollToCourse } from "./services";

const textCourse = document.querySelector('.text-course');
const courseStreams = textCourse.querySelector('.streams');
const expandButton = document.getElementById("expand-button");
const saveCourse = document.getElementById("save-course");
const courseDetails = document.querySelector(".course-details .flex-container .accordion");
const videoDetails = document.querySelector(".video-container .flex-container");
const boxContainer = document.querySelector('.reviews .flex-container');
const allBars = document.querySelectorAll('.signal-bars .bar');
const startButton = document.getElementById('content-link');
const progressContainer = document.getElementById('course-progress-container');
const progressBar = progressContainer.querySelector('.progress-bar');
const levelNames = ['Easy', 'Intermediate', 'Expert'];
let loadedCourseId;

// Initializers and Listeners: Course Page 
export function initCoursePage() {
    expandButton.addEventListener('click', () => {
        var accordionItems = document.querySelectorAll('.accordion-item');
        var expandItems = document.querySelectorAll('.expand');
        accordionItems.forEach(function (item) {
            item.classList.toggle('active');
        });
        expandItems.forEach(function (expandItem) {
            expandItem.classList.toggle('es-angle-up');
            expandItem.classList.toggle('es-angle-down');
        });
        expandButton.textContent = expandButton.textContent === "Minimize All" ? "Expand All" : "Minimize All";
    });
    saveCourse.addEventListener('click', () => {
        if (getUserId())
            triggerEnrollCourse();
        startButton.innerText = "Resume Course";
    });
    startButton.addEventListener('click', () => {
        if (startButton.innerText == "Start Course" && getUserId())
            triggerEnrollCourse();
    });
}

// Load course page
export function loadCoursePage(courseId) {
    if (loadedCourseId != courseId) {
        saveCourse.classList.add('locked');
        progressContainer.classList.add('disabled');
        startButton.innerText = "Start Course";
        getCourseData(courseId);
    } else {
        updateUserLevelOnEnrolledCourse();
    }
}

// Load course Data
function getCourseData(courseId) {
    getCourseDetail(courseId).then(
        (courseData) => {
            if (Object.keys(courseData).length != 0) {
                loadedCourseId = courseId;
                textCourse.querySelectorAll('.chapters').forEach((event) => {
                    event.innerHTML = courseData.chapterCount + " Chapters";
                });
                textCourse.querySelector('#thumbnail').src = courseData.thumbnail;
                textCourse.querySelector('#publishDate').innerHTML = getFormattedDate(courseData.createdAt);
                textCourse.querySelector('#courseName').innerHTML = courseData.courseName;
                textCourse.querySelector('#description').innerHTML = courseData.description;
                startButton.href = courseData?.href;
                const level = courseData.level;
                const n = 4 - level; // Calculate the value of n based on the level
                textCourse.querySelector('#course-level').innerHTML = levelNames[level - 1];
                allBars.forEach(bar => {
                    bar.style.background = '#fff';
                });
                const selectedBars = document.querySelectorAll('.signal-bars .bar:nth-last-child(n+' + n + ')');
                selectedBars.forEach(bar => {
                    bar.style.background = 'var(--main-color)';
                });
                var tutorData = courseData.author;
                textCourse.querySelector('#tutor-link').href = "/profile/" + tutorData.uid;
                textCourse.querySelector('#tutor-img').src = tutorData.photoURL;
                textCourse.querySelector('#tutor-name').innerHTML = tutorData.displayName;
                textCourse.querySelector('#tutor-role').innerHTML = "Stack Builder";
                for (const [streamId, stream] of Object.entries(courseData.streams)) {
                    // Create the anchor tag
                    const anchorTag = document.createElement('a');
                    anchorTag.href = '/streams/' + streamId;
                    anchorTag.setAttribute("onclick", "route()");
                    anchorTag.classList.add('transparent-btn');

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
                    courseStreams.appendChild(anchorTag);
                };
                let courseContentData = courseData.chapters;
                if (courseData.type == "text") {
                    document.querySelector(".course-details").classList.remove('disabled');
                    document.querySelector(".video-container").classList.add('disabled');
                    courseDetails.innerHTML = "";
                    courseContentData.forEach(topics => {
                        const accordionItem = document.createElement("div");
                        accordionItem.classList.add("accordion-item");
                        const accordionHeader = document.createElement("div");
                        accordionHeader.classList.add("accordion-header");
                        const headerTitle = document.createElement("h2");
                        const headerIcon = document.createElement("i");
                        headerIcon.classList.add("es-circle-empty", "bullet");

                        if (topics.type == 'Chapter') {
                            headerIcon.id = courseId + "-" + topics.id;
                            headerTitle.appendChild(headerIcon);
                            headerTitle.innerHTML += ' ' + topics.title;
                            const headingLink = document.createElement("a");
                            headingLink.href = topics.href;
                            headingLink.setAttribute("onclick", "route()");
                            headingLink.appendChild(headerTitle);
                            accordionHeader.appendChild(headingLink);
                            accordionItem.appendChild(accordionHeader);

                        }
                        else {
                            headerTitle.appendChild(headerIcon);
                            headerTitle.innerHTML += ' ' + topics.title;
                            const expandIcon = document.createElement("i");
                            expandIcon.classList.add("expand", "es-angle-up");
                            headerTitle.appendChild(expandIcon);
                            accordionHeader.classList.add("expandable");
                            accordionHeader.appendChild(headerTitle);
                            accordionItem.appendChild(accordionHeader);
                            const accordionContent = document.createElement("div");
                            accordionContent.classList.add("accordion-content");

                            topics.subChapters.forEach(topic => {
                                const courseList = document.createElement("li");
                                courseList.classList.add("course-list");
                                const topicLink = document.createElement("a");
                                topicLink.href = topic.href;
                                topicLink.setAttribute("onclick", "route()");
                                topicLink.innerHTML = `<i id="${courseId}-${topic.id}"class="bullet es-circle-empty"></i>${topic.title}`;

                                courseList.appendChild(topicLink);
                                accordionContent.appendChild(courseList);
                            });

                            accordionItem.appendChild(accordionContent);
                            accordionItem.classList.add("active");
                        }
                        courseDetails.appendChild(accordionItem);
                    });

                    document.querySelectorAll('.expandable').forEach(function (header) {
                        header.addEventListener('click', function () {
                            var item = this.parentNode;
                            item.classList.toggle('active');
                            this.children[0]?.children[1]?.classList.toggle('es-angle-up');
                            this.children[0]?.children[1]?.classList.toggle('es-angle-down');
                        });
                    });
                }
                else {
                    document.querySelector(".video-container").classList.remove('disabled');
                    document.querySelector(".course-details").classList.add('disabled');
                    videoDetails.innerHTML = "";
                    courseContentData.forEach(cvd => {
                        const videoHtml = document.createElement("a");
                        videoHtml.href = cvd.href;
                        videoHtml.setAttribute("onclick", "route()");
                        videoHtml.classList.add("box");
                        videoHtml.innerHTML = `<i class="es-play-lg"></i><img class="thumb-md" src="${cvd.thumbnail}"alt=""><h2 class="title"><i id="${courseId}-${cvd.id}" class="es-circle-empty"></i> ${cvd.title}</h2>`;
                        videoDetails.appendChild(videoHtml);
                    });
                }
                updateUserLevelOnEnrolledCourse();
                getCourseReviews();

            } else {
                publish('notFoundRoute');
            }
        }
    )
        .catch(
            (e) => {
                console.error(e);
                notification(501, 'course');
            }
        )
}

// Load course reviews
function getCourseReviews() {
    readAllReviews(loadedCourseId).then(
        (courseReview) => {
            if (courseReview) {
                document.querySelector('.reviews').classList.remove('disabled');
                boxContainer.innerHTML = "";
                Object.values(courseReview).forEach((r) => {
                    var userInfo = r.user;
                    const reviewBox = document.createElement('div');
                    reviewBox.classList.add('box');
                    const reviewParagraph = document.createElement('p');
                    reviewParagraph.textContent = r.review;
                    reviewParagraph.classList.add('para');
                    const userDiv = document.createElement('div');
                    userDiv.classList.add('flex-item');
                    const profileLink = document.createElement('a');
                    profileLink.href = `/profile/${userInfo.uid}`;
                    profileLink.setAttribute("onclick", "route()");
                    const userImage = document.createElement('img');
                    userImage.src = userInfo.photoURL;
                    userImage.alt = userInfo.displayName;
                    userImage.classList.add('user-logo-sm');
                    const userContentDiv = document.createElement('div');
                    const userName = document.createElement('h2');
                    userName.textContent = userInfo.displayName;
                    userName.classList.add("title");
                    const starsContent = document.createElement('div');
                    starsContent.innerHTML = generateStarRating(r.rating);

                    profileLink.appendChild(userImage);
                    userDiv.appendChild(profileLink);
                    userContentDiv.appendChild(userName);
                    userContentDiv.appendChild(starsContent);
                    userDiv.appendChild(userContentDiv);
                    reviewBox.appendChild(reviewParagraph);
                    reviewBox.appendChild(userDiv);
                    boxContainer.appendChild(reviewBox);
                })
            } else
                document.querySelector('.reviews').classList.add('disabled');

        }
    ).catch(
        () => {
            notification(501, 'course reviews');
        }
    );
}

// Generate stars in review
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    return '<div class="stars">' +
        '<i class="es-star"></i>'.repeat(fullStars) +
        (hasHalfStar ? '<i class="es-star-half"></i>' : '') +
        '<i class="es-star-empty"></i>'.repeat(5 - Math.ceil(rating)) +
        '</div>';

}

function updateUserLevelOnEnrolledCourse() {
    getUserPrivateProfile().then((userData) => {
        if (userData) {
            if (loadedCourseId in userData.enrolledCourses) {
                let matchingCourse = userData.enrolledCourses[loadedCourseId];
                saveCourse.classList.add('locked');
                progressContainer.classList.remove('disabled');
                let chaptersCompleted = matchingCourse.chaptersCompleted;
                let percent = (chaptersCompleted.length / matchingCourse.totalChapters) * 100;
                progressBar.style.width = percent + '%';
                startButton.innerText = "Resume Course";
                startButton.href = matchingCourse.nextChapter;
                chaptersCompleted.forEach(id => {
                    let i = document.getElementById(loadedCourseId + "-" + id);
                    i.classList.remove('es-circle-empty');
                    i.classList.add('es-ok-circled', 'green');
                });
                const items = document.querySelectorAll('.accordion-item');
                items.forEach(item => {
                    let subI = item.querySelectorAll('.course-list > a > i');
                    if (subI.length) {
                        const noneContainOkCircle = Array.from(subI).every(k => !k.classList.contains('es-circle-empty'));
                        if (noneContainOkCircle) {
                            let i = item.querySelector('.accordion-header > h2 > i:first-of-type');
                            i.classList.remove('es-circle-empty');
                            i.classList.add('es-ok-circled', 'green');
                        }
                    }
                });
            } else {
                progressContainer.classList.add('disabled');
                saveCourse.classList.remove('locked');
            }
        }
    });
}

function triggerEnrollCourse() {
    saveCourse.classList.add('locked');
    enrollToCourse(loadedCourseId).then(() => {
        notification(208);
    }).catch(() => { notification(502); });
}