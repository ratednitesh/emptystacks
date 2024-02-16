import { getTopCourses } from "./test-data";

export function loadPopularCourses() {
    getTopCourses().then(
        (coursesData) => {
            // Select the box-container element
            const boxContainer = document.querySelector('.courses .box-container');

            // Iterate over coursesData and create HTML elements
            coursesData.forEach(course => {
                // Create box element
                const box = document.createElement('div');
                box.classList.add('box');

                // Create thumbnail image
                const thumbnailImg = document.createElement('img');
                thumbnailImg.src = course.thumbnail;
                thumbnailImg.alt = 'Course Thumbnail';
                thumbnailImg.classList.add('thumb');

                // Create title
                const title = document.createElement('h3');
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
            });

        }
    ).catch(() => { publish('pushPopupMessage', ["FAILURE", "Something went wrong, unable to load top courses."]); });

}