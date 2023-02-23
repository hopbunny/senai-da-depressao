import { Course } from "../types/Course";

export default function populateCourseList(wrapper: Element, courses: Course[]) {
    
    const courseTemplate = document.querySelector<HTMLTemplateElement>('#course_card_template')!.content;

    for(let course of courses) {
        let fragment = courseTemplate.cloneNode(true) as Element;
        fragment.querySelector<HTMLImageElement>('.card__thumb')!.src = course.thumb;
        fragment.querySelector('.card__title')!.textContent = course.title;
        fragment.querySelector('.card__desc')!.textContent = course.desc;
        fragment.querySelector('.card__reference__value--duration')!.textContent = course.duration;
        fragment.querySelector('.card__reference__value--stars')!.textContent = `${course.stars.toFixed(1)}/5.0`;

        let link = document.createElement('a');
        link.href = course.url;
        link.target = '__blank';
        link.appendChild(fragment);

        wrapper?.appendChild(link);
    }
}