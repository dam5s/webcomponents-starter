import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('display-date')
export class DisplayDateComponent extends LitElement {

    @property({attribute: 'epoch-seconds', type: Number})
    epochSeconds = 0;

    createRenderRoot() {
        return this;
    }

    render() {
        return html`${new Date(this.epochSeconds * 1000).toLocaleString()}`;
    }
}
