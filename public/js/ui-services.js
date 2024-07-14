export function showCoursesUI(coursesData, targetPath, idPrefix) {
    const boxContainer = document.querySelector(targetPath);
    for (const [href, course] of Object.entries(coursesData)) {
        if (!document.getElementById(idPrefix + href)) {
            // Create box element
            const box = document.createElement('div');
            box.classList.add('box');
            box.id = idPrefix + href;

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
            link.textContent = 'View Course';
            link.classList.add('inline-btn');
            link.setAttribute('onclick', 'route()');

            box.appendChild(thumbnailImg);
            if (idPrefix == 'enrolled-') {
                const progressDiv = document.createElement('div');
                progressDiv.classList.add('progress-bar-container');
                const progressBar = document.createElement('div');
                progressBar.classList.add('progress-bar');
                let percent = (course.chaptersCompleted.length / course.totalChapters) * 100;
                progressBar.style.width = percent + '%';
                progressDiv.appendChild(progressBar);
                box.appendChild(progressDiv);
                link.href = course.nextChapter;
            }else if(idPrefix == 'builder-private-'){
                link.href = '/private-course/' + href;
            } 
            else {
                link.href = '/course/' + href;
            } 
            // Append elements to the box
            box.appendChild(title);
            box.appendChild(link);

            boxContainer.appendChild(box);
        }
    };
}

export function showStreamsUI(streamsData, targetPath, page) {
    const streamContainer = document.querySelector(targetPath);
    streamContainer.innerHTML = "";
    for (const [streamId, stream] of Object.entries(streamsData)) {
        // Create the anchor tag
        const anchorTag = document.createElement('a');
        anchorTag.classList.add('transparent-btn')
        if (page == 'streams') {
            anchorTag.classList.add('toggle-section');
            anchorTag.id = streamId;
        } else {
            anchorTag.href = '/streams/' + streamId;
            anchorTag.setAttribute("onclick", "route()");
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

export function modifyDisabledClass(element, flag) {
    if (flag)
        element.classList.add('disabled');
    else
        element.classList.remove('disabled');
}

export function initUserActivities(fieldId, fieldValue) {
    var field = document.getElementById(fieldId);
    var dataField = field.querySelector('h2');
    dataField.innerHTML = fieldValue;
}