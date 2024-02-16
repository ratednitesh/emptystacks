import { loadPopularCourses } from "./common";

export function initCourses(){
    loadPopularCourses();
    console.log('courses loaded.');
}