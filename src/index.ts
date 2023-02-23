import MemoryCourseRepository from "./repository/course/CourseRepository";
import populateCourseList from "./populator/CoursesPopulator";
import Modal from "./components/modal";
import SearchModalContent from "./components/search-modal";

const repository = new MemoryCourseRepository;

populateCourseList(document.querySelector('#courses_list')!, repository.all());

const modal = new Modal(document.querySelector('.modal')!, document.querySelector('.modal > .modal__content > .container')!);
document.querySelector('.modal__close-button')!.addEventListener('click', () => {
    modal.close();
});

document.querySelector('#search-button')!.addEventListener('click', () => {
    modal.fill(new SearchModalContent(repository));
    modal.open();
});

document.querySelector('.hero__cta')!.addEventListener('click', () => {
    window.open(repository.pickRandom().url, '_blank');
});