import { deletePrivateCourse, getAllStreams, getPrivateCourseDetail, updatePrivateCourse } from "./db-services";
import { getFormattedDate, notification, publish } from "./helper";
import { modifyDisabledClass } from "./ui-services";

const textCourse = document.querySelector('#private-course-header');
const expandButton = document.getElementById("private-expand-button");
const courseDetails = document.querySelector("#private-text-course-details .flex-container .accordion");
const videoDetails = document.querySelector("#private-video-course-details .flex-container");
const allBars = textCourse.querySelectorAll('.signal-bars .bar');
const startButton = document.getElementById('private-content-link');
const levelNames = ['Easy', 'Intermediate', 'Expert'];
const editBtn = document.getElementById('private-edit');
const cancelBtn = document.getElementById('private-cancel');
const saveBtn = document.getElementById('private-save');
const deleteBtn = document.getElementById('private-trash');

const courseName = textCourse.querySelector('#private-courseName');
const attachStreamsBtn = textCourse.querySelector('#private-add-streams');
const courseDescription = textCourse.querySelector('#private-description');
const courseLevel = textCourse.querySelector('#private-course-level');
const attachStreamsModal = document.querySelector('.attach-streams-modal');
const addStreamSearch = document.getElementById('add-stream-search');
const streamSuggestionBox = document.getElementById('stream-suggestions');
const editableFields = [courseName, courseDescription,];
let streamSuggestions = [];
let selectedStreams = {};
let loadedCourseId;
export function initPrivateCourse() {
    // Get all menu from document
    document.querySelectorAll('.triggerButton').forEach(OpenMenu);
    getAllStreams().then(
        (streams) => {
            console.log('loaded streams');
            console.log(streams);
            streamSuggestions = streams;
            // for (let [key, value] of Object.entries(streams)) {
            //     streamSuggestions.push(key);
            // }
        }
    )
    // Menu Open and Close function
    function OpenMenu(active) {
        if (active.classList.contains('triggerButton') === true) {
            active.addEventListener('click', function (e) {
                e.preventDefault();

                if (this.nextElementSibling.classList.contains('active') === true) {
                    // Close the clicked dropdown
                    this.parentElement.classList.remove('active');
                    this.nextElementSibling.classList.remove('active');

                } else {
                    // Close the opend dropdown
                    closeMenu();
                    // add the open and active class(Opening the DropDown)
                    this.parentElement.classList.add('active');
                    this.nextElementSibling.classList.add('active');
                }
            });
        }
    };

    // Close the openend Menu
    function closeMenu() {
        // remove the open and active class from other opened Moenu (Closing the opend Menu)
        document.querySelectorAll('.radial').forEach(function (container) {
            container.classList.remove('active')
        });

        document.querySelectorAll('.radialMenu').forEach(function (menu) {
            menu.classList.remove('active');
        });
    }
    expandButton.addEventListener('click', () => {
        var accordionItems = courseDetails.querySelectorAll('.accordion-item');
        var expandItems = courseDetails.querySelectorAll('.expand');
        if (expandButton.textContent === "Minimize All") {
            accordionItems.forEach(function (item) {
                item.classList.remove('active');
            });
            expandItems.forEach(function (expandItem) {
                expandItem.classList.remove('es-angle-up');
                expandItem.classList.add('es-angle-down');
            });
            expandButton.textContent = "Expand All";
        } else {
            accordionItems.forEach(function (item) {
                item.classList.add('active');
            });
            expandItems.forEach(function (expandItem) {
                expandItem.classList.add('es-angle-up');
                expandItem.classList.remove('es-angle-down');
            });
            expandButton.textContent = "Minimize All";
        }
    });
    attachStreamsBtn.addEventListener('click', () => {
        attachStreamsModal.classList.add('is-visible');
    });


    addStreamSearch.addEventListener('keyup', function (event) {
        // event.preventDefault();
        // event.stopPropagation();
        if (event.key === 'Enter') {
            if (streamSuggestionBox.firstChild.querySelector('span')) {
                // TODO: do not add if emtpy or white spaces
                addStreamToCourse(addStreamSearch.value);
            }
            else
                addStreamToCourse(streamSuggestionBox.firstChild.innerText);
            // enterTextHandler()
        }

        let inputValueElem = addStreamSearch.value

        if (inputValueElem) {
            streamSuggestionBox.classList.remove('disabled');

            let filteredWords = Object.keys(streamSuggestions).filter(function (word) {

                return word.toLowerCase().startsWith(inputValueElem.toLowerCase())
            }).filter(word => !Object.keys(selectedStreams).includes(word))

            suggestionWordsGenerator(filteredWords)

        } else {
            streamSuggestionBox.classList.add('disabled')
        }
    })

    function suggestionWordsGenerator(wordsArray) {
        let listItemsArray = wordsArray.map(function (word) {
            return '<li>' + word + '</li>'
        })

        let customWord;

        if (!listItemsArray.length) {
            // TODO: do not show suggestions if whitespaces or less than 3 chars.
            customWord = '<li>' + addStreamSearch.value + '<span> New</span></li>';
            streamSuggestionBox.innerHTML = customWord;
            let newWord = streamSuggestionBox.querySelector('li');

            newWord.addEventListener('click', () => {
                addStreamToCourse(addStreamSearch.value);
            })
        } else {
            customWord = listItemsArray.join('');
            streamSuggestionBox.innerHTML = customWord;
            selectText()
        }
    }

    function selectText() {
        let allListItem = streamSuggestionBox.querySelectorAll('li')

        allListItem.forEach(function (wordItem) {
            wordItem.addEventListener('click', function (event) {
                addStreamToCourse(event.target.innerHTML);
                // inputElem.value = event.target.innerHTML
                // searchInputElem.classList.remove('active')
            })
        })
    }
    function addStreamToCourse(stream) {
        if (streamSuggestions[stream])
            selectedStreams[stream] = streamSuggestions[stream];
        else
            selectedStreams[stream] = { icon: 'es-star', text: stream };// TODO: remove whitespace but make sure doesn't show up in suggestions
        showPrivateStreamsUI(selectedStreams, '.selected-streams-modal');
        addStreamSearch.value = "";
        streamSuggestionBox.classList.add('disabled')
    }
    attachStreamsModal.querySelector('input[type="submit"]').addEventListener("click", function (event) {
        event.preventDefault();
        console.log('save streams');
        let courseData = {
            streams: selectedStreams,
        };
        updatePrivateCourse(loadedCourseId, courseData);
        attachStreamsModal.classList.remove('is-visible');
        showPrivateStreamsUI(selectedStreams, '.private-streams');
        notification(216);
    });

    editBtn.addEventListener('click', () => {
        modifyDisabledClass(editBtn, 1);
        modifyDisabledClass(deleteBtn, 1);
        modifyDisabledClass(saveBtn, 0);
        modifyDisabledClass(cancelBtn, 0);
        allowModifications(true);

    })
    cancelBtn.addEventListener('click', () => {
        modifyDisabledClass(editBtn, 0);
        modifyDisabledClass(deleteBtn, 0);
        modifyDisabledClass(saveBtn, 1);
        modifyDisabledClass(cancelBtn, 1);
        allowModifications(false);
        loadPrivateCourse(loadedCourseId);
    })
    saveBtn.addEventListener('click', () => {
        modifyDisabledClass(editBtn, 0);
        modifyDisabledClass(deleteBtn, 0);
        modifyDisabledClass(saveBtn, 1);
        modifyDisabledClass(cancelBtn, 1);
        var upadtedCourseName = textCourse.querySelector('#private-courseName').innerHTML;
        var upadtedCourseDesc = textCourse.querySelector('#private-description').innerHTML;
        var upadtedCourseLevel = textCourse.querySelector('#course-level-select').value;
        let courseData = {
            courseName: upadtedCourseName,
            description: upadtedCourseDesc,
            level: parseInt(upadtedCourseLevel),
        };
        updatePrivateCourse(loadedCourseId, courseData);
        console.log(courseData);
        notification(216);
        courseLevel.textContent = document.getElementById('course-level-select').value;;
        allowModifications(false)

    })
    deleteBtn.addEventListener('click', () => {
        deletePrivateCourse(loadedCourseId);
        // TODO: refresh loaded page and home.
        notification(218);
    });
}

