export var userPrivateProfile = {
    "username": "Nitesh S.",
    "userProfileSrc": "/images/profile/user.jpg",
    "mailId": "nitesh_91@outlook.com",
    "role": "Stack Explorer"
}
export var userPublicProfile = {
    "username": "Nitesh S.",
    "about-me": "I am a curious little kid.",
    "work": "Vice President",
    "location": "India",
    "tech-stack": "JAVA Developer",
    "facebook": "ratednitesh",
    "instagram": "ratednitesh",
    "linkedin": "ratednitesh",
    "github": "",
    "userProfileSrc": "/images/profile/user.jpg",
    "role": "Stack Explorer"
};
export var actvities = {
    "saved-courses": "43",
    "liked-tutorials": "23",
    "total-comments": "12"
};
export var enrolledCourses = [
    {
        "thumbnail": "/images/thumbnails/thumbnail sample.jpg",
        "title": "Solving LeetCode Questions",
        "href": "/playlist"
    },
    {
        "thumbnail": "/images/thumbnails/thumbnail sample.jpg",
        "title": "Solving LeetCode Questions",
        "href": "/playlist"
    }, {
        "thumbnail": "/images/thumbnails/thumbnail sample.jpg",
        "title": "Solving LeetCode Questions",
        "href": "/playlist"
    }
];
export var topStreams = [
    { icon: 'fa-code', text: 'development' },
    { icon: 'fa-chart-simple', text: 'business' },
    { icon: 'fa-pen', text: 'design' },
    { icon: 'fa-chart-line', text: 'marketing' },
    { icon: 'fa-music', text: 'music-tech' },
    { icon: 'fa-camera', text: 'photography' },
    { icon: 'fa-cog', text: 'software' },
    { icon: 'fa-vial', text: 'science' },
    { icon: 'fa-cog', text: 'space' },
    { icon: 'fa-vial', text: 'backend' }
];

export var topCourses = [
    {
        thumbnail: "/images/thumbnails/thumbnail sample.jpg",
        title: "Some Random Text course",
        href: "/course"
    },
    {
        thumbnail: "/images/thumbnails/thumbnail sample.jpg",
        title: "Solving LeetCode Questions",
        href: "/playlist"
    },
    {
        thumbnail: "/images/thumbnails/thumbnail sample.jpg",
        title: "Solving LeetCode Questions",
        href: "/playlist"
    },
    {
        thumbnail: "/images/thumbnails/thumbnail sample.jpg",
        title: "Solving LeetCode Questions",
        href: "/playlist"
    },
    {
        thumbnail: "/images/thumbnails/thumbnail sample.jpg",
        title: "Solving LeetCode Questions",
        href: "/playlist"
    },
    {
        thumbnail: "/images/thumbnails/thumbnail sample.jpg",
        title: "Solving LeetCode Questions",
        href: "/playlist"
    }
];

export var courseDetails = {
    "course1": {
        "courseName": "Complete HTML tutorial",
        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae perspiciatis fugit et eaq",
        "level": 3,
        "href": "/content",
        "chapterCount": "14 Chapters",
        "thumbnail": "/images/thumbnails/thumbnail sample.jpg",
        "author": {
            "id":"12345",
            "name": "John Doe",
            "role": "Stack Builder",
            "userProfileSrc": "/images/profile/photo_1.png",
        },
        "publishDate": "22-12-2023"
    }
}
export var userPublic = {
    "12345": {
        "name": "John Doe",
        "role": "Stack Builder",
        "userProfileSrc": "/images/profile/photo_1.png",
    },
    "23456": {
        "name": "Jane Doe",
        "role": "Stack Explorer",
        "userProfileSrc": "/images/profile/photo_1.png",
    },
    "34567": {
        "name": "Jane Deol",
        "role": "Stack Explorer",
        "userProfileSrc": "/images/profile/photo_1.png",
    }
}

export var courseReviews = {
    "course1": [
        {
            "review": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque autem id eligendi minima quo pariatur            quidem! Recusandae nisi vero non dolorum facere quibusdam minus sequi, eos pariatur atque voluptatibus",
            "user": {
                "id":"12345",
                "name": "John Doe",
                "role": "Stack Builder",
                "userProfileSrc": "/images/profile/photo_1.png",
            },
            "rating": 4.5
        },
        {
            "review": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque autem id eligendi minima quo pariatur            quidem! Recusandae nisi vero non dolorum facere quibusdam minus sequi, eos pariatur atque voluptatibus",
            "user": {
                "id":"23456",
                "name": "Jane Doe",
                "role": "Stack Explorer",
                "userProfileSrc": "/images/profile/photo_1.png",
            },
            "rating": 2.5
        }
    ]
}
export var courseContentDetails = `    <h1 class="heading">Course Details</h1>
<div class="container">
    <div class="button-container">
        <button id="expand-button" class="button-container-button expand">Expand
            All</button>
        <button id="collapse-button" class="button-container-button collapse" hidden>Collapse All</button>
    </div>
    <div class="accordion">
        <div class="accordion-item">
            <div class=" expandable accordion-header">
                <h3><i class="fa-solid fa-diamond bullet"></i> Introduction to HTML <i
                        class=" expand fa-solid fa-angle-down"></i></h3>
            </div>
            <div class="accordion-content">
                <li class="course-list"><a href="/content" onclick="route()"><i
                            class="fa-solid fa-caret-right"></i>What is HTML?</a></li>
                <li class="course-list"><a href="/content" onclick="route()"><i
                            class="fa-solid fa-caret-right"></i>Why HTML?</a></li>
                <li class="course-list"><a href="/content" onclick="route()"><i
                            class="fa-solid fa-caret-right"></i>Basics of HTML?</a></li>

            </div>
        </div>
        <div class="accordion-item">
            <div class=" expandable accordion-header">
                <h3><i class="fa-solid fa-diamond bullet"></i> Section deep Learn to HTML<i
                        class=" expand fa-solid fa-angle-down"></i></h3>
            </div>
            <div class="accordion-content">
                <li class="course-list"><a href="/content" onclick="route()"><i
                            class="fa-solid fa-caret-right"></i>What is HTML?</a></li>
                <li class="course-list"><a href="/content" onclick="route()"><i
                            class="fa-solid fa-caret-right"></i>Why HTML?</a></li>
                <li class="course-list"><a href="/content" onclick="route()"><i
                            class="fa-solid fa-caret-right"></i>Basics of HTML?</a></li>


            </div>
        </div>
        <div class="accordion-item">
            <div class=" expandable accordion-header">
                <h3><i class="fa-solid fa-diamond bullet"></i> Section advanced to HTML<i
                        class=" expand fa-solid fa-angle-down"></i></h3>
            </div>
            <div class="accordion-content">
                <li class="course-list"><a href="/content" onclick="route()"><i
                            class="fa-solid fa-caret-right"></i>What is HTML?</a></li>
                <li class="course-list"><a href="/content" onclick="route()"><i
                            class="fa-solid fa-caret-right"></i>Why HTML?</a></li>
                <li class="course-list"><a href="/content" onclick="route()"><i
                            class="fa-solid fa-caret-right"></i>Basics of HTML?</a></li>


            </div>
        </div>
        <div class="accordion-item">
            <div class="accordion-header"><a href="/content" onclick="route()">
                <h3><i class="fa-solid fa-diamond bullet"></i> no sub section to HTML</h3></a>
            </div>
        </div>
    </div>
</div>`;