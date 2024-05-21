export var userPrivateProfile = {
    "zhcyWRZpJKZohfqSt6Xihyo4Awq2": {
        "username": "Nitesh Saxena",
        "userProfileSrc": "/images/profile/photo_1.png",
        "mailId": "ratednitesh@gmail.com",
        "role": "Stack Explorer",
        "activities": {
            "saved-courses": 4,
            "liked-tutorials": 10,
            "completed-courses": 1,
        },
        "enrolledCourses": [
            {
                "thumbnail": "/images/thumbnails/1.jpg",
                "title": "Solving LeetCode Questions",
                "href": "/course/problemSolvingLeetCode",
                "nextChapter": "/content/problemSolvingLeetCode/getStarted", //TODO: Put first chapter by default.
                "chaptersCompleted": [0,1,6,7,8],
                "totalChapters": 16
            },
            {
                "thumbnail": "/images/thumbnails/2.jpg",
                "title": "HTML: Complete Beginner Guide",
                "href": "/course/htmlBeginner",
                "nextChapter": "/content/htmlBeginner/Introduction",
                "chaptersCompleted": [0,1,2],
                "totalChapters": 16

            },
            {
                "thumbnail": "/images/thumbnails/3.jpg",
                "title": "A complete Javascript Guide",
                "href": "/course/jsComplete",
                "nextChapter": "/content/jsComplete/Introduction",
                "chaptersCompleted": [0,1],
                "totalChapters": 16
            },
            {
                thumbnail: "/images/thumbnails/7.jpg",
                title: "Javascript: Advanced Projects",
                href: "/course/js-projects",
                "nextChapter": "/content/js-projects/3",
                "chaptersCompleted": [0,1],
                "totalChapters": 6
            },
        ]
    },
    "hhjGEzFfz4gcFBUt9qROUwxxI852": {
        "username": "Nitesh S.",
        "userProfileSrc": "/images/profile/user.jpg",
        "mailId": "niteshmode@gmail.com",
        "role": "Stack Explorer",
        "activities": {
            "saved-courses": 0,
            "liked-tutorials": 23,
            "completed-courses": 12
        },
        "enrolledCourses": [
            // {
            //     "thumbnail": "/images/thumbnails/4.jpg",
            //     "title": "System Design: Deep Dive",
            //     "href": "/course/systemDesign"

            // },
            // {
            //     "thumbnail": "/images/thumbnails/5.jpg",
            //     "title": "JAVA: A complete Beginner Guide",
            //     "href": "/course/javaBeginner"

            // },
            // {
            //     "thumbnail": "/images/thumbnails/3.jpg",
            //     "title": "A complete Javascript Guide",
            //     "href": "/course/jsComplete"
            // },
            // {
            //     "thumbnail": "/images/thumbnails/2.jpg",
            //     "title": "HTML: Complete Beginner Guide",
            //     "href": "/course/htmlBeginner"

            // },
        ]
    },
    "eDLhJLXv7ChEf6vBCSSbHUphTlV2": {
        "username": "Jane T.",
        "userProfileSrc": "/images/profile/teacher.png",
        "mailId": "teacher@test.com",
        "role": "Stack Builder", //TODO: View teacher profile options/ stats
        "activities": {
            "saved-courses": 4,
            "liked-tutorials": 23,
            "completed-courses": 12
        },
        "enrolledCourses": [
            {
                "thumbnail": "/images/thumbnails/4.jpg",
                "title": "System Design: Deep Dive",
                "href": "/course/systemDesign",
                "nextChapter": "/content/systemDesign/Introduction",
                "chaptersCompleted": [0],
                "totalChapters": 16

            },
            {
                "thumbnail": "/images/thumbnails/5.jpg",
                "title": "JAVA: A complete Beginner Guide",
                "href": "/course/javaBeginner",
                "nextChapter": "/content/javaBeginner/Introduction",
                "chaptersCompleted": [0,1], "totalChapters": 16

            },
            {
                "thumbnail": "/images/thumbnails/3.jpg",
                "title": "A complete Javascript Guide",
                "href": "/course/jsComplete",
                "nextChapter": "/content/jsComplete/Introduction",
                "chaptersCompleted": [0,1,2],
                "totalChapters": 16
            },
            {
                "thumbnail": "/images/thumbnails/2.jpg",
                "title": "HTML: Complete Beginner Guide",
                "href": "/course/htmlBeginner",
                "nextChapter": "/content/htmlBeginner/Introduction",
                "chaptersCompleted": [1,3,4],
                "totalChapters": 16
            },
        ]
    }
};
export var likedTutorials = {
    "zhcyWRZpJKZohfqSt6Xihyo4Awq2": [],
    "hhjGEzFfz4gcFBUt9qROUwxxI852": [],

    // TODO: Complete these.
}
/*
Likes: 
 user : on like add to  liked tutorial
Reviews
*/
export var userPublicProfile = {
    "zhcyWRZpJKZohfqSt6Xihyo4Awq2": {
        "username": "Nitesh Saxena",
        "about-me": "I am a curious little kid.",
        "work": "Scarer @ Monster.Inc",
        "location": "India",
        "tech-stack": "JAVA Developer",
        "facebook": "ratednitesh",
        "instagram": "ratednitesh",
        "linkedin": "ratednitesh",
        "github": "",
        "userProfileSrc": "/images/profile/photo_1.png",
        "role": "Stack Explorer",
        "completedCourses": [] // TODO: for later
    },
    "hhjGEzFfz4gcFBUt9qROUwxxI852": {
        "username": "Nitesh S.",
        "about-me": "I am a boring grown up man.",
        "work": "Vice President @Goldman Sachs",
        "location": "India",
        "tech-stack": "JAVA Developer",
        "facebook": "ratednitesh",
        "instagram": "ratednitesh",
        "linkedin": "ratednitesh",
        "github": "",
        "userProfileSrc": "/images/profile/user.jpg",
        "role": "Stack Explorer"
    },
    "eDLhJLXv7ChEf6vBCSSbHUphTlV2": {
        "username": "Jane T.",
        "about-me": "I am a woww woman.",
        "work": "Professor",
        "location": "India",
        "tech-stack": "Full-Stack Developer",
        "facebook": "janeT18",
        "instagram": "janeT18",
        "linkedin": "janeT18",
        "github": "",
        "userProfileSrc": "/images/profile/teacher.png",
        "role": "Stack Builder",
        "tutorDetails": {
            "stats": {
                "published-courses": 2,
                "tutor-liked-tutorials": 22,
                "tutor-rating": 4.5,
            },
            "publishedCourses": [
                {
                    "thumbnail": "/images/thumbnails/1.jpg",
                    "title": "Solving LeetCode Questions",
                    "href": "/course/problemSolvingLeetCode"

                },
                {
                    "thumbnail": "/images/thumbnails/2.jpg",
                    "title": "HTML: Complete Beginner Guide",
                    "href": "/course/htmlBeginner"

                },
            ]
        }
    },
    "12345": {
        "username": "John Doe",
        "about-me": "I am a woww man.",
        "work": "IT Professional",
        "location": "United States",
        "tech-stack": "Full-Stack Developer",
        "facebook": "johndoe61",
        "instagram": "johndoe61",
        "linkedin": "janejohndoe61T18",
        "github": "",
        "userProfileSrc": "/images/profile/teacher2.png",
        "role": "Stack Builder",
        "tutorDetails": {
            "stats": {
                "published-courses": 10,
                "tutor-liked-tutorials": 220,
                "tutor-rating": 4.9,
            },
            "publishedCourses": [
                {
                    thumbnail: "/images/thumbnails/3.jpg",
                    title: "Javascript: Complete Tutorial",
                    href: "/course/jsComplete"
                },
                {
                    thumbnail: "/images/thumbnails/4.jpg",
                    title: "System Design: Deep Dive",
                    href: "/course/systemDesign"
                },
                {
                    thumbnail: "/images/thumbnails/5.jpg",
                    title: "JAVA Complete Tutorial: Beginner",
                    href: "/course/javaBeginner"
                },
                {
                    thumbnail: "/images/thumbnails/6.jpg",
                    title: "Data Structure & Algorithm: Beginner",
                    href: "/course/dsa-beginner"
                },
                {
                    thumbnail: "/images/thumbnails/7.jpg",
                    title: "Javascript: Advanced Projects",
                    href: "/course/js-projects"
                },
                {
                    thumbnail: "/images/thumbnails/8.jpg",
                    title: "Data Structure & Algorithm: Medium",
                    href: "/course/dsa-medium"
                },
                {
                    thumbnail: "/images/thumbnails/9.jpg",
                    title: "JAVA Complete Tutorial: Medium",
                    href: "/course/javaMedium"
                },
                {
                    thumbnail: "/images/thumbnails/10.jpg",
                    title: "Data Structure & Algorithm: Expert",
                    href: "/course/dsa-expert"
                },
                {
                    thumbnail: "/images/thumbnails/3.jpg",
                    title: "JAVA Complete Tutorial: Expert",
                    href: "/course/javaExpert"
                },
                {
                    thumbnail: "/images/thumbnails/5.jpg",
                    title: "JAVA: Advanced Projects",
                    href: "/course/javaProjects"
                }
            ]
        }
    },
    "xtz": {
        "username": "Kitty Holmes",
        "about-me": "I am a cutie girl.",
        "work": "Student @ DU",
        "location": "United States",
        "tech-stack": "Full-Stack Developer",
        "facebook": "cuteKitty12",
        "instagram": "cuteKitty12",
        "linkedin": "cuteKitty12",
        "github": "cuteKitty12",
        "userProfileSrc": "/images/profile/testUser.png",
        "role": "Stack Explorer",

    }

};
export var topStreams = [
    { icon: 'es-code', text: 'JAVA' },
    { icon: 'es-chart-bar', text: 'SystemDesign' },
    { icon: 'es-pencil', text: 'FullStack' },
    { icon: 'es-chart-line', text: 'Front-End' },
    { icon: 'es-music', text: 'Back-End' },
    { icon: 'es-camera', text: 'Javascript' },
    { icon: 'es-cog', text: 'DSA' },
    { icon: 'es-cloud', text: 'Leetcode' },
    { icon: 'es-cogs', text: 'Problem-Solving' },
    { icon: 'es-rupee', text: 'Projects' }
];

