import { publish, getCourseContentDetailsAPICalls, notification } from "./helper";
import { getUid, isUserLoggedIn } from "./firebase-config";
import { signup_selected } from "./setup";
import { copyPathToClipboard } from "./router";

const contentSidebarHtml = document.querySelector('#contentSidebar');
const ul = contentSidebarHtml.querySelector(".nano-content");
const contentHtml = document.querySelector('.text-section');
const showComments = document.getElementById("show-comments");
const commentHtml = document.querySelector('.comments');
const watchVideo = contentHtml.querySelector('.watch-video');
const chapterContent = contentHtml.querySelector('.chapter-content');
const shareButton = document.getElementById('share');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let lastChapterId;
export function initContent() {
    document.querySelector('#start-journey-content').addEventListener("click", () => {
        signup_selected();
    });
    showComments.addEventListener('click', () => {
        showComments.classList.add('disabled');
        commentHtml.classList.remove('disabled');
        getCourseContentCommentsAPICalls(lastChapterId).then(
            ((commentData) => {
                var comments = commentHtml.querySelector('.show-comments');
                comments.innerHTML = "";
                if (commentData) {
                    for (const comment of commentData) {
                        const boxDiv = document.createElement("div");
                        boxDiv.classList.add("box");
                        const userParentDiv = document.createElement("div");
                        userParentDiv.classList.add("user-parent");
                        const userDiv = document.createElement("div");
                        userDiv.classList.add("user");

                        const userImg = document.createElement("img");
                        userImg.src = comment.imageSrc;
                        userImg.alt = "";
                        const userInfoDiv = document.createElement("div");
                        const userName = document.createElement("h2");
                        userName.textContent = comment.name;

                        const commentDate = document.createElement("span");
                        commentDate.textContent = comment.commentDate;

                        userInfoDiv.appendChild(userName);
                        userInfoDiv.appendChild(commentDate);

                        const profileLink = document.createElement("a");
                        profileLink.setAttribute("onclick", "route()");
                        profileLink.href = "/profile/" + comment.uid;

                        profileLink.appendChild(userImg);
                        userDiv.appendChild(profileLink);
                        userDiv.appendChild(userInfoDiv);

                        const commentText = document.createElement("p");
                        commentText.classList.add("text");
                        commentText.textContent = comment.comment;
                        userParentDiv.appendChild(userDiv);
                        let uid = getUid();
                        if (comment.uid == uid) {
                            // Create edit div element
                            var editDiv = document.createElement("div");
                            editDiv.classList.add("edit-my-comments")

                            // Create edit button
                            var editButton = document.createElement("i");
                            editButton.classList.add("es-pencil");

                            // Create delete button
                            var deleteButton = document.createElement("i");
                            deleteButton.classList.add("es-trash");
                            editButton.addEventListener("click", () => { console.log("now you can edit comment") });
                            deleteButton.addEventListener("click", () => { console.log("comment deleted.") });
                            // Append buttons to div
                            editDiv.appendChild(editButton);
                            editDiv.appendChild(deleteButton);
                            userParentDiv.appendChild(editDiv);
                        }
                        boxDiv.appendChild(userParentDiv);
                        boxDiv.appendChild(commentText);
                        comments.appendChild(boxDiv);
                    }
                }
            }))
            .catch((e) => {
                console.log(e);
                notification(501, 'comments');
            });
    });
    shareButton.addEventListener('click', () => {
        copyPathToClipboard();
        notification(207);
    })
}

