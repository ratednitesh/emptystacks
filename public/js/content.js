import { publish, notification, getFormattedDate, createCourseToken } from "./helper";
import { addDocument, updateEnrolledCourse, getUid, readAllDocuments, readDocument } from "./firebase-config";
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
const addCommentForm = document.querySelector('.add-comment');
const comments = commentHtml.querySelector('.show-comments');
const courseTitle = contentSidebarHtml.querySelector('.course-title a');
const completionMarker = contentHtml.querySelector('.completion');
const courseCompletionModal = document.querySelector('.course-completed-modal');
const thumbsUp = document.querySelector('.chapter-footer .es-thumbs-up');
const thumbsDown = document.querySelector('.chapter-footer .es-thumbs-down');
let lastChapterPath;
let lastCourseId;
let lastChapterId;
let showCompletionButton = true;
let chaptersCompleted;
export function initContent() {
    document.querySelector('#start-journey-content').addEventListener("click", () => {
        signup_selected();
    });
    showComments.addEventListener('click', () => {
        showComments.classList.add('disabled');
        commentHtml.classList.remove('disabled');
        readAllDocuments("CourseDetails/" + lastCourseId + "/Content/" + lastChapterId + "/Comments").then(
            ((commentData) => {
                comments.innerHTML = "";
                if (commentData) {
                    for (const comment of commentData) {
                        displayComment(comment);
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
    addCommentForm.querySelector('input[type="submit"]').addEventListener('click', () => {
        var commentMsg = document.getElementById('comment-msg')
        var msg = commentMsg.value.trim();
        commentMsg.value = '';
        if (msg == '')
            notification(312);
        else {
            var commentObject = {
                "uid": getUid(),
                "name": document.getElementById('user-menu-name').innerHTML,
                "commentDate": getFormattedDate(new Date()),
                "comment": msg,
                "imageSrc": document.getElementById('user-menu-photo').src
            };
            addDocument("CourseDetails/" + lastCourseId + "/Content/" + lastChapterId + "/Comments", commentObject).then(
                () => {
                    displayComment(commentObject);
                    notification(211);
                }
            ).catch(
                (e) => { console.log(e); notification(500) }
            );
        }

    })
    completionMarker.querySelector('a').addEventListener('click', () => {

        const activeI = document.querySelector('.nano-content .active  >a > i');
        let id = activeI.id;
        const regex = /-(\d+)$/;
        let index = id.match(regex)[1];
        console.log("index: " + index);
        activeI.classList.add('es-ok-circled', 'green');
        activeI.classList.remove('es-circle-empty');
        markParentMenuComplete();
        completionMarker.classList.add('disabled');
        let courseToken;
        let incrementer;
        readDocument("UsersPrivate", getUid()).then(async (userData) => {
            let matchingCourse = Object.keys(userData.enrolledCourses).find(course => course === lastCourseId);
            if (!matchingCourse) {
                await readDocument("CourseDetails", lastCourseId).then(
                    (courseData) => {
                        courseToken = createCourseToken(lastCourseId, courseData);
                        courseToken.chaptersCompleted.push(index);
                    });
                incrementer = "saved";
            } else {
                courseToken = userData.enrolledCourses[matchingCourse];
                courseToken.chaptersCompleted.push(index);
            }
            if (nextBtn.href) {
                console.log(nextBtn);
                console.log(nextBtn.id);
                courseToken.nextChapter = new URL(nextBtn.href).pathname;
            }
            if (checkCourseCompletion()) {
                courseToken.status = "Completed"
                incrementer = "completed";
            }
            console.log(courseToken);
            updateEnrolledCourse(lastCourseId, courseToken, incrementer).then(() => {
                notification(214);
            }).catch((e) => { console.log(e); notification(500); });
        })
    });
    courseCompletionModal.querySelector('input[type="submit"]').addEventListener("click", function (event) {
        
        event.preventDefault();

        const ratings = document.querySelectorAll('.ratings input[name="rate"]');
        let selectedRating = null;
        ratings.forEach(radio => {
            if (radio.checked) {
                selectedRating = radio.value;
            }
        });
        if (selectedRating) {
            console.log(`Selected rating: ${selectedRating}`);
            let review = document.getElementById('submit-review').value;
            if (review) {
                console.log(`Review: ${review}`);
            } else {
                console.log('No rating selected');
            }

            var reviewObject = {
                "rating": selectedRating,
                "review": review,
                "user": {
                    "uid": getUid(),
                    "name": document.getElementById('user-menu-name').innerHTML,
                    "commentDate": getFormattedDate(new Date()),
                    "userProfileSrc": document.getElementById('user-menu-photo').src
                }
            };
            addDocument("CourseDetails/" + lastCourseId + "/Reviews", reviewObject).then(
                () => {
                    courseCompletionModal.classList.remove('is-visible');
                    notification(212);
                }
            ).catch(
                (e) => { console.log(e); notification(500) }
            );
        } else {
            console.log('No rating selected');
            notification(314);
        }
    });
    thumbsUp.addEventListener('click', function () {
        thumbsUp.classList.toggle('red');
        thumbsDown.classList.remove('red');
        notification(213); // Optional: Remove red from thumbs down if it was selected
    });

    thumbsDown.addEventListener('click', function () {
        thumbsDown.classList.toggle('red');
        thumbsUp.classList.remove('red'); // Optional: Remove red from thumbs up if it was selected
    });
}
function checkCourseCompletion() {
    var notcompleted = contentSidebarHtml.querySelector('.es-circle-empty')
    if (!notcompleted) {
        courseCompletionModal.classList.add('is-visible');
        return true;
    } else
        return false;
}
function displayComment(comment) {
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
// load course content
export function loadContent(chapterPath) {

    if (lastChapterPath != chapterPath) {
        lastChapterPath = chapterPath;
        let ids = chapterPath.split('/');
        let courseId = ids[0];
        let chapterId = ids[1];
        lastChapterId = chapterId;
        console.log("chapter: " + chapterId + " course:" + courseId);
        hideComments();
        readDocument("CourseDetails/" + courseId + "/Content/", chapterId).then(
            (chapterData) => {
                if (chapterData) {
                    contentHtml.querySelector('.heading').innerHTML = chapterData.heading;
                    contentHtml.querySelector('#date').innerHTML = chapterData.publishDate;
                    contentHtml.querySelector('#likes').innerHTML = chapterData.likes + " Likes";
                    contentHtml.querySelector('#author').innerHTML = chapterData.author.name;
                    showComments.innerHTML = "Comments (" + chapterData.comments + ")";
                    if (chapterData.previousChapter) {
                        prevBtn.classList.remove('locked');
                        prevBtn.href = "/content/" + courseId + "/" + chapterData.previousChapter;
                    } else
                        prevBtn.classList.add('locked');
                    if (chapterData.nextChapter) {
                        nextBtn.classList.remove('locked');
                        nextBtn.href = "/content/" + courseId + "/" + chapterData.nextChapter;
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
                    if (lastCourseId != courseId) {
                        lastCourseId = courseId;
                        loadContentSidebar(chapterData.courseId, chapterData.courseName, chapterPath, chapterData.type);
                    } else {
                        showCompletionButton = false;
                        const activeI = document.querySelector('.nano-content .active  >a > i');
                        if (!activeI.classList.contains('es-ok-circled'))
                            showCompletionButton = true;
                        showMarkCompletion();
                    }

                } else {
                    lastChapterPath = 'notFoundRoute';
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
    else if (lastChapterPath == 'notFoundRoute')
        publish('notFoundRoute');
}

function hideComments() {
    commentHtml.classList.add('disabled');
    showComments.classList.remove('disabled');
    if (getUid()) {
        commentHtml.querySelector(".add-comment").classList.remove('disabled');
        commentHtml.querySelector(".no-comments").classList.add('disabled');

    } else {
        commentHtml.querySelector(".add-comment").classList.add('disabled');
        commentHtml.querySelector(".no-comments").classList.remove('disabled');
    }
}
// load content sidebar
function loadContentSidebar(courseId, courseName, chapterPath, type) {
    readDocument("CourseDetails", courseId).then(
        (courseData) => {
            let chapterDetails = courseData.chapters; // This should be sorted. store as array of object OR sort post retreival
            console.log(JSON.stringify(chapterDetails));
            courseTitle.setAttribute("onclick", "route()");
            courseTitle.href = "/course/" + courseId;
            courseTitle.innerHTML = courseName;
            ul.innerHTML = "";
            for (const [chapter, topics] of Object.entries(chapterDetails)) {
                const li = document.createElement("li");
                li.classList.add("menu-options");
                if (type == "text") {
                    if (!topics.id) {
                        li.classList.add("sub-menu");
                        const a = document.createElement("a");
                        a.href = "javascript:void(0);";
                        a.innerHTML = `<i class="es-circle-empty"></i><span> ${chapter}</span><i class="arrow es-angle-double-down pull-right"></i>`;
                        const subUl = document.createElement("ul");
                        subUl.classList.add('disabled');
                        for (const [topic, value] of Object.entries(topics)) {
                            const subLi = document.createElement("li");
                            const subA = document.createElement("a");
                            subLi.classList.add("sub-menu-options", 'chapter-menu');
                            subA.href = value.href;
                            subA.setAttribute("onclick", "route()");
                            subA.innerHTML = `<i  id="sb-${courseId}-${value.id}" class="es-circle-empty"></i>` + topic;
                            subLi.appendChild(subA);
                            subUl.appendChild(subLi);
                            if ("/content/" + chapterPath == value.href) {
                                subLi.classList.add("active");
                                subUl.classList.remove('disabled');
                                a.innerHTML = `<i class="es-circle-empty"></i><span> ${chapter}</span><i class="arrow es-angle-double-up pull-right"></i>`;
                            }
                        }

                        li.appendChild(a);
                        li.appendChild(subUl);
                    } else {
                        li.classList.add('chapter-menu');
                        if ("/content/" + chapterPath == topics.href)
                            li.classList.add("active");
                        const a = document.createElement("a");
                        a.href = topics.href;
                        a.setAttribute("onclick", "route()");
                        a.innerHTML = `<i id="sb-${courseId}-${topics.id}" class="es-circle-empty"></i><span> ${chapter}</span>`;
                        li.appendChild(a);
                    }
                    ul.appendChild(li);
                } else {
                    li.classList.add('chapter-menu');
                    if ("/content/" + chapterPath == topics.href)
                        li.classList.add("active");
                    li.classList.add("video-list");
                    const a = document.createElement('a');
                    a.href = topics.href;
                    a.setAttribute("onclick", "route()");

                    const img = document.createElement('img');
                    img.src = topics.thumbnail;
                    img.alt = '';

                    const span = document.createElement('span');
                    span.innerHTML = chapter;

                    a.appendChild(img);
                    const itag = document.createElement('i');
                    itag.classList.add('es-circle-empty');
                    itag.id = "sb-" + courseId + '-' + topics.id;
                    a.appendChild(itag);
                    a.appendChild(span);
                    li.appendChild(a);
                    ul.appendChild(li);
                }
            }
            updateUserLevelsOnEnrolledCourses();
            initializeContentSideBarListeners();
        }
    ).catch(
        (e) => {
            console.log(e);
            notification(501, 'sidebar');
        }
    )
}
function updateUserLevelsOnEnrolledCourses() {
    showCompletionButton = false;
    let uid = getUid();
    if (uid) {
        readDocument("UsersPrivate", uid).then((userData) => {
            var coursehref = "/course/" + lastCourseId;
            console.log(coursehref);
            let matchingCourse = Object.values(userData.enrolledCourses).find(course => course.href === coursehref);

            if (matchingCourse) {
                chaptersCompleted = matchingCourse.chaptersCompleted;
                chaptersCompleted.forEach(id => {
                    let savedId = "sb-" + lastCourseId + "-" + id
                    let i = document.getElementById(savedId);
                    i.classList.remove('es-circle-empty');
                    i.classList.add('es-ok-circled', 'green');
                });
                markParentMenuComplete();
            }
            const activeI = document.querySelector('.nano-content .active  >a > i');
            if (!activeI.classList.contains('es-ok-circled'))
                showCompletionButton = true;
            showMarkCompletion();
        })
    }

}
function markParentMenuComplete() {
    const items = document.querySelectorAll('.sub-menu');
    items.forEach(item => {
        let subI = item.querySelectorAll('.sub-menu-options > a > i');
        if (subI.length) {
            const noneContainOkCircle = Array.from(subI).every(k => !k.classList.contains('es-circle-empty'));
            if (noneContainOkCircle) {
                let i = item.querySelector('a > i:first-of-type');
                i.classList.remove('es-circle-empty');
                i.classList.add('es-ok-circled', 'green');
            }
        }
    });
}
function showMarkCompletion() {
    console.log(showCompletionButton);
    if (showCompletionButton) {
        completionMarker.classList.remove('disabled');
    } else {
        completionMarker.classList.add('disabled');
    }
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
            e.stopPropagation();
        });
    });

    let menuOptions = document.querySelectorAll('.chapter-menu');
    menuOptions.forEach(mo => mo.addEventListener('click', (event) => { menuOptions.forEach(moi => { if (moi == mo) moi.classList.add('active'); else moi.classList.remove('active') }) }))
}