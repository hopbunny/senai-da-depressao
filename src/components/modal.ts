export interface ModalContent {
    mount(): void;
    getContent(): Element;
    destroy(): void;
}

export default class Modal {

    private mainElement: Element;
    private contentWrapper: Element;
    private currentContent?: ModalContent;

    public constructor(mainElement: Element, contentWrapper: Element) {
        this.mainElement = mainElement;
        this.contentWrapper = contentWrapper;
    }

    public fill(newContent: ModalContent) {
        this.currentContent?.destroy();

        this.contentWrapper.innerHTML = '';
        this.contentWrapper.appendChild(newContent.getContent());
        
        newContent.mount();
        this.currentContent = newContent;
    }

    public toggle() {
        if(this.mainElement.classList.contains('modal--show')) {
            this.close();
            return;
        }

        this.open();
    }

    public close() {
        this.mainElement.classList.remove('modal--show');

        this.currentContent?.destroy();
        this.currentContent = undefined;

        document.body.classList.remove('lock');
    }
    
    public open() {
        this.mainElement.classList.add('modal--show');
        document.body.classList.add('lock');
    }
    
}