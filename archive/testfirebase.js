async function createTestData() {
    Object.keys(courseContentComments).forEach(key => {
        courseContentComments[key].forEach(c => {
            addDocument(COURSE_DETAILS + "/problemSolvingLeetCode/Content/"+key+"/Comments",  c);
        })
    });
    // topCourses.forEach(async d => await addDocument("All", d));
    console.log('Test Data added');
}