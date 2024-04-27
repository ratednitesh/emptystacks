import { publish } from "./event-bus";
import { getCourseContentAPICalls, getCourseContentCommentsAPICalls, getCourseContentDetailsAPICalls } from "./fetch-data";
import { pushPopupMessage } from "./setup";
let lastChapterId;
export function loadCourseContent(chapterId) {
    if (lastChapterId != chapterId) {
        lastChapterId = chapterId;
        getCourseContent(chapterId);

    }
}

function getCourseContent(chapterId) {
    getCourseContentAPICalls(chapterId).then(
        (chapterData) => {
            if (chapterData) {
                var contentHtml = document.querySelector('.text-section');
                contentHtml.querySelector('.heading').innerHTML = chapterData.heading;
                contentHtml.querySelector('#date').innerHTML = chapterData.publishDate;
                contentHtml.querySelector('#likes').innerHTML = chapterData.likes + " Likes";
                contentHtml.querySelector('#author').innerHTML = chapterData.author.name;
                contentHtml.querySelector('#show-comments').innerHTML = "Comments (" + chapterData.comments + ")";
                if (chapterData.type == "text") {
                    contentHtml.querySelector('.watch-video').style.display = "none";
                    contentHtml.querySelector('.chapter-content').style.display = "block";
                    contentHtml.querySelector('.chapter-content').innerHTML = chapterData.content;
                }
                else {
                    // TODO: Video 
                    contentHtml.querySelector('.watch-video').style.display = "block";
                    contentHtml.querySelector('.chapter-content').style.display = "none";
                    contentHtml.querySelector('.video').poster = chapterData.thumbnail;
                    contentHtml.querySelector('.description').innerHTML = chapterData.description;
                }
                setContentSidebar(chapterData.courseId, chapterData.courseName, chapterId, chapterData.type);
                document.getElementById("show-comments").addEventListener('click', () => {
                    getCourseContentCommentsAPICalls(chapterId).then(((commentData) => {
                        contentHtml.querySelector('#show-comments').style.display = "none";
                        var commentHtml = document.querySelector('.comments');
                        commentHtml.style.display = "block";
                        var comments = commentHtml.querySelector('.show-comments');
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

                            userDiv.appendChild(userImg);
                            userDiv.appendChild(userInfoDiv);

                            const commentText = document.createElement("p");
                            commentText.classList.add("text");
                            commentText.textContent = comment.comment;

                            const form = document.createElement("form");
                            form.action = "";
                            form.method = "post";
                            form.classList.add("flex-btn");


                            boxDiv.appendChild(userDiv);
                            boxDiv.appendChild(commentText);
                            boxDiv.appendChild(form);

                            comments.appendChild(boxDiv);
                        }
                    })).catch(
                        (e) => {
                            console.log(e);
                            pushPopupMessage(["FAILURE", "Something went wrong, unable to load comments."]);
                        }
                    )
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
            ul.innerHTML= "";
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
// export function loadContentSidebar() {
//     if (!initContentSidebarStatus)
//         initializeContentSideBarListeners();
// 
// }

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
