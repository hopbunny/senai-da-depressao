import { Course } from "../../types/Course";
import courses from "./CourseList";

export interface ICourseRepository {
    all(): Course[];
    find(keyword: string): Course[];
    pickRandom(): Course;
}

export default class MemoryCourseRepository implements ICourseRepository {
    all(): Course[] {
        return courses;
    }

    find(keyword: string): Course[] {
        return courses.filter((course: Course) => {
            return course.title.includes(keyword) || course.desc.includes(keyword);
        });
    }

    pickRandom(): Course {
        return courses[Math.max(Math.min(Math.round(courses.length * Math.random()), courses.length - 1), 0)];
    }
}