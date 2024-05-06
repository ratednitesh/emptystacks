import { pushPopupMessage, publish , getCourseContentDetailsAPICalls} from "./helper";

const levelNames = ['Easy', 'Intermediate', 'Expert'];
let lastCourseId;

export function loadCourseDetails(courseId) {
    // TODO: No action if last course is loaded again. Verify if this logic is correct? 
    if (lastCourseId != courseId) {
        lastCourseId = courseId;
        getCourseData(courseId);
        generateUserReview(courseId).then(
            (reviewsHtml) => {
                if (reviewsHtml) {
                    document.querySelector('.reviews').style.display="block";
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
                textCourse.querySelector('#tutor-link').href = "/profile/"+tutorData.id;
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
            courseDetails.innerHTML ="";

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

async function importMockApi() {
    try {
        const { mockgetCourseReviewAPICall,mockgetTextCourseAPICall } = await import('/public/test/mock-api.js');
        
        return {
            mockgetCourseReviewAPICall,
            mockgetTextCourseAPICall

        };
    } catch (error) {
        console.error('Error importing mock API:', error);
        throw error;
    }
}
 async function generateUserReview(courseId) {
    const mockApi = await importMockApi();
    return new Promise((resolve, reject) => {
        mockApi.mockgetCourseReviewAPICall(courseId).then(
            (courseReview) => {
                var reviewsHtml = '';
                if(!courseReview)
                resolve();
                courseReview.forEach((r) => {
                    var userInfo = r.user;
                    const starsHTML = generateStarRating(r.rating);
                    reviewsHtml += `
                        <div class="box">
                            <p>${r.review}</p>
                            <div class="user">
                                <a  onclick="route()" href="/profile/${userInfo.uid}">
                                <img src="${userInfo.userProfileSrc}" alt="${userInfo.name}">
                                </a>
                                <div>
                                    <h2>${userInfo.name}</h2>
                                    ${starsHTML}
                                </div>
                               
                            </div>
                        </div>
                    `;
                });
                resolve(reviewsHtml);
            }
        ).catch(
            error => {
                reject(error);
            }
        );
    });
}

function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    let starsHTML = '';

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="es-star"></i>';
    }

    // Add half star if necessary
    if (hasHalfStar) {
        starsHTML += '<i class="es-star-half"></i>';
    }

    // Add empty stars to fill up to 5
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="es-star-empty"></i>';
    }

    // Wrap stars in a div
    return '<div class="stars">' + starsHTML + '</div>';
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