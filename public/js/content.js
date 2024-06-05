import { publish, notification, getFormattedDate, createCourseToken, sortChapters, enrollUserToCourse, addUserToChapterLikes } from "./helper";
import { addDocument, updateEnrolledCourse, getUid, readAllDocuments, readDocument, deleteDocument, updateDocument, likedTutorial, getDocCounts } from "./firebase-config";
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
const ratingDiv = document.querySelector('.ratings');
const ratings = ratingDiv.querySelectorAll('input[name="rate"]');
const review = document.getElementById('submit-review');

let lastChapterPath;
let lastCourseId;
let lastChapterId;
let showCompletionButton = true;
let chaptersCompleted;
let commentCollection;
let oldComment = {};

export function initContent() {
    document.querySelector('#start-journey-content').addEventListener("click", () => {
        signup_selected();
    });
    showComments.addEventListener('click', () => {
        showComments.classList.add('disabled');
        commentHtml.classList.remove('disabled');
        commentCollection = "CourseDetails/" + lastCourseId + "/Content/" + lastChapterId + "/Comments";
        readAllDocuments(commentCollection).then(
            ((commentData) => {
                comments.innerHTML = "";
                if (commentData) {
                    for (const [commentId, comment] of Object.entries(commentData)) {
                        console.log('comment');
                        console.log(comment);
                        displayComment(commentId, comment);
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
                (id) => {
                    displayComment(id, commentObject);
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
        readDocument("UsersPrivate", getUid()).then(async (userData) => {
            let matchingCourse = Object.keys(userData.enrolledCourses).find(course => course === lastCourseId);
            if (!matchingCourse) {
                await readDocument("CourseDetails", lastCourseId).then(
                    (courseData) => {
                        courseToken = createCourseToken(lastCourseId, courseData);
                        courseToken.chaptersCompleted.push(index);
                    });
                enrollUserToCourse(lastCourseId);

            } else {
                courseToken = userData.enrolledCourses[matchingCourse];
                courseToken.chaptersCompleted.push(index);
            }
            if (nextBtn.href) {
                courseToken.nextChapter = new URL(nextBtn.href).pathname;
            }
            if (checkCourseCompletion()) {
                courseToken.status = "Completed"
            }
            console.log(courseToken);
            updateEnrolledCourse(lastCourseId, courseToken).then(() => {
                notification(214);
            }).catch((e) => { console.log(e); notification(500); });
        })
    });
    ratingDiv.addEventListener('click', () => {
        let selectedRating = null;
        ratings.forEach(radio => {
            if (radio.checked) {
                selectedRating = radio.value;
            }
        });
        console.log(selectedRating);
        switch (selectedRating) {
            case "1":
                review.placeholder = "I had some difficulties with this course. Despite my challenges, I hope my feedback can contribute to improvements for future learners. Constructive criticism is crucial for growth, and I believe this course has the potential to evolve positively.";
                break;
            case "2":
                review.placeholder = "I found this course somewhat lacking in certain areas. However, I believe there's significant potential for improvement based on my experience. My feedback aims to offer constructive suggestions to enhance the overall learning journey for future participants.";
                break;
            case "3":
                review.placeholder = "I enjoyed aspects of this course, but I also encountered areas where it could be better. Despite its shortcomings, I believe it offers value to learners. My feedback aims to highlight areas for improvement while acknowledging its positive aspects.";
                break;
            case "4":
                review.placeholder = "I really liked this course! It was fantastic overall, with only a few minor issues that didn't detract much from my overall enjoyment. My feedback aims to provide constructive suggestions while acknowledging the course's overall quality and positive impact on my learning experience.";
                break;
            case "5":
                review.placeholder = "I loved this course! It was absolutely fantastic, and I would highly recommend it to others. I couldn't be happier with my experience. My feedback aims to express my genuine appreciation for the course and its positive impact on my learning journey.";
                break;
            default:
                review.placeholder = "Enter your review";
                break;
        }
    });

    courseCompletionModal.querySelector('input[type="submit"]').addEventListener("click", function (event) {
        event.preventDefault();
        let selectedRating = null;
        ratings.forEach(radio => {
            if (radio.checked) {
                selectedRating = radio.value;
            }
        });
        if (selectedRating) {
            console.log(`Selected rating: ${selectedRating}`);
            let reviewMessage = review.value;
            if (!reviewMessage)
                reviewMessage = review.placeholder;
            var reviewObject = {
                "rating": selectedRating,
                "review": reviewMessage,
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
    thumbsUp.addEventListener('click', async function () {
        thumbsUp.classList.toggle('red');
        thumbsDown.classList.remove('red');
        if (thumbsUp.classList.contains('red')) {
            addUserToChapterLikes(lastCourseId, lastChapterId, true);
            await likedTutorial(lastCourseId, lastChapterId, lastChapterPath, contentHtml.querySelector('.heading').innerHTML, "liked");
            notification(213);
        }

        else {
            addUserToChapterLikes(lastCourseId, lastChapterId, false);
            await likedTutorial(lastCourseId, lastChapterId, lastChapterPath, contentHtml.querySelector('.heading').innerHTML, "deleted");
        }


    });

    thumbsDown.addEventListener('click', async () => {
        thumbsDown.classList.toggle('red');
        thumbsUp.classList.remove('red');
        addUserToChapterLikes(lastCourseId, lastChapterId, false);
        if (thumbsDown.classList.contains('red')) {
            await likedTutorial(lastCourseId, lastChapterId, lastChapterPath, contentHtml.querySelector('.heading').innerHTML, "disliked");
        }
        else {
            await likedTutorial(lastCourseId, lastChapterId, lastChapterPath, contentHtml.querySelector('.heading').innerHTML, "deleted");
        }
    });
    nextBtn.addEventListener('click', () => {
        console.log('YEah  Ia m hre');
        document.querySelectorAll(".sidebar .sub-menu ul").forEach(function (submenu) {
            submenu.classList.add('disabled');
        });
        let menuOptions = document.querySelectorAll('.chapter-menu');
        menuOptions.forEach(li => {
            let anchor = li.querySelector('a');

            console.log(anchor.getAttribute('href') + " " + new URL(nextBtn.href).pathname);
            if (anchor && anchor.getAttribute('href') === new URL(nextBtn.href).pathname) {
                li.classList.add('active');
                let parentUl = li.closest('ul');
                console.log(parentUl);
                // Check if the parent <ul> has the 'disabled' attribute and remove it if it exists
                if (parentUl) {
                    parentUl.classList.remove('disabled');
                }
            }
            else li.classList.remove('active')
        });
    })
}
function checkCourseCompletion() {
    var notcompleted = contentSidebarHtml.querySelector('.es-circle-empty')
    if (!notcompleted) {
        courseCompletionModal.classList.add('is-visible');
        return true;
    } else
        return false;
}
function displayComment(commentId, comment) {
    const boxDiv = document.createElement("div");
    boxDiv.classList.add("box");
    boxDiv.id = commentId;
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
    commentText.innerText = comment.comment;
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
        var confirmButton = document.createElement("i");
        confirmButton.classList.add("es-ok", "disabled");
        var cancelButton = document.createElement("i");
        cancelButton.classList.add("es-cancel", "disabled");
        editButton.addEventListener("click", () => {
            console.log("now you can edit comment");
            editButton.classList.add('disabled');
            commentText.contentEditable = true;
            console.log(commentText.innerText)
            commentText.focus();
            confirmButton.classList.remove('disabled');
            cancelButton.classList.remove('disabled');
            oldComment[commentId] = commentText.innerText;
        });
        deleteButton.addEventListener("click", () => {
            deleteDocument(commentCollection, commentId).then(() => {
                const boxElement = editButton.closest('.box');
                if (boxElement) {
                    boxElement.remove();
                    notification(215);
                }
            })
        });
        confirmButton.addEventListener("click", () => {
            let newComment = commentText.innerText;
            commentText.contentEditable = false;
            editButton.classList.remove('disabled');
            confirmButton.classList.add('disabled');
            cancelButton.classList.add('disabled');
            if (newComment == oldComment[commentId])
                notification(202, "comment");
            else {
                let update = { comment: newComment };
                updateDocument(commentCollection, commentId, update).then(() => {
                    console.log(newComment);
                    notification(202, "comment");
                }).catch(() => { notification(502); });;
            }
        });
        cancelButton.addEventListener("click", () => {
            commentText.contentEditable = false;
            commentText.innerText = oldComment[commentId];
            editButton.classList.remove('disabled');
            confirmButton.classList.add('disabled');
            cancelButton.classList.add('disabled');
        });

        // Append buttons to div
        editDiv.appendChild(editButton);
        editDiv.appendChild(confirmButton);
        editDiv.appendChild(cancelButton);
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
            async (chapterData) => {
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
                    thumbsUp.classList.remove('red');
                    thumbsDown.classList.remove('red');

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
                    updateLikeStatus();
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
            let chapterDetails = sortChapters(courseData.chapters);
            console.log(JSON.stringify(chapterDetails));
            courseTitle.setAttribute("onclick", "route()");
            courseTitle.href = "/course/" + courseId;
            courseTitle.innerHTML = courseName;
            ul.innerHTML = "";
            for (const [chapter, topics] of Object.entries(chapterDetails)) {
                const li = document.createElement("li");
                li.classList.add("menu-options");
                if (type == "text") {
                    if (!topics.href) {
                        li.classList.add("sub-menu");
                        const a = document.createElement("a");
                        a.href = "javascript:void(0);";
                        a.innerHTML = `<i class="es-circle-empty"></i><span> ${chapter}</span><i class="arrow es-angle-double-down pull-right"></i>`;
                        const subUl = document.createElement("ul");
                        subUl.classList.add('disabled');
                        for (const [topic, value] of Object.entries(topics)) {
                            if (topic != "id") {
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
function updateLikeStatus() {
    let uid = getUid();
    if (uid)
        readDocument("UsersPrivate", uid).then((userData) => {
            let likedContent = Object.values(userData.likedTutorials).find(chapter => chapter.href === lastChapterPath);
            if (likedContent) {
                if (likedContent.status)
                    thumbsUp.classList.add('red');
                else
                    thumbsDown.classList.add('red');
            }
        })
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