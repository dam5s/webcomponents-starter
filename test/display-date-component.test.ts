import {assert, fixture, html} from '@open-wc/testing';
import {DisplayDateComponent} from '../src/display-date-component';

const test = it;

describe('display-date', () => {

    test('rendering', async () => {
        const el = await fixture(html`
            <display-date epochSeconds='1682344758'></display-date>
        `);

        assert.instanceOf(el, DisplayDateComponent);
        assert.lightDom.equal(el, '4/24/2023, 7:59:18 AM');
    });
});