export var allStreams = [
    { icon: 'es-code', text: 'JAVA' },
    { icon: 'es-chart-bar', text: 'SystemDesign' },
    { icon: 'es-pencil', text: 'FullStack' },
    { icon: 'es-chart-line', text: 'Front-End' },
    { icon: 'es-music', text: 'Back-End' },
    { icon: 'es-camera', text: 'Javascript' },
    { icon: 'es-cog', text: 'DSA' },
    { icon: 'es-cloud', text: 'Leetcode' },
    { icon: 'es-cogs', text: 'Problem-Solving' },
    { icon: 'es-rupee', text: 'Projects' },
    { icon: 'es-code', text: 'Python' },
    { icon: 'es-chart-bar', text: 'Backend' },
    { icon: 'es-pencil', text: 'Dev-Ops' },
    { icon: 'es-chart-line', text: 'End-to-End' },
    { icon: 'es-music', text: 'Research' },
    { icon: 'es-camera', text: 'Artificial-Intelligence' },
    { icon: 'es-cog', text: 'LLM' },
    { icon: 'es-cloud', text: 'Codechef' },
    { icon: 'es-cogs', text: 'Graphs' },
    { icon: 'es-rupee', text: 'Google-Cloud' }
];

export var coursesByStreams = {
    'JAVA': [{
        thumbnail: "/images/thumbnails/1.jpg",
        title: "Problem Solving: LeetCode Series",
        href: "/course/problemSolvingLeetCode"
    },
    {
        thumbnail: "/images/thumbnails/2.jpg",
        title: "HTML Complete Tutorial: Beginner",
        href: "/course/htmlBeginner"
    },
    {
        thumbnail: "/images/thumbnails/3.jpg",
        title: "Javascript: Complete Tutorial",
        href: "/course/jsComplete"
    },
    {
        thumbnail: "/images/thumbnails/5.jpg",
        title: "JAVA Complete Tutorial: Beginner",
        href: "/course/javaBeginner"
    }],
    'SystemDesign': [,
        {
            thumbnail: "/images/thumbnails/4.jpg",
            title: "System Design: Deep Dive",
            href: "/course/systemDesign"
        },
        {
            thumbnail: "/images/thumbnails/5.jpg",
            title: "JAVA Complete Tutorial: Beginner",
            href: "/course/javaBeginner"
        },
        {
            thumbnail: "/images/thumbnails/6.jpg",
            title: "Data Structure & Algorithm: Beginner",
            href: "/course/dsa-beginner"
        }],
    'FullStack': [,
        {
            thumbnail: "/images/thumbnails/7.jpg",
            title: "Javascript: Advanced Projects",
            href: "/course/js-projects"
        },
        {
            thumbnail: "/images/thumbnails/8.jpg",
            title: "Data Structure & Algorithm: Medium",
            href: "/course/dsa-medium"
        },
        {
            thumbnail: "/images/thumbnails/9.jpg",
            title: "JAVA Complete Tutorial: Medium",
            href: "/course/javaMedium"
        },
    ],
    'Front-End': [{
        thumbnail: "/images/thumbnails/10.jpg",
        title: "Data Structure & Algorithm: Expert",
        href: "/course/dsa-expert"
    },
    {
        thumbnail: "/images/thumbnails/3.jpg",
        title: "JAVA Complete Tutorial: Expert",
        href: "/course/javaExpert"
    },
    {
        thumbnail: "/images/thumbnails/5.jpg",
        title: "JAVA: Advanced Projects",
        href: "/course/javaProjects"
    }],
    'Back-End': [{
        thumbnail: "/images/thumbnails/10.jpg",
        title: "Data Structure & Algorithm: Expert",
        href: "/course/dsa-expert"
    },
    {
        thumbnail: "/images/thumbnails/3.jpg",
        title: "JAVA Complete Tutorial: Expert",
        href: "/course/javaExpert"
    },],
    'Javascript': [{
        thumbnail: "/images/thumbnails/8.jpg",
        title: "Data Structure & Algorithm: Medium",
        href: "/course/dsa-medium"
    },],
    'DSA': [{
        thumbnail: "/images/thumbnails/7.jpg",
        title: "Javascript: Advanced Projects",
        href: "/course/js-projects"
    },
    {
        thumbnail: "/images/thumbnails/8.jpg",
        title: "Data Structure & Algorithm: Medium",
        href: "/course/dsa-medium"
    },],
    'Leetcode': [{
        thumbnail: "/images/thumbnails/7.jpg",
        title: "Javascript: Advanced Projects",
        href: "/course/js-projects"
    },
    {
        thumbnail: "/images/thumbnails/8.jpg",
        title: "Data Structure & Algorithm: Medium",
        href: "/course/dsa-medium"
    },],
    'Problem-Solving': [{
        thumbnail: "/images/thumbnails/7.jpg",
        title: "Javascript: Advanced Projects",
        href: "/course/js-projects"
    },
    {
        thumbnail: "/images/thumbnails/8.jpg",
        title: "Data Structure & Algorithm: Medium",
        href: "/course/dsa-medium"
    },],
    'Projects': [{
        thumbnail: "/images/thumbnails/7.jpg",
        title: "Javascript: Advanced Projects",
        href: "/course/js-projects"
    },
    {
        thumbnail: "/images/thumbnails/8.jpg",
        title: "Data Structure & Algorithm: Medium",
        href: "/course/dsa-medium"
    },],
    'Python': [{
        thumbnail: "/images/thumbnails/7.jpg",
        title: "Javascript: Advanced Projects",
        href: "/course/js-projects"
    },
    {
        thumbnail: "/images/thumbnails/8.jpg",
        title: "Data Structure & Algorithm: Medium",
        href: "/course/dsa-medium"
    },],
    'Backend': [],
    'Dev-Ops': [],
    'End-to-End': [{
        thumbnail: "/images/thumbnails/7.jpg",
        title: "Javascript: Advanced Projects",
        href: "/course/js-projects"
    },
    {
        thumbnail: "/images/thumbnails/8.jpg",
        title: "Data Structure & Algorithm: Medium",
        href: "/course/dsa-medium"
    },],
    'Research': [],
    'Artificial-Intelligence': [],
    'LLM': [{
        thumbnail: "/images/thumbnails/7.jpg",
        title: "Javascript: Advanced Projects",
        href: "/course/js-projects"
    },
    {
        thumbnail: "/images/thumbnails/8.jpg",
        title: "Data Structure & Algorithm: Medium",
        href: "/course/dsa-medium"
    },],
    'Codechef': [{
        thumbnail: "/images/thumbnails/7.jpg",
        title: "Javascript: Advanced Projects",
        href: "/course/js-projects"
    },
    {
        thumbnail: "/images/thumbnails/8.jpg",
        title: "Data Structure & Algorithm: Medium",
        href: "/course/dsa-medium"
    },],
    'Graphs': [{
        thumbnail: "/images/thumbnails/7.jpg",
        title: "Javascript: Advanced Projects",
        href: "/course/js-projects"
    },
    {
        thumbnail: "/images/thumbnails/8.jpg",
        title: "Data Structure & Algorithm: Medium",
        href: "/course/dsa-medium"
    },],
    'Google-Cloud': [{
        thumbnail: "/images/thumbnails/7.jpg",
        title: "Javascript: Advanced Projects",
        href: "/course/js-projects"
    },
    {
        thumbnail: "/images/thumbnails/8.jpg",
        title: "Data Structure & Algorithm: Medium",
        href: "/course/dsa-medium"
    },],
}
export var topCourses = [
    {
        thumbnail: "/images/thumbnails/1.jpg",
        title: "Problem Solving: LeetCode Series",
        href: "/course/problemSolvingLeetCode"
    },
    {
        thumbnail: "/images/thumbnails/2.jpg",
        title: "HTML Complete Tutorial: Beginner",
        href: "/course/htmlBeginner"
    },
    {
        thumbnail: "/images/thumbnails/3.jpg",
        title: "Javascript: Complete Tutorial",
        href: "/course/jsComplete"
    },
    {
        thumbnail: "/images/thumbnails/4.jpg",
        title: "System Design: Deep Dive",
        href: "/course/systemDesign"
    },
    {
        thumbnail: "/images/thumbnails/5.jpg",
        title: "JAVA Complete Tutorial: Beginner",
        href: "/course/javaBeginner"
    },
    {
        thumbnail: "/images/thumbnails/6.jpg",
        title: "Data Structure & Algorithm: Beginner",
        href: "/course/dsa-beginner"
    },
    {
        thumbnail: "/images/thumbnails/7.jpg",
        title: "Javascript: Advanced Projects",
        href: "/course/js-projects"
    },
    {
        thumbnail: "/images/thumbnails/8.jpg",
        title: "Data Structure & Algorithm: Medium",
        href: "/course/dsa-medium"
    },
    {
        thumbnail: "/images/thumbnails/9.jpg",
        title: "JAVA Complete Tutorial: Medium",
        href: "/course/javaMedium"
    },
    {
        thumbnail: "/images/thumbnails/10.jpg",
        title: "Data Structure & Algorithm: Expert",
        href: "/course/dsa-expert"
    },
    {
        thumbnail: "/images/thumbnails/3.jpg",
        title: "JAVA Complete Tutorial: Expert",
        href: "/course/javaExpert"
    },
    {
        thumbnail: "/images/thumbnails/5.jpg",
        title: "JAVA: Advanced Projects",
        href: "/course/javaProjects"
    }
];
export var courseDetails = {
    "problemSolvingLeetCode": {
        "type": "text",
        "courseName": "Problem Solving: LeetCode Series",
        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae perspiciatis fugit et eaq",
        "level": 2,
        "href": "/content/problemSolvingLeetCode/Introduction",
        "chapterCount": 9,
        "streams": [
            { icon: 'es-code', text: 'JAVA' },
            { icon: 'es-cog', text: 'DSA' },
            { icon: 'es-cloud', text: 'Leetcode' },
            { icon: 'es-cogs', text: 'Problem-Solving' },
        ],
        "thumbnail": "/images/thumbnails/1.jpg",
        "author": {
            "id": "eDLhJLXv7ChEf6vBCSSbHUphTlV2",
            "name": "Jane T.",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher.png",
        },
        "publishDate": "22-12-2023"
    },
    "htmlBeginner": {
        "type": "text",
        "courseName": "HTML Complete Tutorial: Beginner",
        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae perspiciatis fugit et eaq",
        "level": 1,
        "href": "/content/htmlBeginner/Introduction",
        "chapterCount": 6,
        "streams": [],
        "thumbnail": "/images/thumbnails/2.jpg",
        "author": {
            "id": "eDLhJLXv7ChEf6vBCSSbHUphTlV2",
            "name": "Jane T.",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher.png",
        },
        "publishDate": "22-12-2023"
    },
    "jsComplete": {
        "type": "text",
        "courseName": "Javascript: Complete Tutorial",
        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae perspiciatis fugit et eaq",
        "level": 1,
        "href": "/content/jsComplete/Introduction",
        "chapterCount": 14,
        "streams": [],
        "thumbnail": "/images/thumbnails/3.jpg",
        "author": {
            "id": "12345",
            "name": "John Doe",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher2.png",
        },
        "publishDate": "22-12-2023"
    },
    "systemDesign": {
        "type": "text",
        "courseName": "System Design: Deep Dive",
        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae perspiciatis fugit et eaq",
        "level": 1,
        "href": "/content/systemDesign/Introduction",
        "chapterCount": 14,
        "streams": [
            { icon: 'es-code', text: 'JAVA' },
            { icon: 'es-cog', text: 'DSA' },
            { icon: 'es-cloud', text: 'Leetcode' },
            { icon: 'es-cogs', text: 'Problem-Solving' },
        ],
        "thumbnail": "/images/thumbnails/4.jpg",
        "author": {
            "id": "12345",
            "name": "John Doe",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher2.png",
        },
        "publishDate": "22-12-2023"
    },
    "javaBeginner": {
        "type": "text",
        "courseName": "JAVA Complete Tutorial: Beginner",
        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae perspiciatis fugit et eaq",
        "level": 1,
        "href": "/content/javaBeginner/default",
        "chapterCount": 14,
        "streams": [],
        "thumbnail": "/images/thumbnails/5.jpg",
        "author": {
            "id": "12345",
            "name": "John Doe",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher2.png",
        },
        "publishDate": "22-12-2023"
    },
    "dsa-beginner": {
        "type": "text",
        "courseName": "Data Structure & Algorithm: Beginner",
        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae perspiciatis fugit et eaq",
        "level": 1,
        "href": "/content/dsa-beginner/default",
        "chapterCount": 14,
        "streams": [],
        "thumbnail": "/images/thumbnails/6.jpg",
        "author": {
            "id": "12345",
            "name": "John Doe",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher2.png",
        },
        "publishDate": "22-12-2023"
    },
    "js-projects": {
        "type": "video",
        "courseName": "Complete Something Else tutorial",
        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae perspiciatis fugit et eaq",
        "level": 3,
        "href": "/content/js-projects/1",
        "chapterCount": 6,
        "streams": [
            { icon: 'es-code', text: 'JAVA' },
            { icon: 'es-cog', text: 'DSA' },
            { icon: 'es-cloud', text: 'Leetcode' },
            { icon: 'es-cogs', text: 'Problem-Solving' },
        ],
        "thumbnail": "/images/thumbnails/7.jpg",
        "author": {
            "id": "12345",
            "name": "John Doe",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher2.png",
        },
        "publishDate": "22-12-2023"
    },
    "dsa-medium": {
        "type": "text",
        "courseName": "Data Structure & Algorithm: Medium",
        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae perspiciatis fugit et eaq",
        "level": 1,
        "href": "/content/dsa-medium/default",
        "chapterCount": 14,
        "streams": [],
        "thumbnail": "/images/thumbnails/8.jpg",
        "author": {
            "id": "12345",
            "name": "John Doe",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher2.png",
        },
        "publishDate": "22-12-2023"
    },
    "javaMedium": {
        "type": "text",
        "courseName": "JAVA Complete Tutorial: Medium",
        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae perspiciatis fugit et eaq",
        "level": 1,
        "href": "/content/javaMedium/Introduction",
        "chapterCount": 14,
        "streams": [],
        "thumbnail": "/images/thumbnails/9.jpg",
        "author": {
            "id": "12345",
            "name": "John Doe",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher2.png",
        },
        "publishDate": "22-12-2023"
    },
    "dsa-expert": {
        "type": "text",
        "courseName": "Data Structure & Algorithm: Expert",
        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae perspiciatis fugit et eaq",
        "level": 1,
        "href": "/content/dsa-expert/default",
        "chapterCount": 14,
        "streams": [],
        "thumbnail": "/images/thumbnails/10.jpg",
        "author": {
            "id": "12345",
            "name": "John Doe",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher2.png",
        },
        "publishDate": "22-12-2023"
    },
    "javaExpert": {
        "type": "text",
        "courseName": "JAVA Complete Tutorial: Expert",
        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae perspiciatis fugit et eaq",
        "level": 1,
        "href": "/content/javaExpert/Introduction",
        "chapterCount": 14,
        "streams": [],
        "thumbnail": "/images/thumbnails/3.jpg",
        "author": {
            "id": "12345",
            "name": "John Doe",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher2.png",
        },
        "publishDate": "22-12-2023"
    },
    "javaProjects": {
        "type": "video",
        "courseName": "JAVA: Advanced Projects",
        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae perspiciatis fugit et eaq",
        "level": 1,
        "href": "/content/javaProjects/1",
        "chapterCount": 14,
        "streams": [],
        "thumbnail": "/images/thumbnails/5.jpg",
        "author": {
            "id": "12345",
            "name": "John Doe",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher2.png",
        },
        "publishDate": "22-12-2023"
    },
}
export var courseContentDetails = {
    "problemSolvingLeetCode": {
        "Introduction to LeetCode":
        {
            "Introduction to LeetCod": {
                id: 0,
                href: "/content/problemSolvingLeetCode/Introduction", 
            } ,
            "Problem Solving Basics": {
                id: 1,
                href: "/content/problemSolvingLeetCode/Basics",},
            "Where to get Started": {
                id: 2,
                href: "/content/problemSolvingLeetCode/getStarted"},
        },
        "Arrays and Sets":
        {
            "Two Sum":  {
                id: 3,
                href:"/content/problemSolvingLeetCode/twoSum" },
            "Group Anagram":  {
                id: 4,
                href:"/content/problemSolvingLeetCode/group-anagram",},
            "Valid Anagram":  {
                id: 5,
                href:"/content/problemSolvingLeetCode/valid-anagram"},
        },
        "HashMaps": {
            "Phone Directory": {
                id: 6,
                href: "/content/problemSolvingLeetCode/phoneDirectory", },
            "Grade System":  {
                id: 7,
                href:"/content/problemSolvingLeetCode/gradeSystem" },
        },
        "Moving Forward": {
            id: 8,
            href: "/content/problemSolvingLeetCode/nextSteps",}

    },
    "js-projects": {
        "Javascript: Advanced Projects (part 01)": {
            id: 0,
            "videoId": "course2v1", //TODO: do we even need these?
            "thumbnail": "/images/thumbnails/7.jpg",
            "href": "/content/js-projects/1"
        },
        "Javascript: Advanced Projects (part 02)": {
            id: 1,
            "videoId": "course2v2",
            "thumbnail": "/images/thumbnails/7.jpg",
            "href": "/content/js-projects/2"
        },
        "Javascript: Advanced Projects (part 03)": {
            id: 2,
            "videoId": "course2v3",
            "thumbnail": "/images/thumbnails/7.jpg",
            "href": "/content/js-projects/3"
        },
        "Javascript: Advanced Projects (part 04)": {
            id: 3,
            "videoId": "course2v4",
            "thumbnail": "/images/thumbnails/7.jpg",
            "href": "/content/js-projects/4"

        },
        "Javascript: Advanced Projects (part 05)": {
            id: 4,
            "videoId": "course2v5",
            "thumbnail": "/images/thumbnails/7.jpg",
            "href": "/content/js-projects/5"
        },
        "Javascript: Advanced Projects (part 06)": {
            id: 5,
            "videoId": "course2v6",
            "thumbnail": "/images/thumbnails/7.jpg",
            "href": "/content/js-projects/6"

        }
    },
    "javaProjects": {
        "JAVA: Advanced Projects (part 01)": {
            id: 0,
            "videoId": "course2v1",
            "thumbnail": "/images/thumbnails/5.jpg",
            "href": "/content/javaProjects/1"
        },
        "JAVA: Advanced Projects (part 02)": {
            id: 1,
            "videoId": "course2v2",
            "thumbnail": "/images/thumbnails/5.jpg",
            "href": "/content/javaProjects/1"
        },
        "JAVA: Advanced Projects (part 03)": {
            id: 2,
            "videoId": "course2v3",
            "thumbnail": "/images/thumbnails/5.jpg",
            "href": "/content/javaProjects/1"
        },
        "JAVA: Advanced Projects (part 04)": {
            id: 3,
            "videoId": "course2v4",
            "thumbnail": "/images/thumbnails/5.jpg",
            "href": "/content/javaProjects/1"
        }
    },
    "htmlBeginner": {
        "Introduction to LeetCode":
        {
            "Introduction to LeetCod":  {
                id: 0,
                href:"/content/htmlBeginner/Introduction",},
            "Problem Solving Basics":  {
                id: 1,
                href:"/content/htmlBeginner/Basics",},
            "Where to get Started":  {
                id: 2,
                href:"/content/htmlBeginner/Advanced"},
        },

        "HashMaps": {
            "Phone Directory":  {
                id: 3,
                href:"/content/htmlBeginner/firstProject",},
            "Grade System":  {
                id: 4,
                href:"/content/htmlBeginner/multimedia"},
        },
        "Moving Forward":  {
            id: 5,
            href:"/content/htmlBeginner/nextSteps",}

    },
    "jsComplete": {
        "Introduction to JavaScript":
        {
            "Introduction to LeetCod":  {
                id: 0,
                href:"/content/jsComplete/Introduction", },
            "Problem Solving Basics":  {
                id: 1,
                href:"/content/jsComplete/Basics",},
            "Javascript: Advanced":  {
                id: 2,
                href:"/content/jsComplete/Advanced"},
        },

        "Moving Forward":  {
            id: 3,
            href:"/content/jsComplete/nextSteps",},

    },
    "systemDesign": {
        "Introduction to LeetCode": {
            "Introduction to LeetCod":  {
                id: 0,
                href:"/content/systemDesign/Introduction", },
            "Problem Solving Basics":  {
                id: 1,
                href:"/content/systemDesign/Basics",},
            "Javascript: Advanced":  {
                id: 2,
                href:"/content/systemDesign/Advanced"},
        }
    },
    "javaBeginner": {
        "Introduction to LeetCode":{
            "Introduction to LeetCod":  {
                id: 0,
                href:"/content/javaBeginner/default", },
            "Problem Solving Basics":  {
                id: 1,
                href:"/content/javaBeginner/default",},
            "Javascript: Advanced":  {
                id: 2,
                href:"/content/javaBeginner/default"},
        },

        "Moving Forward":   {
            id: 3,
            href:"/content/javaBeginner/default"},

    },
    "javaMedium": {
        "Introduction to LeetCode":{
            "Introduction to LeetCod":  {
                id: 0,
                href:"/content/javaMedium/default", },
            "Problem Solving Basics":  {
                id: 1,
                href:"/content/javaMedium/default",},
            "Javascript: Advanced":  {
                id: 2,
                href:"/content/javaMedium/default"},
        },
    },
    "javaExpert": {
        "Introduction to LeetCode":
        {
            "Introduction to LeetCod": {
                id: 0,
                href:"/content/javaExpert/default",},
            "Problem Solving Basics": {
                id: 1,
                href:"/content/javaExpert/default",},
        },
        "Arrays and Sets":
        {
            "Two Sum": {
                id: 2,
                href:"/content/javaExpert/default",},
        },

        "Moving Forward": {
            id: 3,
            href:"/content/javaExpert/default",}
    },
    "dsa-beginner": {
        "Introduction to LeetCode":{
            "Introduction to LeetCod":  {
                id: 0,
                href:"/content/dsa-beginner/default", },
            "Problem Solving Basics":  {
                id: 1,
                href:"/content/dsa-beginner/default",},
            "Javascript: Advanced":  {
                id: 2,
                href:"/content/dsa-beginner/default"},
        },
    


    },
    "dsa-medium": {
        "Introduction to LeetCode":{
            "Introduction to LeetCod":  {
                id: 0,
                href:"/content/dsa-medium/default", },
            "Problem Solving Basics":  {
                id: 1,
                href:"/content/dsa-medium/default",},
            "Javascript: Advanced":  {
                id: 2,
                href:"/content/dsa-medium/default"},
        },

    },
    "dsa-expert": {
        "Introduction to LeetCode":{
            "Introduction to LeetCod":  {
                id: 0,
                href:"/content/dsa-expert/default", },
            "Problem Solving Basics":  {
                id: 1,
                href:"/content/dsa-expert/default",},
            "Javascript: Advanced":  {
                id: 2,
                href:"/content/dsa-expert/default"},
        },

    },
};
export var courseReviews = {
    "problemSolvingLeetCode": [
        {
            "review": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque autem id eligendi minima quo pariatur            quidem! Recusandae nisi vero non dolorum facere quibusdam minus sequi, eos pariatur atque voluptatibus",
            "user": {
                "uid": "12345",
                "name": "John Doe",
                "role": "Stack Builder",
                "userProfileSrc": "/images/profile/teacher2.png",
            },
            "rating": 4.5
        },
        {
            "review": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque autem id eligendi minima quo pariatur            quidem! Recusandae nisi vero non dolorum facere quibusdam minus sequi, eos pariatur atque voluptatibus",
            "user": {
                "uid": "xtz",
                "name": "Kitty Holmes",
                "role": "Stack Explorer",
                "userProfileSrc": "/images/profile/testUser.png",
            },
            "rating": 2.5
        }
    ],
    "js-projects": [
        {
            "review": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque autem id eligendi minima quo pariatur            quidem! Recusandae nisi vero non dolorum facere quibusdam minus sequi, eos pariatur atque voluptatibus",
            "user": {
                "uid": "12345",
                "name": "John Doe",
                "role": "Stack Builder",
                "userProfileSrc": "/images/profile/teacher2.png",
            },
            "rating": 4.5
        },
        {
            "review": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque autem id eligendi minima quo pariatur            quidem! Recusandae nisi vero non dolorum facere quibusdam minus sequi, eos pariatur atque voluptatibus",
            "user": {
                "uid": "zhcyWRZpJKZohfqSt6Xihyo4Awq2",
                "name": "Nitesh Saxena",
                "role": "Stack Explorer",
                "userProfileSrc": "/images/profile/photo_1.png",
            },
            "rating": 5
        },
        {
            "review": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque autem id eligendi minima quo pariatur            quidem! Recusandae nisi vero non dolorum facere quibusdam minus sequi, eos pariatur atque voluptatibus",
            "user": {
                "uid": "hhjGEzFfz4gcFBUt9qROUwxxI852",
                "name": "Nitesh S.",
                "role": "Stack Explorer",
                "userProfileSrc": "/images/profile/user.jpg",
            },
            "rating": 4
        }
    ]
}
export var courseContent = {
    // Problem Solving Course
    "problemSolvingLeetCode/Introduction": {
        "courseName": "Problem Solving: LeetCode Series",
        "courseId": "problemSolvingLeetCode",
        "type": "text",
        "heading": "Introduction: LeetCode Problem Solving",
        "publishDate": "21-01-2024",
        "likes": 45,
        "content": ` <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit explicabo ad voluptatem sit sapiente
        exercitationem officiis dolores adipisci dolorem saepe harum deserunt sequi quaerat ex laboriosam
        eligendi fuga alias, natus itaque! Modi distinctio doloribus sunt, esse eos mollitia itaque adipisci
        doloremque praesentium sed ab saepe animi earum in at! Deserunt!</p>
    <h4>Moreo on this</h4>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi ipsam corporis eum architecto soluta
        veniam hic officiis quibusdam id nemo.</p>
    <h5>something else</h5>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. <a href="#">Link to somewhere </a>Illum rerum
        voluptatibus in omnis nobis consequatur ad possimus impedit magni corporis!</p>
    <ul>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, atque.</li>
        <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed maxime itaque qui explicabo ipsum
            suscipit vitae neque, nam eos id!</li>
        <li>Lorem ipsum dolor sit amet.</li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui iusto aliquid et eligendi nesciunt
            totam.</li>
        <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod et rerum cupiditate fugiat optio
            voluptatum perspiciatis officiis hic modi?</li>
        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic!</li>
    </ul>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit explicabo ad voluptatem sit sapiente
        exercitationem officiis dolores adipisci dolorem saepe harum deserunt sequi quaerat ex laboriosam
        eligendi fuga alias, natus itaque! Modi distinctio doloribus sunt, esse eos mollitia itaque adipisci
        doloremque praesentium sed ab saepe animi earum in at! Deserunt!</p>
    <h4>Moreo on this</h4>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi ipsam corporis eum architecto soluta
        veniam hic officiis quibusdam id nemo.</p>
    <h5>something else</h5>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. <a href="#">Link to somewhere </a>Illum rerum
        voluptatibus in omnis nobis consequatur ad possimus impedit magni corporis!</p>
    <ul>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, atque.</li>
        <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed maxime itaque qui explicabo ipsum
            suscipit vitae neque, nam eos id!</li>
        <li>Lorem ipsum dolor sit amet.</li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui iusto aliquid et eligendi nesciunt
            totam.</li>
        <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod et rerum cupiditate fugiat optio
            voluptatum perspiciatis officiis hic modi?</li>
        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic!</li>
    </ul>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit explicabo ad voluptatem sit sapiente
        exercitationem officiis dolores adipisci dolorem saepe harum deserunt sequi quaerat ex laboriosam
        eligendi fuga alias, natus itaque! Modi distinctio doloribus sunt, esse eos mollitia itaque adipisci
        doloremque praesentium sed ab saepe animi earum in at! Deserunt!</p>
    <h4>Moreo on this</h4>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi ipsam corporis eum architecto soluta
        veniam hic officiis quibusdam id nemo.</p>
    <h5>something else</h5>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. <a href="#">Link to somewhere </a>Illum rerum
        voluptatibus in omnis nobis consequatur ad possimus impedit magni corporis!</p>
    <ul>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, atque.</li>
        <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed maxime itaque qui explicabo ipsum
            suscipit vitae neque, nam eos id!</li>
        <li>Lorem ipsum dolor sit amet.</li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui iusto aliquid et eligendi nesciunt
            totam.</li>
        <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod et rerum cupiditate fugiat optio
            voluptatum perspiciatis officiis hic modi?</li>
        <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic!</li>
    </ul>
    `,
        "author": {
            "id": "eDLhJLXv7ChEf6vBCSSbHUphTlV2",
            "name": "Jane T.",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher.png",
        },
        "previousChapter": "",
        "nextChapter": "",
        "similarCourse": "",
        "comments": 6
    },
    "problemSolvingLeetCode/Basics": {
        "courseName": "Problem Solving: LeetCode Series",
        "courseId": "problemSolvingLeetCode",
        "type": "text",
        "heading": "Basics: LeetCode Problem Solving",
        "publishDate": "21-01-2024",
        "likes": 45,
        "content": `<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit explicabo ad voluptatem sit sapiente
        exercitationem officiis dolores adipisci dolorem saepe harum deserunt sequi quaerat ex laboriosam
        eligendi fuga alias, natus itaque! Modi distinctio doloribus sunt, esse eos mollitia itaque adipisci
        doloremque praesentium sed ab saepe animi earum in at! Deserunt!</p>
    `,
        "author": {
            "id": "eDLhJLXv7ChEf6vBCSSbHUphTlV2",
            "name": "Jane T.",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher.png",
        },
        "previousChapter": "",
        "nextChapter": "",
        "similarCourse": "",
        "comments": 6

    },
    "problemSolvingLeetCode/getStarted": {
        "courseName": "Problem Solving: LeetCode Series",
        "courseId": "problemSolvingLeetCode",
        "type": "text",
        "heading": "Getting Started: LeetCode Problem Solving",
        "publishDate": "21-01-2024",
        "likes": 45,
        "content": ` <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit explicabo ad voluptatem sit sapiente
        exercitationem officiis dolores adipisci dolorem saepe harum deserunt sequi quaerat ex laboriosam
        eligendi fuga alias, natus itaque! Modi distinctio doloribus sunt, esse eos mollitia itaque adipisci
        doloremque praesentium sed ab saepe animi earum in at! Deserunt!</p>
    <h4>Moreo on this</h4>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi ipsam corporis eum architecto soluta
        veniam hic officiis quibusdam id nemo.</p>
    <h5>something else</h5>    `,
        "author": {
            "id": "eDLhJLXv7ChEf6vBCSSbHUphTlV2",
            "name": "Jane T.",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher.png",
        },
        "previousChapter": "",
        "nextChapter": "",
        "similarCourse": "",
        "comments": 6

    },
    "problemSolvingLeetCode/twoSum": {
        "courseName": "Problem Solving: LeetCode Series",
        "courseId": "problemSolvingLeetCode",
        "type": "text",
        "heading": "Two Sum: LeetCode Problem Solving",
        "publishDate": "21-01-2024",
        "likes": 45,
        "content": ` <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit explicabo ad voluptatem sit sapiente
        exercitationem officiis dolores adipisci dolorem saepe harum deserunt sequi quaerat ex laboriosam
        eligendi fuga alias, natus itaque! Modi distinctio doloribus sunt, esse eos mollitia itaque adipisci
        doloremque praesentium sed ab saepe animi earum in at! Deserunt!</p>
    <h4>Moreo on this</h4>
    `,
        "author": {
            "id": "eDLhJLXv7ChEf6vBCSSbHUphTlV2",
            "name": "Jane T.",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher.png",
        },
        "previousChapter": "",
        "nextChapter": "",
        "similarCourse": "",
        "comments": 6
    },
    "problemSolvingLeetCode/group-anagram": {
        "courseName": "Problem Solving: LeetCode Series",
        "courseId": "problemSolvingLeetCode",
        "type": "text",
        "heading": "LeetCode: Group Anagram",
        "publishDate": "21-01-2024",
        "likes": 32,
        "content": `<p>This is the introduction to HTML course.</p>`,
        "author": {
            "id": "eDLhJLXv7ChEf6vBCSSbHUphTlV2",
            "name": "Jane T.",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher.png",
        },
        "previousChapter": "",
        "nextChapter": "htmlBeginner/Basics",
        "similarCourse": "",
        "comments": 3
    },
    "problemSolvingLeetCode/valid-anagram": {
        "courseName": "Problem Solving: LeetCode Series",
        "courseId": "problemSolvingLeetCode",
        "type": "text",
        "heading": "LeetCode: valid Anagram",
        "publishDate": "21-01-2024",
        "likes": 32,
        "content": `<p>This is the introduction to HTML course.</p>`,
        "author": {
            "id": "eDLhJLXv7ChEf6vBCSSbHUphTlV2",
            "name": "Jane T.",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher.png",
        },
        "previousChapter": "",
        "nextChapter": "htmlBeginner/Basics",
        "similarCourse": "",
        "comments": 3
    },
    "problemSolvingLeetCode/phoneDirectory": {
        "courseName": "Problem Solving: LeetCode Series",
        "courseId": "problemSolvingLeetCode",
        "type": "text",
        "heading": "LeetCode: phone Directory",
        "publishDate": "21-01-2024",
        "likes": 32,
        "content": `<p>This is the introduction to HTML course.</p>`,
        "author": {
            "id": "eDLhJLXv7ChEf6vBCSSbHUphTlV2",
            "name": "Jane T.",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher.png",
        },
        "previousChapter": "",
        "nextChapter": "htmlBeginner/Basics",
        "similarCourse": "",
        "comments": 3
    },
    "problemSolvingLeetCode/gradeSystem": {
        "courseName": "Problem Solving: LeetCode Series",
        "courseId": "problemSolvingLeetCode",
        "type": "text",
        "heading": "LeetCode: Grade System",
        "publishDate": "21-01-2024",
        "likes": 32,
        "content": `<p>This is the introduction to Grade System.</p>`,
        "author": {
            "id": "eDLhJLXv7ChEf6vBCSSbHUphTlV2",
            "name": "Jane T.",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher.png",
        },
        "previousChapter": "",
        "nextChapter": "htmlBeginner/Basics",
        "similarCourse": "",
        "comments": 3
    },
    "problemSolvingLeetCode/nextSteps": {
        "courseName": "Problem Solving: LeetCode Series",
        "courseId": "problemSolvingLeetCode",
        "type": "text",
        "heading": "LeetCode: Next Steps",
        "publishDate": "21-01-2024",
        "likes": 32,
        "content": `<p>This is the introduction to HTML course.</p>`,
        "author": {
            "id": "eDLhJLXv7ChEf6vBCSSbHUphTlV2",
            "name": "Jane T.",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher.png",
        },
        "previousChapter": "",
        "nextChapter": "htmlBeginner/Basics",
        "similarCourse": "",
        "comments": 3
    },

    // For HTML - Beginner course
    "htmlBeginner/Introduction": {
        "courseName": "HTML Complete Tutorial: Beginner",
        "courseId": "htmlBeginner",
        "type": "text",
        "heading": "Introduction to HTML",
        "publishDate": "21-01-2024",
        "likes": 32,
        "content": `<p>This is the introduction to HTML course.</p>`,
        "author": {
            "id": "eDLhJLXv7ChEf6vBCSSbHUphTlV2",
            "name": "Jane T.",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher.png",
        },
        "previousChapter": "",
        "nextChapter": "htmlBeginner/Basics",
        "similarCourse": "",
        "comments": 3
    },
    "htmlBeginner/Basics": {
        "courseName": "HTML Complete Tutorial: Beginner",
        "courseId": "htmlBeginner",
        "type": "text",
        "heading": "Basics of HTML",
        "publishDate": "21-01-2024",
        "likes": 32,
        "content": `<p>This is the basics to HTML course.</p>`,
        "author": {
            "id": "eDLhJLXv7ChEf6vBCSSbHUphTlV2",
            "name": "Jane T.",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher.png",
        },
        "previousChapter": "",
        "nextChapter": "htmlBeginner/Basics",
        "similarCourse": "",
        "comments": 3
    },
    "htmlBeginner/Advanced": {
        "courseName": "HTML Complete Tutorial: Beginner",
        "courseId": "htmlBeginner",
        "type": "text",
        "heading": "Advanced HTML",
        "publishDate": "23-01-2024",
        "likes": 42,
        "content": `<p>This section covers advanced topics in HTML.</p>`,
        "author": {
            "id": "eDLhJLXv7ChEf6vBCSSbHUphTlV2",
            "name": "Jane T.",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher.png",
        },
        "previousChapter": "htmlBeginner/Basics",
        "nextChapter": "",
        "similarCourse": "",
        "comments": 8
    },
    "htmlBeginner/firstProject": {
        "courseName": "HTML Complete Tutorial: Beginner",
        "courseId": "htmlBeginner",
        "type": "text",
        "heading": "first Project HTML",
        "publishDate": "23-01-2024",
        "likes": 42,
        "content": `<p>This section covers advanced topics in HTML.</p>`,
        "author": {
            "id": "eDLhJLXv7ChEf6vBCSSbHUphTlV2",
            "name": "Jane T.",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher.png",
        },
        "previousChapter": "htmlBeginner/Basics",
        "nextChapter": "",
        "similarCourse": "",
        "comments": 8
    },
    "htmlBeginner/multimedia": {
        "courseName": "HTML Complete Tutorial: Beginner",
        "courseId": "htmlBeginner",
        "type": "text",
        "heading": "multimedia HTML",
        "publishDate": "23-01-2024",
        "likes": 42,
        "content": `<p>This section covers advanced topics in HTML.</p>`,
        "author": {
            "id": "eDLhJLXv7ChEf6vBCSSbHUphTlV2",
            "name": "Jane T.",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher.png",
        },
        "previousChapter": "htmlBeginner/Basics",
        "nextChapter": "",
        "similarCourse": "",
        "comments": 8
    },
    "htmlBeginner/nextSteps": {
        "courseName": "HTML Complete Tutorial: Beginner",
        "courseId": "htmlBeginner",
        "type": "text",
        "heading": "next Steps HTML",
        "publishDate": "23-01-2024",
        "likes": 42,
        "content": `<p>This section covers advanced topics in HTML.</p>`,
        "author": {
            "id": "eDLhJLXv7ChEf6vBCSSbHUphTlV2",
            "name": "Jane T.",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher.png",
        },
        "previousChapter": "htmlBeginner/Basics",
        "nextChapter": "",
        "similarCourse": "",
        "comments": 8
    },

    // For course "jsComplete"
    "jsComplete/Introduction": {
        "courseName": "JavaScript Complete Tutorial",
        "courseId": "jsComplete",
        "type": "text",
        "heading": "Introduction to JavaScript",
        "publishDate": "21-01-2024",
        "likes": 45,
        "content": `<p>This is the introduction to JavaScript course.</p>`,
        "author": {
            "id": "12345",
            "name": "John Doe",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher2.png",
        },
        "previousChapter": "",
        "nextChapter": "jsComplete/Basics",
        "similarCourse": "",
        "comments": 6
    },
    "jsComplete/Basics": {
        "courseName": "JavaScript Complete Tutorial",
        "courseId": "jsComplete",
        "type": "text",
        "heading": "Basics of JavaScript",
        "publishDate": "21-01-2024",
        "likes": 45,
        "content": `<p>This is the introduction to JavaScript course.</p>`,
        "author": {
            "id": "12345",
            "name": "John Doe",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher2.png",
        },
        "previousChapter": "",
        "nextChapter": "jsComplete/Basics",
        "similarCourse": "",
        "comments": 6
    },
    "jsComplete/Advanced": {
        "courseName": "JavaScript Complete Tutorial",
        "courseId": "jsComplete",
        "type": "text",
        "heading": "Advanced JavaScript",
        "publishDate": "23-01-2024",
        "likes": 50,
        "content": `<p>This section covers advanced topics in JavaScript.</p>`,
        "author": {
            "id": "12345",
            "name": "John Doe",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher2.png",
        },
        "previousChapter": "jsComplete/Basics",
        "nextChapter": "",
        "similarCourse": "",
        "comments": 10
    },
    "jsComplete/nextSteps": {
        "courseName": "JavaScript Complete Tutorial",
        "courseId": "jsComplete",
        "type": "text",
        "heading": "next Steps JavaScript",
        "publishDate": "23-01-2024",
        "likes": 50,
        "content": `<p>This section covers advanced topics in JavaScript.</p>`,
        "author": {
            "id": "12345",
            "name": "John Doe",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher2.png",
        },
        "previousChapter": "jsComplete/Basics",
        "nextChapter": "",
        "similarCourse": "",
        "comments": 10
    },

    // For course "systemDesign"
    "systemDesign/Introduction": {
        "courseName": "System Design: Deep Dive",
        "courseId": "systemDesign",
        "type": "text",
        "heading": "Introduction to System Design",
        "publishDate": "21-01-2024",
        "likes": 38,
        "content": `<p>This is the introduction to System Design course.</p>`,
        "author": {
            "id": "12345",
            "name": "John Doe",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher2.png",
        },
        "previousChapter": "",
        "nextChapter": "systemDesign/Basics",
        "similarCourse": "",
        "comments": 5
    },
    "systemDesign/Basics": {
        "courseName": "System Design: Deep Dive",
        "courseId": "systemDesign",
        "type": "text",
        "heading": "Basics of System Design",
        "publishDate": "21-01-2024",
        "likes": 38,
        "content": `<p>This is the introduction to System Design course.</p>`,
        "author": {
            "id": "12345",
            "name": "John Doe",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher2.png",
        },
        "previousChapter": "",
        "nextChapter": "systemDesign/Basics",
        "similarCourse": "",
        "comments": 5
    },
    "systemDesign/Advanced": {
        "courseName": "System Design: Deep Dive",
        "courseId": "systemDesign",
        "type": "text",
        "heading": "Advanced System Design",
        "publishDate": "23-01-2024",
        "likes": 47,
        "content": `<p>This section covers advanced topics in System Design.</p>`,
        "author": {
            "id": "12345",
            "name": "John Doe",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher2.png",
        },
        "previousChapter": "systemDesign/Basics",
        "nextChapter": "",
        "similarCourse": "",
        "comments": 9
    },

    // For js/ projects 
    "js-projects/1": {
        "courseName": "Javascript: Advanced Projects",
        "courseId": "js-projects",
        "type": "video",
        "videoId": "https://www.youtube.com/embed/aku2j6VjT74?si=9g7GT5XrQfXJY2wu",
        "thumbnail": "/images/thumbnails/7.jpg",
        "heading": "Javascript: Advanced Projects (part 01)",
        "publishDate": "22-12-2023",
        "author": {
            "id": "12345",
            "name": "John Doe",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher2.png"
        },
        "description": "<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae perspiciatis fugit et eaq</p>",
        "previousChapter": "",
        "nextChapter": "/content/js-projects/2",
        "likes": 10,
        "comments": 2
    },
    "js-projects/2": {
        "courseName": "Javascript: Advanced Projects",
        "courseId": "js-projects",
        "type": "video",
        "videoId": "https://www.youtube.com/embed/aku2j6VjT74?si=9g7GT5XrQfXJY2wu",
        "thumbnail": "/images/thumbnails/7.jpg",
        "heading": "Javascript: Advanced Projects (part 02)",
        "publishDate": "22-12-2023",
        "author": {
            "id": "12345",
            "name": "John Doe",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher2.png"
        },
        "description": "<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae perspiciatis fugit et eaq</p>",
        "previousChapter": "/content/js-projects/1",
        "nextChapter": "/content/js-projects/3",
        "likes": 8,
        "comments": 1
    },
    "js-projects/3": {
        "courseName": "Javascript: Advanced Projects",
        "courseId": "js-projects",
        "type": "video",
        "videoId": "https://www.youtube.com/embed/aku2j6VjT74?si=9g7GT5XrQfXJY2wu",
        "thumbnail": "/images/thumbnails/7.jpg",
        "heading": "Javascript: Advanced Projects (part 03)",
        "publishDate": "22-12-2023",
        "author": {
            "id": "12345",
            "name": "John Doe",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher2.png"
        },
        "description": "<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae perspiciatis fugit et eaq</p>",
        "previousChapter": "/content/js-projects/2",
        "nextChapter": "/content/js-projects/4",
        "likes": 12,
        "comments": 3
    },
    "js-projects/4": {
        "courseName": "Javascript: Advanced Projects",
        "courseId": "js-projects",
        "type": "video",
        "videoId": "https://www.youtube.com/embed/aku2j6VjT74?si=9g7GT5XrQfXJY2wu",
        "thumbnail": "/images/thumbnails/7.jpg",
        "heading": "Javascript: Advanced Projects (part 04)",
        "publishDate": "22-12-2023",
        "author": {
            "id": "12345",
            "name": "John Doe",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher2.png"
        },
        "description": "<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae perspiciatis fugit et eaq</p>",
        "previousChapter": "/content/js-projects/3",
        "nextChapter": "/content/js-projects/5",
        "likes": 15,
        "comments": 4
    },
    "js-projects/5": {
        "courseName": "Javascript: Advanced Projects",
        "courseId": "js-projects",
        "type": "video",
        "videoId": "https://www.youtube.com/embed/aku2j6VjT74?si=9g7GT5XrQfXJY2wu",
        "thumbnail": "/images/thumbnails/7.jpg",
        "heading": "Javascript: Advanced Projects (part 05)",
        "publishDate": "22-12-2023",
        "author": {
            "id": "12345",
            "name": "John Doe",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher2.png"
        },
        "description": "<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae perspiciatis fugit et eaq</p>",
        "previousChapter": "/content/js-projects/4",
        "nextChapter": "/content/js-projects/6",
        "likes": 18,
        "comments": 5
    },
    "js-projects/6": {
        "courseName": "Javascript: Advanced Projects",
        "courseId": "js-projects",
        "type": "video",
        "videoId": "https://www.youtube.com/embed/aku2j6VjT74?si=9g7GT5XrQfXJY2wu",
        "thumbnail": "/images/thumbnails/7.jpg",
        "heading": "Javascript: Advanced Projects (part 06)",
        "publishDate": "22-12-2023",
        "author": {
            "id": "12345",
            "name": "John Doe",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher2.png"
        },
        "description": "<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae perspiciatis fugit et eaq</p>",
        "previousChapter": "/content/js-projects/5",
        "nextChapter": "",
        "likes": 20,
        "comments": 6
    },
    // java project
    "javaProjects/1": {
        "courseName": "Java: Advanced Projects",
        "courseId": "javaProjects",
        "type": "video",
        "videoId": "https://www.youtube.com/embed/aku2j6VjT74?si=9g7GT5XrQfXJY2wu",
        "thumbnail": "/images/thumbnails/5.jpg",
        "heading": "Java: Advanced Projects (part 01)",
        "publishDate": "22-12-2023",
        "author": {
            "id": "12345",
            "name": "John Doe",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher2.png"
        },
        "description": "<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae perspiciatis fugit et eaq</p>",
        "previousChapter": "",
        "nextChapter": "javaProjects/1",
        "likes": 10,
        "comments": 2
    },
    // dsa beginner
    "dsa-beginner/default": {
        "courseName": "DSA: Beginner",
        "courseId": "dsa-beginner",
        "type": "text",
        "heading": "Data Structure and Algorithm: Default",
        "publishDate": "21-01-2024",
        "likes": 38,
        "content": `<p>This is the introduction to System Design course.</p>`,
        "author": {
            "id": "12345",
            "name": "John Doe",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher2.png",
        },
        "previousChapter": "",
        "nextChapter": "dsa-beginner/default",
        "similarCourse": "",
        "comments": 5
    },
    // dsa medium
    "dsa-medium/default": {
        "courseName": "DSA: medium",
        "courseId": "dsa-medium",
        "type": "text",
        "heading": "Data Structure and Algorithm: Default",
        "publishDate": "21-01-2024",
        "likes": 38,
        "content": `<p>This is the introduction to System Design course.</p>`,
        "author": {
            "id": "12345",
            "name": "John Doe",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher2.png",
        },
        "previousChapter": "",
        "nextChapter": "dsa-medium/default",
        "similarCourse": "",
        "comments": 5
    },
    // dsa expert
    "dsa-expert/default": {
        "courseName": "DSA: Expert",
        "courseId": "dsa-expert",
        "type": "text",
        "heading": "Data Structure and Algorithm: Default",
        "publishDate": "21-01-2024",
        "likes": 38,
        "content": `<p>This is the introduction to System Design course.</p>`,
        "author": {
            "id": "12345",
            "name": "John Doe",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher2.png",
        },
        "previousChapter": "",
        "nextChapter": "dsa-beginner/default",
        "similarCourse": "",
        "comments": 5
    },
    // java beginner
    "javaBeginner/default": {
        "courseName": "JAVA: Beginner",
        "courseId": "javaBeginner",
        "type": "text",
        "heading": "JAVA: Default",
        "publishDate": "21-01-2024",
        "likes": 38,
        "content": `<p>This is the introduction to System Design course.</p>`,
        "author": {
            "id": "12345",
            "name": "John Doe",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher2.png",
        },
        "previousChapter": "",
        "nextChapter": "dsa-beginner/default",
        "similarCourse": "",
        "comments": 5
    },
    // dsa medium
    "javaMedium/default": {
        "courseName": "DSA: Beginner",
        "courseId": "javaMedium",
        "type": "text",
        "heading": "Data Structure and Algorithm: Default",
        "publishDate": "21-01-2024",
        "likes": 38,
        "content": `<p>This is the introduction to System Design course.</p>`,
        "author": {
            "id": "12345",
            "name": "John Doe",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher2.png",
        },
        "previousChapter": "",
        "nextChapter": "dsa-medium/default",
        "similarCourse": "",
        "comments": 5
    },
    // dsa expert
    "javaExpert/default": {
        "courseName": "JAVA: Expert",
        "courseId": "javaExpert",
        "type": "text",
        "heading": "Data Structure and Algorithm: Default",
        "publishDate": "21-01-2024",
        "likes": 38,
        "content": `<p>This is the introduction to System Design course.</p>`,
        "author": {
            "id": "12345",
            "name": "John Doe",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/teacher2.png",
        },
        "previousChapter": "",
        "nextChapter": "dsa-beginner/default",
        "similarCourse": "",
        "comments": 5
    },
}
export var courseContentComments = {
    "problemSolvingLeetCode/Introduction": [
        {
            "uid": "xtz",
            "name": "Kitty Holmes",
            "commentDate": "22-12-2023",
            "comment": "This is an awesome comment.",
            "imageSrc": "/images/profile/testUser.png"
        },
        {
            "uid": "zhcyWRZpJKZohfqSt6Xihyo4Awq2",
            "name": "Nitesh Saxena",
            "commentDate": "22-12-2013",
            "comment": "Wow! What an explanation. Really like the way..  is an awesome comment.",
            "imageSrc": "/images/profile/photo_1.png"
        },
        {
            "uid": "xtz",
            "name": "Kitty Holmes",
            "commentDate": "22-12-2023",
            "comment": "This is an tell me more about it lorem comment.",
            "imageSrc": "/images/profile/testUser.png"
        }
    ],
    "problemSolvingLeetCode/Basics": [
        {
            "uid": "zhcyWRZpJKZohfqSt6Xihyo4Awq2",
            "name": "Nitesh Saxena",
            "commentDate": "22-12-2013",
            "comment": "Wow! What an explanation. Really like the way..  is an awesome comment.",
            "imageSrc": "/images/profile/photo_1.png"
        },
        {
            "uid": "hhjGEzFfz4gcFBUt9qROUwxxI852",
            "name": "Nitesh S.",
            "commentDate": "22-12-2023",
            "comment": "This is an awesome comment.",
            "imageSrc": "/images/profile/user.jpg"
        },
        {
            "uid": "xtz",
            "name": "Kitty Holmes",
            "commentDate": "22-12-2023",
            "comment": "What a way to explain... :)",
            "imageSrc": "/images/profile/testUser.png"
        }
    ]

}