# Firestore Rules

## General Facts
**Types of Access:**
  * READ
    * GET
    * LIST
  * WRITE
    * CREATE
    * UPDATE
    * DELETE

**Types of Courses**

There can be 3 levels of Visibility of every course and chapter:
1. Public
2. Private
3. Paid

There can be two types of courses:
1. Text
2. Video

**Types of Users**

There are 5 types of users:
1. *Guest User(G)* - An unauthenticated user should have following access
2. *Stack Explorer(E)* - A logged in user, who can enroll to courses and study.
3. *Stack Builder(B)* - A logged in user, who can create courses and enroll
	 to courses
4. *Super User(S)* - A maintainer of website, who can:
    * Approve/ Revoke Stack Builder access of users.
    * Move courses from Draft to Published. 
    * Delete Comments. 
5. *Admin(A)* - Full access


## Info saved in User object
		
	{	
		email: ""
		photoURL: "",
		displayName: ""
	}
		
## List Of Collections
// Based on estimation, 3k+ course objects can fit in one doc
- AllCourses
	- {allCourses}: { {courseId}: } 
	- {allStreams}: { {streamId}: }
- CoursesByStreams: {streamId}: {}
- CourseDetail: {courseId}: {}
	- EnrolledUsers: {uid}: {}
	- Reviews: {uid}: {}
	- Content: {chapterId}: {}
	    - Comments: {commentId}: {}
	    - Likes: {uid}: {}
- TutorApplications
- UserPrivateProfile
- UserPublicProfile
- TutorDetails

## Accesses to Collections

## General
 - Do not allow Reading and Writing to any Collection/ Document unless 
	 specfied otherwise for each collection

## AllItems
This will contain 2 documents:
### 1. AllCourses Document
**Structure of each object in the document:**

	    {courseId} : { 
	        thumbnail: "/path/to/image.jpg[png]",
	        title: "Course Title"
	    }   
	     
### 2. AllStreams Document
**Structure of each object in the document:**
	
	    {streamId}: { icon: 'es-icon', text: 'Stream Name'}
	
**Rules:**
- **GET:** Anybody can read from this collection
- **UPDATE: **
	- Only *Admin(s) / Super Users* should be able to update docs in this
	  Collection.
	- No other field should be added other than the one allowed in each object.
	- Max length of each allowed field should not be more than 25.
	- For *AllCourses*, Course ID added should also be present in *CourseDetail*
	- For *AllStreams*, Stream Id added should also be present in *CoursesByStreams*
	
- **CREATE, DELETE:** false
    
## CoursesByStreams
**Structure:**

	  {streamId}: { 
	    {courseId}: {  thumbnail: '', title: ''},
	    ..
	  }
      
**Rules:**
- **GET:**  Anybody can read from this collection
- **CREATE, UPDATE:**
	- Only *Admin(s) / Super Users* should be able to update docs in this
	  Collection.
	- No other field should be added other than the one allowed in each object.
	- Max length of each allowed field should not be more than 25.
- **DELETE:** false

## CourseDetail
**Structure:**

    {courseId}: {
			author: { uid, name , photo },
			courseName: " Title",
      description: "Desc",
      level: 2, // allowed value 1, 2 or 3.    
      chapterCount: 13, // marked at creation
      type: "text" // allowed values: 'text' or 'video',
      visibility: 'Public',
      href: "path/to/first/chapter",      
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      version: "",
      thumbnail: "path/to/thumbnail",
      chapters: [
         { 
	        title: "Some Chapter",
	        type: chapter,
	        href: "path/to/chapter",
	        thumbnail: "path/to/thumbnail" // For video course.
	        id: 0
	      },
        { 
          title: "Some Section", 
          type: section,
          subChapters: [
	           { title: "Sub Chapter 1" href: "path/to/chapter", id: 1 },
	           { title: "Sub Chapter 2" href: "path/to/chapter", id: 2 }
         ]
       ],
       streams: { {streamId} : {icon: "es-icon",text: "Stream Name"}},
       topReviews: {} // to be updated via cloud function OR admin ?
    }

**Rules:**

- **GET**: Anybody can read from this document.
- **CREATE**:
  - Only *Admin(s) / Super Users* should be able to write to this Collection
  - author.uid should be present in UsersPublic collection
	  and role = 'Stack Builder' in that collection
	- all mandatory fields should be there.
	- type s/d be text or video
	- visibility s/d be Public, Private or Public.
	- level s/d be 1, 2 or 3.
	- validate author obect for all basic checks.
- **UPDATE**
	- same checks as create.
	- version } data.version
- **DELETE** false
	
     
##  CourseDetail / EnrolledUsers
**Structure:**

	{uid}: {
		user:{ uid, name , photo },
		createdAt: "",
	}
			
**Rules:**

- **READ:** 
	- if auth.uid = course/ {course}.author.uid OR user.role = 'Admin'
- **GET:**
	- Logged In User only should be able to check if their uid exists.
- **CREATE**:
	- if Course/{course}.visibility = 'Public': any logged in user can write 
		to this collection if auth.uid = EnrolledUsers/ { docId }
	- if Course/{course}.visibility = 'Private': write false
	- if Course/{course}.visibility = 'Paid': write false
	- No other field should be added other than the one allowed.
	- Max length of each allowed field should not be more than 25.
