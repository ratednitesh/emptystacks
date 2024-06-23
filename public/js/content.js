import { publish, notification, getFormattedDate } from "./helper";
import { signup_selected } from "./setup";
import { copyPathToClipboard } from "./router";
import { addComment, createReview, deleteComment, getAllComments, updateComment, getUserId, getCourseDetail, getChapterContent, getUserPrivateProfile, enrollToCourse, markChapterCompleted, likeChapter } from "./services";

const contentSidebarHtml = document.querySelector('#contentSidebar');
const ul = contentSidebarHtml.querySelector(".nano-content");
const contentHtml = document.querySelector('.text-section');
const showComments = document.getElementById("show-comments");
const commentHtml = document.querySelector('.comments');
const watchVideo = contentHtml.querySelector('.watch-video');
const chapterContent = contentHtml.querySelector('#chapter-content');
const shareButton = document.getElementById('share');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const addCommentForm = document.querySelector('.add-comment');
const comments = commentHtml.querySelector('.show-comments');
const courseTitle = contentSidebarHtml.querySelector('.course-title a');
const completionMarker = contentHtml.querySelector('.completion');
const submitReviewModal = document.querySelector('.submit-review-modal');
const thumbsUp = document.querySelector('.chapter-footer .es-thumbs-up');
const thumbsDown = document.querySelector('.chapter-footer .es-thumbs-down');
const ratingDiv = document.querySelector('.ratings');
const ratings = ratingDiv.querySelectorAll('input[name="rate"]');
const review = document.getElementById('submit-review');

let loadedChapterPath;
let loadedCourseId;
let loadedChapterId;
let chaptersCompleted;
let courseEnrolled = false;
let chapterTitle;
let oldComment = {};

