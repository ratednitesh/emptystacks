import { pushPopupMessage, publish, getCourseContentDetailsAPICalls } from "./helper";
import { getUid, isUserLoggedIn } from "./firebase-config";
import { signup_selected } from "./setup";
let lastChapterId;
let uid;
export function loadCourseContent(chapterId) {
    if (lastChapterId != chapterId) {
        lastChapterId = chapterId;
        getCourseContent(chapterId);

    }
}

function getCourseContent(chapterId) {
    const contentHtml = document.querySelector('.text-section');
    const showComments = document.getElementById("show-comments");
    const commentHtml = document.querySelector('.comments');
    const watchVideo = contentHtml.querySelector('.watch-video');
    const chapterContent = contentHtml.querySelector('.chapter-content');

    if (isUserLoggedIn()) {
        commentHtml.querySelector(".add-comment").classList.remove('disabled');
        commentHtml.querySelector(".no-comments").classList.add('disabled');
        uid = getUid();

    } else {
        commentHtml.querySelector(".add-comment").classList.add('disabled');
        commentHtml.querySelector(".no-comments").classList.remove('disabled');
        document.querySelector('#start-journey-content').addEventListener("click", function () {
            signup_selected();
        });
    }

    getCourseContentAPICalls(chapterId).then(
        (chapterData) => {
            if (chapterData) {
                contentHtml.querySelector('.heading').innerHTML = chapterData.heading;
                contentHtml.querySelector('#date').innerHTML = chapterData.publishDate;
                contentHtml.querySelector('#likes').innerHTML = chapterData.likes + " Likes";
                contentHtml.querySelector('#author').innerHTML = chapterData.author.name;
                showComments.innerHTML = "Comments (" + chapterData.comments + ")";
                commentHtml.classList.add('disabled');
                showComments.classList.remove('disabled');
                if (chapterData.type == "text") {
                    watchVideo.style.display = "none";
                    chapterContent.style.display = "block";
                    chapterContent.innerHTML = chapterData.content;
                }
                else {
                    watchVideo.style.display = "block";
                    chapterContent.style.display = "none";
                    contentHtml.querySelector('.video').poster = chapterData.thumbnail;
                    contentHtml.querySelector('.description').innerHTML = chapterData.description;
                }
                setContentSidebar(chapterData.courseId, chapterData.courseName, chapterId, chapterData.type);
                showComments.addEventListener('click', () => {
                    showComments.classList.add('disabled');
                    commentHtml.classList.remove('disabled');
                    getCourseContentCommentsAPICalls(chapterId).then(
                        ((commentData) => {
                            var comments = commentHtml.querySelector('.show-comments');
                            comments.innerHTML = "";
                            if (commentData) {
                                for (const comment of commentData) {
                                    const boxDiv = document.createElement("div");
                                    boxDiv.classList.add("box");
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
                                    boxDiv.appendChild(userDiv);
                                    boxDiv.appendChild(commentText);
                                    if (comment.uid == uid) {
                                        // Create form element
                                        const form = document.createElement("form");
                                        form.setAttribute("action", "");
                                        form.setAttribute("method", "post");
                                        form.classList.add("flex-btn");

                                        // Create edit button
                                        var editButton = document.createElement("button");
                                        editButton.setAttribute("type", "submit");
                                        editButton.setAttribute("name", "edit-comment");
                                        editButton.classList.add("inline-option-btn");
                                        editButton.textContent = "edit comment";

                                        // Create delete button
                                        var deleteButton = document.createElement("button");
                                        deleteButton.setAttribute("type", "submit");
                                        deleteButton.setAttribute("name", "delete-comment");
                                        deleteButton.classList.add("inline-delete-btn");
                                        deleteButton.textContent = "delete comment";

                                        // Append buttons to form
                                        form.appendChild(editButton);
                                        form.appendChild(deleteButton);
                                        boxDiv.appendChild(form);
                                    }
                                    comments.appendChild(boxDiv);
                                }
                            }
                        }))
                        .catch((e) => {
                            console.log(e);
                            pushPopupMessage(["FAILURE", "Something went wrong, unable to load comments."]);
                        });
                });
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

function setContentSidebar(courseId, courseName, chapterId, type) {
    getCourseContentDetailsAPICalls(courseId).then(
        (chapterDetails) => {
            var contentSidebarHtml = document.querySelector('#contentSidebar');
            contentSidebarHtml.querySelector('.course-title').innerHTML = courseName;
            var ul = contentSidebarHtml.querySelector(".nano-content");
            ul.innerHTML = "";
            for (const [chapter, topics] of Object.entries(chapterDetails)) {
                const li = document.createElement("li");
                li.classList.add("menu-options");
                if (type == "text") {

                    if (typeof topics === 'object') {
                        li.classList.add("sub-menu");
                        const a = document.createElement("a");
                        a.href = "javascript:void(0);";
                        a.innerHTML = `<span>${chapter}</span><i class="arrow es-angle-double-right pull-right"></i>`;
                        const subUl = document.createElement("ul");
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
                                subUl.style.display = "block";
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
            pushPopupMessage(["FAILURE", "Something went wrong, unable to load Sidebar."]);
        }
    )
}

function initializeContentSideBarListeners() {
    let subMenus = document.querySelectorAll(".sub-menu > a");
    subMenus.forEach(function (link) {
        link.addEventListener("click", function (e) {
            // Close all other sub-menus
            document.querySelectorAll(".sidebar .sub-menu ul").forEach(function (submenu) {
                if (submenu !== link.nextElementSibling) {
                    submenu.style.display = "none";
                }
            });
            // Toggle the visibility of the clicked sub-menu
            if (link.nextElementSibling.style.display == "" || link.nextElementSibling.style.display == "none") {
                link.nextElementSibling.style.display = "block";
            } else {
                link.nextElementSibling.style.display = "none";
            }

            // Prevent the click event from propagating up the DOM hierarchy
            e.stopPropagation();
        });
    });
    // initContentSidebarStatus = true;
}
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