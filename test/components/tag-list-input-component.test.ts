import {expect, fixture, html, nextFrame} from '@open-wc/testing';
import {TagListInputComponent} from '../../src/components/tag-list-input-component';

describe('tag-list-input', () => {
    const test = it;

    const queryAllText = (el: Element, cssSelector: string): string[] => {
        const nodeList = el.querySelectorAll(cssSelector);
        const nodeArray = Array.from(nodeList);

        return nodeArray.map(it => it.textContent);
    };

    const pressEnter =
        new KeyboardEvent('keyup', {code: 'Enter'});

    const pressBackspace =
        new KeyboardEvent('keyup', {code: 'Backspace'});

    const textField = (el: Element) => el.querySelector<HTMLInputElement>('input[type=text]');
    const hiddenField = (el: Element) => el.querySelector<HTMLInputElement>('input[type=hidden]');
    const displayedTags = (el: Element) => queryAllText(el, 'li');

    test('initial rendering', async () => {
        const el = await fixture(html`
            <tag-list-input value='foo,bar' name="tags"/>
        `);

        expect(el).instanceOf(TagListInputComponent);

        expect(displayedTags(el)).deep.equal(['× foo', '× bar']);
        expect(hiddenField(el)).attribute('name', 'tags');
        expect(hiddenField(el)).attribute('value', 'foo,bar');
    });

    test('rendering with no tags', async () => {
        const el = await fixture(html`
            <tag-list-input value='' name="tags"/>
        `);

        expect(el.querySelectorAll('li').length).equal(0);
    });

    test('adding a tag', async () => {
        const el = await fixture(html`
            <tag-list-input value='foo' name="tags"/>
        `);

        textField(el).value = 'bar';
        textField(el).dispatchEvent(pressEnter);
        await nextFrame();

        expect(displayedTags(el)).deep.equal(['× foo', '× bar']);
        expect(hiddenField(el)).attribute('value', 'foo,bar');
    });

    test('trying to add a duplicate tag', async () => {
        const el = await fixture(html`
            <tag-list-input value='foo' name="tags"/>
        `);

        textField(el).value = 'foo';
        textField(el).dispatchEvent(pressEnter);
        await nextFrame();

        expect(displayedTags(el)).deep.equal(['× foo']);
        expect(hiddenField(el)).attribute('value', 'foo');
    });

    test('removing a tag with the keyboard', async () => {
        const el = await fixture(html`
            <tag-list-input value='foo,bar' name="tags"/>
        `);

        textField(el).dispatchEvent(pressBackspace);
        await nextFrame();

        expect(displayedTags(el)).deep.equal(['× foo']);
        expect(hiddenField(el)).attribute('value', 'foo');
    });

    test('removing a tag with the mouse', async () => {
        const el = await fixture(html`
            <tag-list-input value='foo,bar' name="tags"/>
        `);

        const itemNodeList = el.querySelectorAll('li');
        const itemNodeArray = Array.from(itemNodeList);
        const firstItem = itemNodeArray[0];

        firstItem.click();
        await nextFrame();

        expect(displayedTags(el)).deep.equal(['× bar']);
        expect(hiddenField(el)).attribute('value', 'bar');
    });
});
