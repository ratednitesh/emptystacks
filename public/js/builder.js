import { createNewCourse, getPrivateCourses, getTutorDetails, getUserId } from "./db-services";
import { notification, publish } from "./helper";
import { routeTo } from "./router";
import { initUserActivities, showCoursesUI } from "./ui-services";

const createCourseModal = document.querySelector('.create-course-modal');
export function initBuilder() {
    document.querySelector('#builder-new-course i').addEventListener("click", () => {
        createCourseModal.classList.add('is-visible');
    });
    createCourseModal.querySelector('input[type="submit"]').addEventListener("click", function (event) {
        event.preventDefault();

        var courseName = document.getElementById("new-course-name").value;
        var courseDesc = document.getElementById("new-course-desc").value;
        var courseType = document.getElementById("new-course-type").value;
        var courseLevel = document.getElementById("new-course-level").value;
        if (courseName === '' || courseDesc === '' || courseType === '' || courseLevel === '') {
            notification(310);
            return;
        }
        let courseData = {
            courseName: courseName,
            description: courseDesc,
            type: courseType,
            level: parseInt(courseLevel),
            thumbnail: '/images/thumbnails/sample.jpg',
            version: 1.0,
            streams: {},
            chapterCount: 6,
            chapters: [],
            href: "private-content/"
        };
        if (courseType == 'text')
            courseData.chapters = dummyTextChapters;
        else if (courseType == 'video')
            courseData.chapters = dummyVideoChapters;
        console.log(courseData);
        createNewCourse(courseData).then((courseId) => {
            notification(217);
            createCourseModal.classList.remove('is-visible');
            routeTo('private-course', courseId);
        }).catch((e) => {
            notification(507, e);
        });
    });
}
export function loadBuilder() {
    console.log('on loader');
    getTutorDetails(getUserId()).then(
        (tutorData) => {
            if (Object.keys(tutorData).length != 0) {
                for (const property in tutorData.stats) {
                    initUserActivities('builder-' + property, tutorData.stats[property]);
                }
                showCoursesUI(tutorData.publishedCourses, '.flex-container.builder-published-courses', 'builder-published-');
            }
            else
                throw 'Not a Stack Builder user';
        }
    ).catch(() => {
        publish('notFoundRoute');
    })

    getPrivateCourses().then(
        (coursesData) => {
            if (Object.keys(coursesData).length != 0) {
                let courses = {};
                for (const [href, course] of Object.entries(coursesData)) {
                    courses[href] = { thumbnail: course.thumbnail, title: course.courseName };
                };
                showCoursesUI(courses, '.flex-container.builder-private-courses', 'builder-private-');
            }
        }
    ).catch((e) => {
        console.log(e);
        publish('notFoundRoute');
    })
}

const dummyTextChapters = [
    {
        "href": "dummy-chapter-1",
        "id": 1,
        "title": "Dummy Chapter 1",
        "type": "Chapter"
    },
    {
        "subChapters": [
            { "href": "dummy-chapter-2", "id": 2, "title": "Dummy Chapter 2" },
            { "href": "dummy-chapter-3", "id": 3, "title": "Dummy Chapter 3" },
            { "href": "dummy-chapter-4", "id": 4, "title": "Dummy Chapter 4" },

        ],
        "title": "Dummy Section 1",
        "type": "Section"
    },

    {
        "subChapters": [
            { "href": "dummy-chapter-5", "id": 5, "title": "Dummy Chapter 5" },
            { "href": "dummy-chapter-6", "id": 6, "title": "Dummy Chapter 6" },
        ],
        "title": "Dummy Section 2",
        "type": "Section"
    }];

const dummyVideoChapters = [
    { "thumbnail": "/images/thumbnails/sample.jpg", "href": "dummy-chapter-1", "id": 1, "title": "Dummy Chapter 1", "type": "Chapter" },
    { "thumbnail": "/images/thumbnails/sample.jpg", "href": "dummy-chapter-2", "id": 2, "title": "Dummy Chapter 2", "type": "Chapter" },
    { "thumbnail": "/images/thumbnails/sample.jpg", "href": "dummy-chapter-3", "id": 3, "title": "Dummy Chapter 3", "type": "Chapter" },
    { "thumbnail": "/images/thumbnails/sample.jpg", "href": "dummy-chapter-4", "id": 4, "title": "Dummy Chapter 4", "type": "Chapter" },
    { "thumbnail": "/images/thumbnails/sample.jpg", "href": "dummy-chapter-5", "id": 5, "title": "Dummy Chapter 5", "type": "Chapter" },
    { "thumbnail": "/images/thumbnails/sample.jpg", "href": "dummy-chapter-6", "id": 6, "title": "Dummy Chapter 6", "type": "Chapter" }
];
