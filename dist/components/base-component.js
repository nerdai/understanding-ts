// Component Base Class
export class Component {
    constructor(template, hostElementId, insertAtStart, newElementId) {
        this.insertAtStart = insertAtStart;
        this.templateElement = document.getElementById(template);
        this.hostElement = document.getElementById(hostElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(this.insertAtStart);
    }
    attach(insertAtBeginning) {
        // render the form
        this.hostElement.insertAdjacentElement(insertAtBeginning ? "afterbegin" : "beforeend", this.element);
    }
}
//# sourceMappingURL=base-component.js.map