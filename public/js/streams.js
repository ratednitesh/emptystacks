import { notification } from './helper';
import { getAllCoursesByStreamId, getAllStreams } from './services';

const selectedSection = document.querySelector('.streams-selected .streams');
const otherSection = document.querySelector('.streams-others .streams');
const noStreamMessage = document.querySelector('.noSelectedStreams');
const boxContainer = document.querySelector('.stream-courses .flex-container');
const selectedStreams = new Set();  // Track selected streams

var coursesByStreams = {};

// Initializer and Listeners: Streams
export async function initStreams() {
    return new Promise((resolve, reject) => {
        getAllStreams().then(
            (streams) => {
                for (const [streamId, stream] of Object.entries(streams)) {
                    const anchorTag = document.createElement('a');
                    anchorTag.classList.add('toggle-section');
                    anchorTag.id = streamId;
                    anchorTag.classList.add('transparent-btn')
                    const iconElement = document.createElement('i');
                    iconElement.classList.add(stream.icon);
                    const spanElement = document.createElement('span');
                    spanElement.textContent = stream.text;
                    anchorTag.appendChild(iconElement);
                    anchorTag.appendChild(spanElement);
                    otherSection.appendChild(anchorTag);
                };
                initAllStreamsListeners();
                resolve();
            }
        ).catch(
            () => {
                notification(501, 'streams');
            }
        );
    });
}

function initAllStreamsListeners() {
    const toggleLinks = document.querySelectorAll('.toggle-section');
    toggleLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default anchor behavior
            const sourceSection = this.closest('section');
            const isSelectedSection = sourceSection.classList.contains('streams-selected');
            const targetSection = isSelectedSection ? otherSection : selectedSection;
            targetSection.appendChild(this);
            const streamId = this.id;
            if (isSelectedSection) {
                selectedStreams.delete(streamId);
                removeCoursesByStream(streamId);
            } else {
                selectedStreams.add(streamId);
                getCoursesByStream(streamId);
            }
            if (!selectedSection.querySelector('a')) {
                noStreamMessage.classList.remove('disabled');
            } else {
                noStreamMessage.classList.add('disabled');
            }
        });
    });
}

export function loadStreams(streamId) {
    resetSelection();
    if (streamId != undefined) {
        const a = document.getElementById(streamId);
        if (a) {
            noStreamMessage.classList.add('disabled');
            selectedSection.appendChild(a);
            selectedStreams.add(streamId);
            while (boxContainer.firstChild) {
                boxContainer.removeChild(boxContainer.firstChild);
            }
            getCoursesByStream(streamId);
        }
    }

}
function resetSelection() {
    const selectedAnchors = selectedSection.querySelectorAll('a');
    selectedAnchors.forEach(function (anchor) {
        otherSection.appendChild(anchor);
    });
}

async function getCoursesByStream(streamId) {
    if (!coursesByStreams[streamId])
        coursesByStreams[streamId] = await getAllCoursesByStreamId(streamId);

    for (const [href, course] of Object.entries(coursesByStreams[streamId])) {
        if (!document.getElementById(href)) {
            // Create box element
            const box = document.createElement('div');
            box.classList.add('box');
            box.id = href;
            // Create thumbnail image
            const thumbnailImg = document.createElement('img');
            thumbnailImg.src = course.thumbnail;
            thumbnailImg.alt = 'Course Thumbnail';
            thumbnailImg.classList.add('thumb-md');

            // Create title
            const title = document.createElement('p');
            title.classList.add('title');
            title.textContent = course.title;

            // Create link
            const link = document.createElement('a');
            link.href = '/course/' + href;
            link.textContent = 'View Course';
            link.classList.add('inline-btn');
            link.setAttribute('onclick', 'route()');

            // Append elements to the box
            box.appendChild(thumbnailImg);
            box.appendChild(title);
            box.appendChild(link);

            boxContainer.appendChild(box);
        }
    };
}
function removeCoursesByStream(streamId) {
    for (let href of Object.keys(coursesByStreams[streamId])) {
        const courseElement = document.getElementById(href);
        if (courseElement) {
            let remove = true;
            selectedStreams.forEach(selectedStreamId => {
                if (href in coursesByStreams[selectedStreamId]) {
                    remove = false;
                }
            });
            if (remove) {
                boxContainer.removeChild(courseElement);
            }
        }
    };
}