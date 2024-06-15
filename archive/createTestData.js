import { deleteField, serverTimestamp } from "firebase/firestore/lite";
import { createDocument, readAllDocuments, readDocument, updateDocument } from "./firebase-config";

export function setup() {
}
function createAllCourses() {
    readAllDocuments("AllCourses").then(
        (courseData) => {
            console.log(JSON.stringify(courseData));
            let targetObject = {};
            for (const [href, data] of Object.entries(courseData)) {
                targetObject[href] = {
                    thumbnail: data.thumbnail,
                    title: data.title,
                }
            }
            // createDocument("AllItems" , "allCourses", targetObject, false).then(
            //     ()=>{ console.log("Successfully Created All Courses")}
            // ).catch(
            //     (e)=> console.error(e)
            // );
        }
    )
}

function createAllStreams() {
    readAllDocuments("AllStreams").then(
        (streamData) => {

            let targetObject = {};
            for (const [href, data] of Object.entries(streamData)) {
                targetObject[data.text] = {
                    icon: data.icon,
                    text: data.text,
                }
            }
            console.log("**CREATING DATA**");
            console.log(JSON.stringify(targetObject));
            // createDocument("AllItems" , "allStreams", targetObject, false).then(
            //     ()=>{ console.log("Successfully Created All Streams")}
            // ).catch(
            //     (e)=> console.error(e)
            // );
        }
    )
}

function coursesByStreams() {
    readAllDocuments("AllStreams").then(
        (streamData) => {


            for (const [href, data] of Object.entries(streamData)) {
                readDocument("CoursesByStream", href).then(
                    (c) => {
                        let targetObject = {};
                        let docId = data.text;
                        c.courses.forEach(element => {
                            targetObject[element.href.replace('/course/', '')] = {
                                thumbnail: element.thumbnail,
                                title: element.title
                            }
                        });
                        console.log("**CREATING DATA**");
                        console.log(docId);
                        console.log(JSON.stringify(targetObject));
                        // createDocument("CoursesByStreams", docId, targetObject, false).then(
                        //     () => { console.log("Successfully Created Courses By Streams") }
                        // ).catch(
                        //     (e) => console.error(e)
                        // );
                    }
                )
            }
        }
    )
}

function updateCourseDetails() {
    readAllDocuments("CourseDetails").then(
        (courseData) => {
            console.log("**CREATING DATA**");

            for (const [href, data] of Object.entries(courseData)) {
                let targetStreams = {};
                data.streams?.forEach(stream => {
                    targetStreams[stream.text] = stream;
                });
                let targetChapters = [];
                let index = 0;
                for (const [chapterName, chapterDetails] of Object.entries(data.chapters)) {
                    let chapter;
                    if (chapterDetails.href) {
                        chapter = {
                            title: chapterName,
                            type: 'Chapter',
                            href: chapterDetails.href,
                            id: index++
                        };
                        if (chapterDetails.thumbnail)
                            chapter.thumbnail = chapterDetails.thumbnail;

                    } else {
                        let subChapters = [];
                        for (const [key, value] of Object.entries(chapterDetails)) {
                            if (key != 'id') {
                                let chap = {
                                    title: key,
                                    href: value.href,
                                    id: index++,
                                }
                                subChapters.push(chap);
                            }
                        }
                        chapter = {
                            title: chapterName,
                            type: 'Section',
                            subChapters: subChapters
                        };
                    }
                    targetChapters.push(chapter);
                }
                let targetObject = {
                    author: {
                        uid: data.author.id,
                        name: data.author.name,
                        photoURL: data.author.userProfileSrc
                    },
                    courseName: data.courseName,
                    description: data.description,
                    level: data.level,
                    visibility: "Public",
                    chapterCount: data.chapterCount,
                    type: data.type,
                    version: 1.0,
                    thumbnail: data.thumbnail,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                    streams: targetStreams,
                    topReviews: {},
                    chapters: targetChapters

                };
                console.log(href);
                console.log(JSON.stringify(targetObject));
                // createDocument('CourseDetail', href, targetObject).then(
                //         () => { console.log("Successfully Created CoursesDetail") }
                //     ).catch(
                //         (e) => console.error(e)
                //     );
            }
        }
    )
}

function updateContentData() {
    readAllDocuments("CourseDetails").then(
        (courseData) => {
            for (const href of Object.keys(courseData)) {
                readAllDocuments("CourseDetails/" + href + "/Content").then((contentData) => {
                    for (const [contentHref, content] of Object.entries(contentData)) {
                        console.log("**CREATING DATA**");
                        let targetData = {
                            heading: content.heading,
                            likes: content.likes,
                            nextChapter: content.nextChapter,
                            previousChapter: content.previousChapter,
                            type: content.type,
                            createdAt: serverTimestamp(),
                            updatedAt: serverTimestamp(),
                        };
                        if (content.type == "text") {
                            targetData.content = content.content
                        } else {
                            targetData.description = content.description;
                            targetData.thumbnail = content.thumbnail;
                            targetData.videoId = content.videoId;
                            targetData.videoSource = "YouTube";
                        }
                        console.log(contentHref);
                        console.log(targetData);
                        // createDocument('CourseDetail/' + href + "/Content", contentHref, targetData).then(
                        //     () => { console.log("Successfully Created CoursesDetail-> content") }
                        // ).catch(
                        //     (e) => console.error(e)
                        // );
                    }
                })
            }
        }
    )
}

function updateCourseHrefDetails() {
    readAllDocuments("CourseDetail").then(
        (courseData) => {
            console.log("**CREATING DATA**");

            for (const [href, data] of Object.entries(courseData)) {

                let targetObject = {
                    "author.name": deleteField()
                };
                console.log(href);
                console.log(JSON.stringify(targetObject));
                // updateDocument('CourseDetail', href, targetObject).then(
                //         () => { console.log("Successfully updated CoursesDetail") }
                //     ).catch(
                //         (e) => console.error(e)
                //     );
            }
        }
    )
}

function createTestUserPublicProfile() {
    readAllDocuments("UsersPublic").then(
        (allUsers) => {
            for (const [uid, data] of Object.entries(allUsers)) {
                let targetObject = { publishedCourses:{}, stats:{}};
                for (const [key, value] of Object.entries(data.tutorDetails['publishedCourses'])) {
                   targetObject.publishedCourses[key]= {
                    title: value.title,
                    thumbnail: value.thumbnail
                   }
                }
                targetObject.stats = data.tutorDetails.stats;
                console.log(targetObject);
                createDocument("TutorDetails", uid, targetObject, false);
            }
        }
    )
}