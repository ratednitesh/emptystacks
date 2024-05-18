import { notification } from './helper';

const selectedSection = document.querySelector('.streams-selected .streams');
const otherSection = document.querySelector('.streams-others .streams');
const noStreamMessage = document.querySelector('.noSelectedStreams');
const boxContainer = document.querySelector('.stream-courses .box-container');
const selectedStreams = new Set();  // Track selected streams

var coursesByStreams = {};
// Initializer and Listeners: Streams
export async function initStreams() {
    console.log('init streams done');
    return new Promise((resolve, reject) => {
        getAllStreams().then(
            (streams) => {
                streams.forEach(stream => {
                    const anchorTag = document.createElement('a');
                    anchorTag.classList.add('toggle-section');
                    anchorTag.id = stream.text;
                    const iconElement = document.createElement('i');
                    iconElement.classList.add(stream.icon);
                    const spanElement = document.createElement('span');
                    spanElement.textContent = stream.text;
                    anchorTag.appendChild(iconElement);
                    anchorTag.appendChild(spanElement);
                    otherSection.appendChild(anchorTag);
                });
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
                getCoursesByStreams(streamId);
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
    console.log('loading streams from load: ' + streamId);
    resetSelection();
    if (streamId != undefined) {
        const a = document.getElementById(streamId);
        if (a) {
            noStreamMessage.classList.add('disabled');
            selectedSection.appendChild(a);
            selectedStreams.add(streamId);
            getCoursesByStreams(streamId);
        }
    }

}
function resetSelection() {
    const selectedAnchors = selectedSection.querySelectorAll('a');
    selectedAnchors.forEach(function (anchor) {
        otherSection.appendChild(anchor);
    });
}

function getCoursesByStreams(streamId) {
    getCoursesByStreamsAPI(streamId).then(
        coursesData => {
            coursesData.forEach(course => {
                if (!document.getElementById(course.href.replace('/course/', ''))) {
                    // Create box element
                    const box = document.createElement('div');
                    box.classList.add('box');
                    box.id = course.href.replace('/course/', '');
                    // Create thumbnail image
                    const thumbnailImg = document.createElement('img');
                    thumbnailImg.src = course.thumbnail;
                    thumbnailImg.alt = 'Course Thumbnail';
                    thumbnailImg.classList.add('thumb');

                    // Create title
                    const title = document.createElement('p');
                    title.classList.add('title');
                    title.textContent = course.title;

                    // Create link
                    const link = document.createElement('a');
                    link.href = course.href;
                    link.textContent = 'View Course';
                    link.classList.add('inline-btn');
                    link.setAttribute('onclick', 'route()');

                    // Append elements to the box
                    box.appendChild(thumbnailImg);
                    box.appendChild(title);
                    box.appendChild(link);

                    // Append box to the box-container
                    boxContainer.appendChild(box);
                }
            });
        }
    ).catch(
        () => {
            notification(501, 'courses by streams');
        }
    );

}
function removeCoursesByStream(streamId) {

    coursesByStreams[streamId].forEach(course => {
        const courseElement = document.getElementById(course.href.replace('/course/', ''));
        if (courseElement) {
            // Only remove if no other selected stream contains this course
            let remove = true;
            selectedStreams.forEach(selectedStreamId => {
                if (coursesByStreams[selectedStreamId]?.some(c => c.href == course.href)) { 
                    // TODO: Check if this question mark is needed else where? 
                    remove = false;
                }
            });
            if (remove) {
                console.log('removing course:'+ course.href);
                boxContainer.removeChild(courseElement);
            }
        }
    });
}

// TODO: Potentially need to remove following function */
async function importMockApi() {
    try {
        const { mockgetAllStreamsAPICall, mockGetCoursesByStreams } = await import('/public/test/mock-api.js');
        return {
            mockgetAllStreamsAPICall,
            mockGetCoursesByStreams
        };
    } catch (error) {
        console.error('Error importing mock API:', error);
        throw error;
    }
}
async function getAllStreams() {
    const mockApi = await importMockApi();
    return new Promise((resolve, reject) => {
        mockApi.mockgetAllStreamsAPICall()
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });

    });
}

async function getCoursesByStreamsAPI(streamId) {
    const mockApi = await importMockApi();
    return new Promise(
        (resolve, reject) => {
            if (coursesByStreams[streamId])
                resolve(coursesByStreams[streamId]);
            else {
                mockApi.mockGetCoursesByStreams(streamId).then(
                    response => {
                        coursesByStreams[streamId] = response;
                        resolve(response);
                    }
                ).catch(error => { reject(error); })
            }
        }
    );
}