import { publish } from "./event-bus";
import { getCourseContentAPICalls } from "./fetch-data";
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
                contentHtml.querySelector('#comment-count').innerHTML = "(" + chapterData.comments + ")";
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
