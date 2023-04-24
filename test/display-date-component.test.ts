import {assert, fixture, html} from '@open-wc/testing';
import {DisplayDateComponent} from '../src/display-date-component';

const test = it;

describe('display-date', () => {

    test('rendering', async () => {
        const el = await fixture(html`
            <display-date epochSeconds='1682344758250'></display-date>
        `);

        assert.instanceOf(el, DisplayDateComponent);
        assert.isTrue(el.innerHTML.includes('5/19/55281, 2:24:10 PM'));
    });
});
