import { getUid, isUserLoggedIn } from "./firebase-config";
import { notification, publish, getCourseContentDetailsAPICalls, updateUserData } from "./helper";
import { getUserPrivateData } from "./setup";

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
let lastCourseId;
let courseToken;

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
        // call save course api if is user logged in
        if (isUserLoggedIn()) {
            saveCourse.classList.add('disabled');
            getUserPrivateData(getUid()).then((userData) => {
                if (!userData.enrolledCourses.some(course => course.href === courseToken.href)) {
                    userData.activities["saved-courses"]++;
                    userData.enrolledCourses.push(courseToken);
                    console.log(userData);
                    updateUserData("uid", userData).then(() => {
                        notification(208);
                        // TODO: Refresh activities and enrolled courses everywhere else.
                    }).catch((e) => { console.log(e); notification(502); });
                }
            }).catch((e) => { console.log(e); notification(501, 'user profile') });
        }
    });
}

// Load course page
export function loadCoursePage(courseId) {
    saveCourse.classList.add('disabled');
    progressContainer.classList.add('disabled');
    startButton.innerText = "Start Course";
    if (lastCourseId != courseId) {
        lastCourseId = courseId;
        getCourseData(courseId);
    } else if (lastCourseId == 'notFoundRoute')
        publish('notFoundRoute');
}
function updateUserLevelsOnEnrolledCourses() {
    let uid = getUid();
    if (uid) {
        getUserPrivateData(uid).then((userData) => {
            var coursehref = "/course/" + lastCourseId;
            console.log(coursehref);
            let matchingCourse = userData.enrolledCourses.find(course => course.href === coursehref);
            if (matchingCourse) {
                saveCourse.classList.add('disabled');
                progressContainer.classList.remove('disabled');
                let chaptersCompleted = matchingCourse.chaptersCompleted;
                let percent = (chaptersCompleted.length / matchingCourse.totalChapters) * 100;
                console.log(percent);
                progressBar.style.width = percent + '%';
                startButton.innerText = "Resume Course";
                startButton.href = matchingCourse.nextChapter;
                // TODO: Handle on  auth change as well.

                chaptersCompleted.forEach(id => {
                    let i = document.getElementById(lastCourseId+"-"+id);
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
                saveCourse.classList.remove('disabled');
            }
        })
    }
}
// Load course Data
function getCourseData(courseId) {
    getCourseDetailsAPICalls(courseId).then(
        (courseData) => {
            if (courseData) {
                textCourse.querySelectorAll('.chapters').forEach((event) => {
                    event.innerHTML = courseData.chapterCount + " Chapters";
                });
                textCourse.querySelector('#thumbnail').src = courseData.thumbnail;
                textCourse.querySelector('#publishDate').innerHTML = courseData.publishDate;
                textCourse.querySelector('#courseName').innerHTML = courseData.courseName;
                courseData.streams.forEach(stream => {
                    // Create the anchor tag
                    const anchorTag = document.createElement('a');
                    anchorTag.href = '/streams/' + stream.text;
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
                });

                textCourse.querySelector('#description').innerHTML = courseData.description;
                startButton.href = courseData.href; //TODO: on click here it should also save the course if not already.
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
                textCourse.querySelector('#tutor-link').href = "/profile/" + tutorData.id;
                textCourse.querySelector('#tutor-img').src = tutorData.userProfileSrc;
                textCourse.querySelector('#tutor-name').innerHTML = tutorData.name;
                textCourse.querySelector('#tutor-role').innerHTML = tutorData.role;
                createCourseToken(courseData);
                if (courseData.type == "text") {
                    document.querySelector(".course-details").classList.remove('disabled');
                    document.querySelector(".video-container").classList.add('disabled');
                }
                else {
                    document.querySelector(".video-container").classList.remove('disabled');
                    document.querySelector(".course-details").classList.add('disabled');
                }
                getCourseContentDetailsAPICalls(courseId).then(
                    (courseContentData) => {
                        if (courseData.type == "text") {
                            courseDetails.innerHTML = "";
                            for (const [course, topics] of Object.entries(courseContentData)) {
                                const accordionItem = document.createElement("div");
                                accordionItem.classList.add("accordion-item");
                                const accordionHeader = document.createElement("div");
                                accordionHeader.classList.add("accordion-header");
                                const headerTitle = document.createElement("h2");
                                const headerIcon = document.createElement("i");
                                headerIcon.classList.add("es-circle-empty", "bullet");

                                if (topics.id) {
                                    headerIcon.id = courseId+"-"+topics.id;
                                    headerTitle.appendChild(headerIcon);
                                    headerTitle.innerHTML += ` ${course}`;
                                    const headingLink = document.createElement("a");
                                    headingLink.href = topics.href;
                                    headingLink.setAttribute("onclick", "route()");
                                    headingLink.appendChild(headerTitle);
                                    accordionHeader.appendChild(headingLink);
                                    accordionItem.appendChild(accordionHeader);

                                }
                                else if (typeof topics === "object") {
                                    headerTitle.appendChild(headerIcon);
                                    headerTitle.innerHTML += ` ${course}`;
                                    const expandIcon = document.createElement("i");
                                    expandIcon.classList.add("expand", "es-angle-up");
                                    headerTitle.appendChild(expandIcon);
                                    accordionHeader.classList.add("expandable");
                                    accordionHeader.appendChild(headerTitle);
                                    accordionItem.appendChild(accordionHeader);
                                    const accordionContent = document.createElement("div");
                                    accordionContent.classList.add("accordion-content");

                                    for (const [topic, value] of Object.entries(topics)) {
                                        const courseList = document.createElement("li");
                                        courseList.classList.add("course-list");
                                        const topicLink = document.createElement("a");
                                        topicLink.href = value.href;
                                        topicLink.setAttribute("onclick", "route()");
                                        topicLink.innerHTML = `<i id="${courseId}-${value.id}"class="bullet es-circle-empty"></i>${topic}`;

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
                                    this.children[0].children[1].classList.toggle('es-angle-up');
                                    this.children[0].children[1].classList.toggle('es-angle-down');
                                });
                            });
                        }
                        else {
                            videoDetails.innerHTML = "";
                            for (const [title, cvd] of Object.entries(courseContentData)) {
                                const videoHtml = document.createElement("a");
                                videoHtml.href = cvd.href;
                                videoHtml.setAttribute("onclick", "route()");
                                videoHtml.classList.add("box");
                                videoHtml.innerHTML = `<i class="es-play-lg"></i><img class="thumb-md" src="${cvd.thumbnail}"alt=""><h2 class="title"><i id="${courseId}-${cvd.id}" class="es-circle-empty"></i> ${title}</h2>`;
                                videoDetails.appendChild(videoHtml);
                            };
                        }
                        updateUserLevelsOnEnrolledCourses();
                        getCourseReviews(courseId);
                    }
                )
                    .catch(
                        (e) => {
                            console.log(e);
                            notification(501, 'content details');
                        }
                    )

            } else {
                lastCourseId = 'notFoundRoute';
                publish('notFoundRoute');
            }
        }
    )
        .catch(
            (e) => {
                console.log(e);
                notification(501, 'course');
            }
        )
}

export function disableSignOutUserOptionsForCourse() {
    if (isUserLoggedIn())
        saveCourse.classList.remove('disabled');
    else
        saveCourse.classList.add('disabled');
}
// Load course reviews
function getCourseReviews(courseId) {
    getCourseReviewsAPICall(courseId).then(
        (courseReview) => {
            if (courseReview) {
                document.querySelector('.reviews').classList.remove('disabled');
                boxContainer.innerHTML = "";
                courseReview.forEach((r) => {
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
                    userImage.src = userInfo.userProfileSrc;
                    userImage.alt = userInfo.name;
                    userImage.classList.add('user-logo-sm');
                    const userContentDiv = document.createElement('div');
                    const userName = document.createElement('h2');
                    userName.textContent = userInfo.name;
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
function createCourseToken(courseData) {
    courseToken = {
        thumbnail: courseData.thumbnail,
        title: courseData.courseName,
        href: "/course/" + lastCourseId,
        nextChapter: courseData.href,
        chaptersCompleted: [],
        totalChapters: courseData.chapterCount
    };
}
// TODO: Potentially need to remove following function */
async function importMockApi() {
    try {
        const { mockgetCourseReviewAPICall, mockgetTextCourseAPICall } = await import('/public/test/mock-api.js');

        return {
            mockgetCourseReviewAPICall,
            mockgetTextCourseAPICall

        };
    } catch (error) {
        console.error('Error importing mock API:', error);
        throw error;
    }
}
async function getCourseReviewsAPICall(courseId) {
    const mockApi = await importMockApi();
    return new Promise((resolve, reject) => {
        mockApi.mockgetCourseReviewAPICall(courseId).then(response => {
            // TODO: Store the API response in the cachedData object
            resolve(response);
        })
            .catch(error => {
                reject(error);
            });
    });
}
async function getCourseDetailsAPICalls(courseId) {
    const mockApi = await importMockApi();
    return new Promise((resolve, reject) => {
        // If data is already cached, resolve with the cached data

        // Simulate an API call
        mockApi.mockgetTextCourseAPICall(courseId)
            .then(response => {
                // TODO: Store the API response in the cachedData object
                resolve(response); // Resolve with the API response
            })
            .catch(error => {
                reject(error); // Reject with the error from the API call
            });

    });
}