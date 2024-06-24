import { notification } from './helper';
import { getAllCoursesByStreamId, getAllStreams } from './db-services';
import { modifyDisabledClass, showCoursesUI, showStreamsUI } from './ui-services';

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
                showStreamsUI(streams, '.streams-others .streams', 'streams');
                initAllStreamsListeners();
                resolve();
            }
        ).catch(
            () => {
                notification(501, 'streams');
                reject();
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
                modifyDisabledClass(noStreamMessage,0);
            } else {
                modifyDisabledClass(noStreamMessage,1);
            }
        });
    });
}

export function loadStreams(streamId) {
    resetSelection();
    if (streamId != undefined) {
        const a = document.getElementById(streamId);
        if (a) {
            modifyDisabledClass(noStreamMessage,1);
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
    showCoursesUI(coursesByStreams[streamId], '.stream-courses .flex-container', 'stream-');
}
function removeCoursesByStream(streamId) {
    for (let href of Object.keys(coursesByStreams[streamId])) {
        const courseElement = document.getElementById('stream-' + href);
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