import { ModalContent } from "./modal";
import { ICourseRepository } from "../repository/course/CourseRepository";
import populateCourseList from "../populator/CoursesPopulator";

export default class SearchModalContent implements ModalContent {

    private courseRepository: ICourseRepository;
    private intervalId?: number;
    private lastSearchTerm: string|null = null;

    public constructor(courseRepository: ICourseRepository) {
        this.courseRepository = courseRepository;
    }

    public mount(): void {
        this.intervalId = setInterval(() => this.searchHeartbeat(), 500);
    }
    
    public getContent(): Element {
        return document.querySelector<HTMLTemplateElement>('#search-modal')!.content.cloneNode(true) as Element;
    }
    
    public destroy(): void {
        clearInterval(this.intervalId);
    }
    
    private toggleSearchNotFound(add: boolean|undefined = undefined): void {
        document.querySelector('.search-input__not-found')!.classList.toggle('search-input__not-found--show', add);
    }

    private searchHeartbeat(): void {
        const searchInput = document.querySelector<HTMLInputElement>('.search-input')!;
        const searchWord = searchInput.value.trim();
        const coursesWrapper = document.querySelector('.search-modal__results-wrapper')!;

        if(searchWord === this.lastSearchTerm) {
            return;
        }
        coursesWrapper.innerHTML = '';
        this.toggleSearchNotFound(false);
        this.lastSearchTerm = null;

        if(searchWord === '') {
            return;
        }
        
        const courses = this.courseRepository.find(searchWord);
        
        if(courses.length === 0) {
            this.toggleSearchNotFound(true);
            return;
        }
        this.lastSearchTerm = searchWord;
        this.toggleSearchNotFound(false);
        
        coursesWrapper.innerHTML = '';

        populateCourseList(coursesWrapper, courses);
    }
}