import {html, LitElement} from 'lit';
import {createRef, ref, Ref} from 'lit/directives/ref.js';
import {customElement, property} from 'lit/decorators.js';

@customElement('tag-list-input')
export class TagListInputComponent extends LitElement {

    @property()
    value = '';

    @property()
    name = 'tags';

    createRenderRoot() {
        return this;
    }

    private newTagInputRef: Ref<HTMLInputElement> = createRef();

    private getTagInputText() {
        const input = this.newTagInputRef.value;
        return input ? input.value : '';
    }

    private clearTagInputText() {
        const input = this.newTagInputRef.value;
        if (input) {
            input.value = '';
        }
    }

    private tagList() {
        if (this.value === '') {
            return [];
        }

        return Array.from(new Set(this.value.split(',')));
    }

    private addTag() {
        const newTag = this.getTagInputText().trim();
        if (newTag.length === 0) {
            return;
        }

        const currentTags = this.tagList();
        const newTags = Array.from(new Set(currentTags.concat(newTag)));
        this.value = newTags.join(',');

        this.clearTagInputText();
    }

    private removeTag(tag: string) {
        const currentTags = this.tagList();
        const newTags = currentTags.filter(it => it !== tag);
        this.value = newTags.join(',');
    }

    private tryRemoveLastTag() {
        if (this.getTagInputText().length > 0) {
            return;
        }

        const currentTags = this.tagList();
        if (currentTags.length === 0) {
            return;
        }

        const newTags = currentTags.slice(0, currentTags.length - 1);
        this.value = newTags.join(',');
    }

    private renderSingleTag(tag: string) {
        return html`<li @click=${() => this.removeTag(tag)}>× ${tag}</li>`;
    }

    private handleInputKeyDown(event: KeyboardEvent) {
        if (event.code === 'Enter') {
            event.preventDefault();
            return false;
        }
    }

    private handleInputKeyUp(event: KeyboardEvent) {
        if (event.code === 'Enter') {
            this.addTag();
        }
        if (event.code === 'Backspace' && this.getTagInputText() === '') {
            this.tryRemoveLastTag();
        }
    }

    render() {
        return html`
            <input type="hidden" name="${this.name}" value="${this.value}"/>
            <ul>
                ${this.tagList().map(it => this.renderSingleTag(it))}
            </ul>
            <input ${ref(this.newTagInputRef)}
                   type="text"
                   @keydown=${this.handleInputKeyDown} 
                   @keyup=${this.handleInputKeyUp}
            />
        `;
    }
}