- **UPDATE, DELETE**: false 

## CourseDetail / Reviews
**Structure:**

	{uid}: {
		user: { uid, name , photo },	
		rating: 4.5,
		review: "",
		createdAt: "",
	}

**Rules:**

- **READ:** Anybody can read from this collection
- **CREATE:**
	- User is logged in and auth.uid = Reviews / { reviewid }
	- User is part of Course/ {course} / EnrolledUsers
	- No other field should be added other than the one allowed
	- Max length of each allowed field in user should not be more than 25.
	- Review field should be not more than 200 characters.
	- rating field should be decimal b/w 1 - 5.
	- dateAdded should be timestamp
- **UPDATE, DELETE**: false 

## CourseDetail / Content
**Structure:**

	{chapterId}: {
     heading: "Chapter Title",
     likes: 35,
     nextChapter: "/path/to/next/chapter",
     previousChapter: "/path/to/prev/chapter",
     type: "text", / "video"
     createdAt: serverTimestamp(),
     updatedAt: serverTimestamp(),
     content: "content data",
     description: "vide course description",
     thumbnail: "",
     videoId: "",
	}
	       
**Rules:**

- **GET**:
	- if {course}.visibility = 'Public': Anybody can read from this collection 
	- if {course}.visibility = 'Private': Only Author can read from this collection
		i.e. {chapter doc}.author.uid = auth.uid
	- if {course}.visibility = 'Paid': Only Can Read if auth.uid exists in 
		/Chapter/{course}/EnrolledUsers/{uid} OR author
	- if {course}.visibility = 'Paid' and	{course} / Content / {chapter}. visibility
		= 'Public': Anybody can read from this collection   
- **WRITE**:
	- Only *Admin(s) / Super Users* should be able to write to this Collection.

## CourseDetail / Content / Comments

**Structure:**

	{commentId}: {
			user: { uid, name, photo }
			createdAt: "",
			comment: ""
	}
**Rules:**

- **READ:** Anybody can read from this collection if have access to read 
	the Content/ {chapter}
- **WRITE:**
	- Any user should be able to write a doc in this Collection given that:
		- User is authenticated.
		- request.auth.uid = {commentId}.user.uid
		- {commentId}.comment length is less than 100 characters.
		- No other field should be added other than the one allowed
		- Max length of each allowed field in user should not be more than 25.

##   CourseDetail / Content / Likes
**Structure:**

	{uid}: {
		user: { uid, name , photo },
		createdAt: "",		
	}
**Rules:**

- READ: Anybody can read from this collection
- WRITE:
	- Admin should create this collection at the time of publishing a new course
- CREATE:
	- Any user should be able to create a doc in this Collection given that:
			- User is authenticated.
			- request.auth.uid = likes/ { docid }
			- No other field should be added other than the one allowed
			- Max length of each allowed field in usershould not be more than 25.
			- dateAdded s/d be current timestamp.


## TutorApplications
**Structure:**

	{uid}: { message: "", status: "new"| "in_review"|"archived" }
								
**Rules:**

- **READ**: Only if Role = 'Admin' , 'SuperUser'
- **CREATE**:
	- User is logged in and auth.uid = TutorApplications / { docId }
	- No other field should be added other than the one allowed
	- max length of message is 300.
	- Status = "New" if uid != Admin / Super User
	- Allowed Status = New, In Review, Archived.
- **UPDATE, DELETE**: false 

## UsersPublic
**Structure:**

	{uid}: {
		role: "",
		userProfileSrc: "",
		userName: "",
		tech-stack: "",
		about-me: "",
		facebook: "",
		github: "",
		instagram:"",
		linkedIn:"",
		location:"",
	}
	
**Rules:**

- **GET**: Anybody can read.
- **CREATE, UPDATE**:
	- User is logged in and auth.uid = UsersPublic / {uid}
	- user.role = 'Stack Explorer'
	- No other field should be added other than the one allowed
	- max length of each field is 25.
- **DELETE:** false

## TutorDetails

	{uid}:{
		publishedCourses: {
			courseId:{ h, t }
		},
		stats: {
			published-courses: 2,
			tutor-liked-tutorials: 1,
			tutor-rating: 4.5
		}
	},
	
**Rules:**
- **GET**: Anybody can read.
- **CREATE, UPDATE**:
	- Can only be added/ updated by 'Admin' , 'SuperUsers'.
- **DELETE:** false

## UsersPrivate
**Structure:**

		{uid}: {
			createdAt: timestamp
			role: stack explorer
			likedTutorials: {
				{courseId}+{chapterId}:{
					href: "",
					status: "liked", "disliked", "neutral"
					title: ""
				}
			},
			enrolledCourses: {
				{courseId}:{
					title:"",
					thumbnail: "",
					chaptersCompleted: [],
					status: "In Progress", / Completed
					nextChapter: "",
					totalChapters: ""
				}
			},
		}
		
**Rules:**

- **GET:** Only if UID = UsersPrivate / {uid}
- **CREATE, UPDATE:**
	- Only if UID = UsersPrivate / {uid}
	- Check all fields size, presence etc in both object.
- **DELETE:** False
   
## UsersPrivate / PrivateCourses 
{TBD}

## CoursesInReview
{TBD} 