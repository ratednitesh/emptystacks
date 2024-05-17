const selectedSection = document.querySelector('.streams-selected .streams');
const otherSection = document.querySelector('.streams-others .streams');
const noStreamMessage = document.querySelector('.noSelectedStreams');

// Initializer and Listeners: Streams
export async function initStreams() {
    console.log('init streams done');
    return new Promise((resolve, reject) => {
        getAllStreams().then(
            (streams) => {
                streams.forEach(stream => {
                    const anchorTag = document.createElement('a');
                    anchorTag.classList.add('toggle-section');
                    anchorTag.id = encodeURIComponent(stream.text);
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
            console.log('hello trying to toggle');
            event.preventDefault(); // Prevent default anchor behavior
            const sourceSection = this.closest('section');
            const isSelectedSection = sourceSection.classList.contains('streams-selected');
            const targetSection = isSelectedSection ? otherSection : selectedSection;
            targetSection.appendChild(this);
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
        if (a){
            noStreamMessage.classList.add('disabled');
            selectedSection.appendChild(a);
        }
    }

}
function resetSelection() {
    const selectedAnchors = selectedSection.querySelectorAll('a');
    selectedAnchors.forEach(function (anchor) {
        otherSection.appendChild(anchor);
    });
}


// TODO: Potentially need to remove following function */
async function importMockApi() {
    try {
        const { mockgetAllStreamsAPICall, } = await import('/public/test/mock-api.js');
        return {
            mockgetAllStreamsAPICall,
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