// load course content
export function loadContent(chapterId) {
    if (lastChapterId != chapterId) {
        lastChapterId = chapterId;
        hideComments();
        getCourseContentAPICalls(chapterId).then(
            (chapterData) => {
                if (chapterData) {
                    contentHtml.querySelector('.heading').innerHTML = chapterData.heading;
                    contentHtml.querySelector('#date').innerHTML = chapterData.publishDate;
                    contentHtml.querySelector('#likes').innerHTML = chapterData.likes + " Likes";
                    contentHtml.querySelector('#author').innerHTML = chapterData.author.name;
                    showComments.innerHTML = "Comments (" + chapterData.comments + ")";
                    if (chapterData.previousChapter) {
                        prevBtn.classList.remove('locked');
                        prevBtn.href = chapterData.previousChapter;
                    } else
                        prevBtn.classList.add('locked');
                    if (chapterData.nextChapter) {
                        nextBtn.classList.remove('locked');
                        nextBtn.href = chapterData.nextChapter;
                    } else
                        nextBtn.classList.add('locked');

                    if (chapterData.type == "text") {
                        watchVideo.classList.add('disabled');
                        chapterContent.classList.remove('disabled');
                        chapterContent.innerHTML = chapterData.content;
                    }
                    else {
                        watchVideo.classList.remove('disabled');
                        chapterContent.classList.add('disabled');
                        // contentHtml.querySelector('.video').poster = chapterData.thumbnail;
                        contentHtml.querySelector('.video').src = chapterData.videoId;
                        contentHtml.querySelector('.description').innerHTML = chapterData.description;
                    }
                    loadContentSidebar(chapterData.courseId, chapterData.courseName, chapterId, chapterData.type);

                } else {
                    lastChapterId = 'notFoundRoute';
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
    else if (lastChapterId == 'notFoundRoute')
        publish('notFoundRoute');
}

export function hideComments() {
    commentHtml.classList.add('disabled');
    showComments.classList.remove('disabled');
    if (isUserLoggedIn()) {
        commentHtml.querySelector(".add-comment").classList.remove('disabled');
        commentHtml.querySelector(".no-comments").classList.add('disabled');

    } else {
        commentHtml.querySelector(".add-comment").classList.add('disabled');
        commentHtml.querySelector(".no-comments").classList.remove('disabled');
    }
}
// load content sidebar
function loadContentSidebar(courseId, courseName, chapterId, type) {
    getCourseContentDetailsAPICalls(courseId).then(
        (chapterDetails) => {
            contentSidebarHtml.querySelector('.course-title').innerHTML = courseName;
            ul.innerHTML = "";
            for (const [chapter, topics] of Object.entries(chapterDetails)) {
                const li = document.createElement("li");
                li.classList.add("menu-options");
                if (type == "text") {
                    if (typeof topics === 'object') {
                        li.classList.add("sub-menu");
                        const a = document.createElement("a");
                        a.href = "javascript:void(0);";
                        a.innerHTML = `<span>${chapter}</span><i class="arrow es-angle-double-down pull-right"></i>`;
                        const subUl = document.createElement("ul");
                        subUl.classList.add('disabled');
                        for (const [topic, link] of Object.entries(topics)) {
                            const subLi = document.createElement("li");
                            const subA = document.createElement("a");
                            subLi.classList.add("sub-menu-options");
                            subA.href = link;
                            subA.setAttribute("onclick", "route()");
                            subA.textContent = topic;
                            subLi.appendChild(subA);
                            subUl.appendChild(subLi);
                            if ("/content/" + chapterId == link) {
                                subLi.classList.add("active");
                                subUl.classList.remove('disabled');
                                a.innerHTML = `<span>${chapter}</span><i class="arrow es-angle-double-up pull-right"></i>`;
                            }
                        }
                        li.appendChild(a);
                        li.appendChild(subUl);
                    } else {
                        if ("/content/" + chapterId == topics)
                            li.classList.add("active");
                        const a = document.createElement("a");
                        a.href = topics;
                        a.setAttribute("onclick", "route()");
                        a.innerHTML = `<span>${chapter}</span>`;
                        li.appendChild(a);
                    }
                    ul.appendChild(li);
                } else {
                    if ("/content/" + chapterId == topics.href)
                        li.classList.add("active");
                    li.classList.add("video-list");
                    const a = document.createElement('a');
                    a.href = topics.href;
                    a.setAttribute("onclick", "route()");

                    const img = document.createElement('img');
                    img.src = topics.thumbnail;
                    img.alt = '';

                    const span = document.createElement('span');
                    span.textContent = chapter;

                    a.appendChild(img);
                    a.appendChild(span);
                    li.appendChild(a);
                    ul.appendChild(li);
                }
            }
            initializeContentSideBarListeners();
        }
    ).catch(
        (e) => {
            console.log(e);
            notification(501, 'sidebar');
        }
    )
}

// Initialize listeners on sidebar ( post load content sidebar)
function initializeContentSideBarListeners() {
    let subMenus = document.querySelectorAll(".sub-menu > a");
    subMenus.forEach(function (link) {
        link.addEventListener("click", function (e) {
            // Close all other sub-menus
            document.querySelectorAll(".sidebar .sub-menu ul").forEach(function (submenu) {
                if (submenu !== link.nextElementSibling) {
                    submenu.classList.add('disabled');
                }
            });
            // Toggle the visibility of the clicked sub-menu
            if (link.nextElementSibling.classList.contains('disabled')) {
                link.nextElementSibling.classList.remove('disabled');
            } else {
                link.nextElementSibling.classList.add('disabled');
            }
            // Prevent the click event from propagating up the DOM hierarchy
            e.stopPropagation(); // TODO: may be needed at all places as well.
        });
    });
}

// TODO: Potentially need to remove following function */
async function importMockApi() {
    try {
        const {
            mockgetCourseContentAPICall, mockgetCourseContentCommentsAPICall } = await import('/public/test/mock-api.js');

        return {
            mockgetCourseContentAPICall,
            mockgetCourseContentCommentsAPICall
        };
    } catch (error) {
        console.error('Error importing mock API:', error);
        throw error;
    }
}
async function getCourseContentAPICalls(courseId) {
    const mockApi = await importMockApi();
    return new Promise((resolve, reject) => {
        // If data is already cached, resolve with the cached data

        // Simulate an API call
        mockApi.mockgetCourseContentAPICall(courseId)
            .then(response => {
                // TODO: Store the API response in the cachedData object
                resolve(response); // Resolve with the API response
            })
            .catch(error => {
                reject(error); // Reject with the error from the API call
            });

    });
}
async function getCourseContentCommentsAPICalls(courseId) {
    const mockApi = await importMockApi();
    return new Promise((resolve, reject) => {
        // If data is already cached, resolve with the cached data

        // Simulate an API call
        mockApi.mockgetCourseContentCommentsAPICall(courseId)
            .then(response => {
                // TODO: Store the API response in the cachedData object
                resolve(response); // Resolve with the API response
            })
            .catch(error => {
                reject(error); // Reject with the error from the API call
            });

    });
}