// Initializer and Listeners: Content
export function initContent() {
    document.querySelector('#start-journey-content').addEventListener("click", () => {
        signup_selected();
    });
    shareButton.addEventListener('click', () => {
        copyPathToClipboard();
        notification(207);
    })

    /* Comment Listeners */
    showComments.addEventListener('click', () => {
        showComments.classList.add('disabled');
        commentHtml.classList.remove('disabled');
        getAllComments(loadedCourseId, loadedChapterId).then(
            ((commentData) => {
                comments.innerHTML = "";
                if (commentData) {
                    for (const [commentId, comment] of Object.entries(commentData)) {
                        displayComment(commentId, comment);
                    }
                }
            }))
            .catch((e) => {
                console.error(e);
                notification(501, 'comments');
            });
    });
    addCommentForm.querySelector('input[type="submit"]').addEventListener('click', () => {
        var commentMsg = document.getElementById('comment-msg')
        var msg = commentMsg.value.trim();
        commentMsg.value = '';
        if (msg == '')
            notification(312);
        else {
            var commentObject = {
                comment: msg,
            };
            addComment(loadedCourseId, loadedChapterId, commentObject).then(
                (id) => {
                    commentObject.createdAt = new Date();
                    displayComment(id, commentObject);
                    notification(211);
                }
            ).catch(
                (e) => { console.error(e); notification(500) }
            );
        }
    })

    /**  Rating Listeners */
    ratingDiv.addEventListener('click', () => {
        let selectedRating = null;
        ratings.forEach(radio => {
            if (radio.checked) {
                selectedRating = radio.value;
            }
        });
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
    submitReviewModal.querySelector('input[type="submit"]').addEventListener("click", function (event) {
        event.preventDefault();
        let selectedRating = null;
        ratings.forEach(radio => {
            if (radio.checked) {
                selectedRating = radio.value;
            }
        });
        if (selectedRating) {
            let reviewMessage = review.value;
            if (!reviewMessage)
                reviewMessage = review.placeholder;
            var reviewObject = {
                rating: selectedRating,
                review: reviewMessage,
            };
            createReview(loadedCourseId, reviewObject).then(
                () => {
                    submitReviewModal.classList.remove('is-visible');
                    notification(212);
                }
            ).catch(
                (e) => { console.error(e); notification(500) }
            );
        } else
            notification(314);
    });

    /** Mark Complete Listeners */
    completionMarker.querySelector('a').addEventListener('click', () => {
        if (getUserId()) {
            /** UI Changes */
            const activeI = document.querySelector('.nano-content .active  >a > i');
            activeI.classList.add('es-ok-circled', 'green');
            activeI.classList.remove('es-circle-empty');
            markParentMenuComplete();
            completionMarker.classList.add('disabled');

            /** Enroll Course If not already */
            if (!courseEnrolled)
                enrollToCourse(loadedCourseId);

            /** Add current Chapter ID to Completed List  */
            const regex = /-(\d+)$/;
            let courseToken = {
                index: activeI.id.match(regex)[1],
                courseStatus: checkCourseCompletion()
            }
            if (nextBtn.href)
                courseToken.nextChapter = new URL(nextBtn.href).pathname;
            markChapterCompleted(loadedCourseId, courseToken).then(() => {
                notification(214);
            }).catch((e) => { console.error(e); notification(500); });
        }
    });

    /** Likes Listeners */
    thumbsUp.addEventListener('click', () => {
        thumbsUp.classList.toggle('red');
        thumbsDown.classList.remove('red');
        let status;
        if (thumbsUp.classList.contains('red')) {
            status = "liked";
            notification(213);
        }
        else
            status = "neutral";
        likeChapter(loadedCourseId, loadedChapterId, status, chapterTitle);

    });

    thumbsDown.addEventListener('click', () => {
        thumbsDown.classList.toggle('red');
        thumbsUp.classList.remove('red');
        let status = thumbsDown.classList.contains('red') ? "disliked" : "neutral";
        likeChapter(loadedCourseId, loadedChapterId, status, chapterTitle);
    });

    /** Chapter Navigation Listeners */
    nextBtn.addEventListener('click', () => {
        changeActiveChapterOnSidebar();
    })
    prevBtn.addEventListener('click', () => {
        changeActiveChapterOnSidebar();
    })
}

// load course content
export function loadContent(chapterPath) {
    if (loadedChapterPath != chapterPath) {
        hideComments();
        thumbsUp.classList.remove('red');
        thumbsDown.classList.remove('red');
        let ids = chapterPath.split('/');
        let courseId = ids[0];
        let chapterId = ids[1];
        getChapterContent(courseId, chapterId).then(
            async (chapterData) => {
                if (Object.keys(chapterData).length != 0) {
                    loadedChapterPath = chapterPath;
                    loadedChapterId = chapterId;
                    chapterTitle = chapterData.heading;
                    contentHtml.querySelector('.heading').innerHTML = chapterData.heading;
                    contentHtml.querySelector('#date').innerHTML = getFormattedDate(chapterData.createdAt);
                    contentHtml.querySelector('#likes').innerHTML = chapterData.likes + " Likes";

                    if (chapterData.previousChapter) {
                        prevBtn.classList.remove('locked');
                        prevBtn.href = "/content/" + courseId + "/" + chapterData.previousChapter;
                    } else
                        prevBtn.classList.add('locked');
                    if (chapterData.nextChapter) {
                        nextBtn.classList.remove('locked');
                        nextBtn.href = "/content/" + courseId + "/" + chapterData.nextChapter;
                    } else {
                        nextBtn.classList.add('locked');
                        nextBtn.href = "";
                    }


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

                    if (loadedCourseId != courseId) {
                        loadedCourseId = courseId;
                        let courseData = await getCourseDetail(courseId);
                        contentHtml.querySelector('#author').innerHTML = courseData.author.displayName;
                        courseTitle.href = "/course/" + courseId;
                        courseTitle.innerHTML = courseData.courseName;
                        loadContentSidebar(courseData.chapters, chapterData.type);
                    }
                    updateUserLevelOnEnrolledCourse();
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
    } else {
        updateUserLevelOnEnrolledCourse();
    }
}

/** load content sidebar */
function loadContentSidebar(chapterDetails, type) {
    ul.innerHTML = "";
    chapterDetails.forEach(topics => {
        const li = document.createElement("li");
        li.classList.add("menu-options");
        if (type == "text") {
            if (topics.type == 'Chapter') {
                li.classList.add('chapter-menu');
                if ("/content/" + loadedChapterPath == topics.href)
                    li.classList.add("active");
                const a = document.createElement("a");
                a.href = topics.href;
                a.setAttribute("onclick", "route()");
                a.innerHTML = `<i id="sb-${loadedCourseId}-${topics.id}" class="es-circle-empty"></i><span> ${topics.title}</span>`;
                li.appendChild(a);
            }
            else {
                li.classList.add("sub-menu");
                const a = document.createElement("a");
                a.href = "javascript:void(0);";
                a.innerHTML = `<i class="es-circle-empty"></i><span> ${topics.title}</span><i class="arrow es-angle-double-down pull-right"></i>`;
                const subUl = document.createElement("ul");
                subUl.classList.add('disabled');
                topics.subChapters.forEach(topic => {
                    const subLi = document.createElement("li");
                    const subA = document.createElement("a");
                    subLi.classList.add("sub-menu-options", 'chapter-menu');
                    subA.href = topic.href;
                    subA.setAttribute("onclick", "route()");
                    subA.innerHTML = `<i  id="sb-${loadedCourseId}-${topic.id}" class="es-circle-empty"></i>` + topic.title;
                    subLi.appendChild(subA);
                    subUl.appendChild(subLi);
                    if ("/content/" + loadedChapterPath == topic.href) {
                        subLi.classList.add("active");
                        subUl.classList.remove('disabled');
                        a.innerHTML = `<i class="es-circle-empty"></i><span> ${topics.title}</span><i class="arrow es-angle-double-up pull-right"></i>`;
                    }
                });
                li.appendChild(a);
                li.appendChild(subUl);
            }
            ul.appendChild(li);
        } else {
            li.classList.add('chapter-menu');
            if ("/content/" + loadedChapterPath == topics.href)
                li.classList.add("active");
            li.classList.add("video-list");
            const a = document.createElement('a');
            a.href = topics.href;
            a.setAttribute("onclick", "route()");

            const img = document.createElement('img');
            img.src = topics.thumbnail;
            img.alt = '';

            const span = document.createElement('span');
            span.innerHTML = topics.title;

            a.appendChild(img);
            const itag = document.createElement('i');
            itag.classList.add('es-circle-empty');
            itag.id = "sb-" + loadedCourseId + '-' + topics.id;
            a.appendChild(itag);
            a.appendChild(span);
            li.appendChild(a);
            ul.appendChild(li);
        }
    });
    loadContentSideBarListeners();
}

/** Sidebar Listeners */
function loadContentSideBarListeners() {
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
    menuOptions.forEach(mo => mo.addEventListener('click', () => { menuOptions.forEach(moi => { if (moi == mo) moi.classList.add('active'); else moi.classList.remove('active') }) }))
}

/** Comment Helper Functions */
function displayComment(commentId, comment) {
    const boxDiv = document.createElement("div");
    boxDiv.classList.add("box");
    boxDiv.id = commentId;
    const userParentDiv = document.createElement("div");
    userParentDiv.classList.add("user-parent");
    const userDiv = document.createElement("div");
    userDiv.classList.add("user");

    const userImg = document.createElement("img");
    userImg.src = comment.user.photoURL;
    userImg.alt = "";
    const userInfoDiv = document.createElement("div");
    const userName = document.createElement("h2");
    userName.textContent = comment.user.displayName;

    const commentDate = document.createElement("span");
    commentDate.textContent = getFormattedDate(comment.createdAt);

    userInfoDiv.appendChild(userName);
    userInfoDiv.appendChild(commentDate);

    const profileLink = document.createElement("a");
    profileLink.setAttribute("onclick", "route()");
    profileLink.href = "/profile/" + comment.user.uid;

    profileLink.appendChild(userImg);
    userDiv.appendChild(profileLink);
    userDiv.appendChild(userInfoDiv);

    const commentText = document.createElement("p");
    commentText.classList.add("text");
    commentText.innerText = comment.comment;
    userParentDiv.appendChild(userDiv);
    let uid = getUserId();
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
            editButton.classList.add('disabled');
            commentText.contentEditable = true;
            commentText.focus();
            confirmButton.classList.remove('disabled');
            cancelButton.classList.remove('disabled');
            oldComment[commentId] = commentText.innerText;
        });
        deleteButton.addEventListener("click", () => {
            deleteComment(loadedCourseId, loadedChapterId, commentId).then(() => {
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
                let commmentObject = { comment: newComment };
                updateComment(loadedCourseId, loadedChapterId, commentId, commmentObject).then(() => {
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

function hideComments() {
    commentHtml.classList.add('disabled');
    showComments.classList.remove('disabled');
    if (getUserId()) {
        commentHtml.querySelector(".add-comment").classList.remove('disabled');
        commentHtml.querySelector(".no-comments").classList.add('disabled');

    } else {
        commentHtml.querySelector(".add-comment").classList.add('disabled');
        commentHtml.querySelector(".no-comments").classList.remove('disabled');
    }
}

function updateUserLevelOnEnrolledCourse() {
    getUserPrivateProfile().then((userData) => {
        if (userData) {
            /** Set Chapter completion on SideBar */
            if (loadedCourseId in userData.enrolledCourses) {
                courseEnrolled = true;
                let matchingCourse = userData.enrolledCourses[loadedCourseId];
                chaptersCompleted = matchingCourse.chaptersCompleted;
                chaptersCompleted.forEach(id => {
                    let savedId = "sb-" + loadedCourseId + "-" + id;
                    let i = document.getElementById(savedId);
                    i.classList.remove('es-circle-empty');
                    i.classList.add('es-ok-circled', 'green');
                });
                markParentMenuComplete();
            }
            /** Show/ Hide Mark Complete Button */
            const activeI = document.querySelector('.nano-content .active  >a > i');
            let showCompletionButton = false;
            if (!activeI.classList.contains('es-ok-circled'))
                showCompletionButton = true;
            showMarkCompleteButton(showCompletionButton);

            /** Mark already Liked / disliked Chapters */
            let likedContent = Object.values(userData.likedTutorials).find(chapter => chapter.href === loadedChapterPath);
            if (likedContent) {
                if (likedContent.status == "liked")
                    thumbsUp.classList.add('red');
                else if (likedContent.status == "disliked")
                    thumbsDown.classList.add('red');
            }
        }
    })
}

function markParentMenuComplete() {
    const items = document.querySelectorAll('.sub-menu');
    items.forEach(item => {
        let subI = item.querySelectorAll('.sub-menu-options > a > i');
        if (subI.length) {
            const allSubChapterCompleted = Array.from(subI).every(k => !k.classList.contains('es-circle-empty'));
            if (allSubChapterCompleted) {
                let i = item.querySelector('a > i:first-of-type');
                i.classList.remove('es-circle-empty');
                i.classList.add('es-ok-circled', 'green');
            }
        }
    });
}

function showMarkCompleteButton(showCompletionButton) {
    if (showCompletionButton) {
        completionMarker.classList.remove('disabled');
    } else {
        completionMarker.classList.add('disabled');
    }
}

function checkCourseCompletion() {
    let notcompleted = contentSidebarHtml.querySelector('.es-circle-empty')
    if (!notcompleted) {
        submitReviewModal.classList.add('is-visible');
        return "Completed";
    } else
        return "In Progress";
}

function changeActiveChapterOnSidebar() {
    document.querySelectorAll(".sidebar .sub-menu ul").forEach(function (submenu) {
        submenu.classList.add('disabled');
    });
    let menuOptions = document.querySelectorAll('.chapter-menu');
    menuOptions.forEach(li => {
        let anchor = li.querySelector('a');
        if (anchor && anchor.getAttribute('href') === new URL(nextBtn.href).pathname) {
            li.classList.add('active');
            let parentUl = li.closest('ul');
            if (parentUl) {
                parentUl.classList.remove('disabled');
            }
        }
        else li.classList.remove('active')
    });
}