function allowModifications(allowEdits) {
    editableFields.forEach(element => {
        if (allowEdits) {
            element.classList.add('editable');
            element.contentEditable = true;
        }
        else {
            element.classList.remove('editable');
            element.contentEditable = false;
        }
    });
    if (allowEdits) {
        const currentValue = courseLevel.textContent;

        // Create the select element
        const select = document.createElement('select');
        select.className = 'course-level-text';
        select.id = 'course-level-select';

        // Define the allowed values
        const levels = ['Easy', 'Intermediate', 'Expert'];

        // Create options and append them to the select element
        let i = 1;
        levels.forEach(level => {
            const option = document.createElement('option');
            option.value = i++;
            option.textContent = level;
            if (level === currentValue) {
                option.selected = true;
            }
            select.appendChild(option);
        });

        // Replace the span with the select element
        courseLevel.replaceWith(select);

        // Focus on the select element
        select.focus();
    } else {
        document.getElementById('course-level-select').replaceWith(courseLevel);
    }
}

export function loadPrivateCourse(courseId) {
    loadedCourseId = courseId;
    getPrivateCourseDetail(courseId).then(
        (courseData) => {
            if (Object.keys(courseData).length != 0) {
                textCourse.querySelectorAll('.chapters').forEach((event) => {
                    event.innerHTML = courseData.chapterCount + " Chapters";
                });
                textCourse.querySelector('#private-publishDate').innerHTML = getFormattedDate(courseData.createdAt);
                courseName.innerHTML = courseData.courseName;
                courseDescription.innerHTML = courseData.description;
                // startButton.href = courseData?.href;
                const level = courseData.level;
                const n = 4 - level; // Calculate the value of n based on the level
                courseLevel.innerHTML = levelNames[level - 1];
                allBars.forEach(bar => {
                    bar.style.background = '#fff';
                });
                const selectedBars = textCourse.querySelectorAll('.signal-bars .bar:nth-last-child(n+' + n + ')');
                selectedBars.forEach(bar => {
                    bar.style.background = 'var(--main-color)';
                });
                var tutorData = courseData.author;
                textCourse.querySelector('#private-tutor-link').href = "/profile/" + tutorData.uid;
                textCourse.querySelector('#private-tutor-img').src = tutorData.photoURL;
                textCourse.querySelector('#private-tutor-name').innerHTML = tutorData.displayName;
                textCourse.querySelector('#private-tutor-role').innerHTML = "Stack Builder";
                selectedStreams = courseData.streams;
                showPrivateStreamsUI(selectedStreams, '.selected-streams-modal');
                showPrivateStreamsUI(selectedStreams, '.private-streams');
                let courseContentData = courseData.chapters;
                if (courseData.type == "text") {
                    modifyDisabledClass(document.querySelector("#private-text-course-details"), 0);
                    modifyDisabledClass(document.querySelector("#private-video-course-details"), 1);
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
                            headingLink.href = '/private-content/' + courseId + '/' + topics.href;
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
                                topicLink.href = '/private-content/' + courseId + '/' + topic.href;
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

                    courseDetails.querySelectorAll('.expandable').forEach(function (header) {
                        header.addEventListener('click', function () {
                            var item = this.parentNode;
                            item.classList.toggle('active');
                            this.children[0]?.children[1]?.classList.toggle('es-angle-up');
                            this.children[0]?.children[1]?.classList.toggle('es-angle-down');
                        });
                    });
                }
                else {
                    modifyDisabledClass(document.querySelector("#private-video-course-details"), 0);
                    modifyDisabledClass(document.querySelector("#private-text-course-details"), 1);
                    videoDetails.innerHTML = "";
                    courseContentData.forEach(cvd => {
                        const videoHtml = document.createElement("a");
                        videoHtml.href = '/private-content/' + courseId + '/' + cvd.href;
                        videoHtml.setAttribute("onclick", "route()");
                        videoHtml.classList.add("box");
                        videoHtml.innerHTML = `<i class="es-play-lg"></i><img class="thumb-md" src="${cvd.thumbnail}"alt=""><h2 class="title"><i id="${courseId}-${cvd.id}" class="es-circle-empty"></i> ${cvd.title}</h2>`;
                        videoDetails.appendChild(videoHtml);
                    });
                }
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

function showPrivateStreamsUI(streamsData, targetPath) {
    const streamContainer = document.querySelector(targetPath);
    streamContainer.innerHTML = "";
    for (const [streamId, stream] of Object.entries(streamsData)) {
        // Create the anchor tag
        const anchorTag = document.createElement('a');
        anchorTag.classList.add('transparent-btn')
        if (targetPath == '.selected-streams-modal') {
            anchorTag.id = 'modal-' + streamId;
            anchorTag.onclick = (event) => {
                const el = event.target.closest('a');
                let streamId = el.id.replace('modal-', "");
                console.log(streamId);
                delete selectedStreams[streamId];
                showPrivateStreamsUI(selectedStreams, '.selected-streams-modal')
            }
        }
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
        streamContainer.appendChild(anchorTag);
    };

}