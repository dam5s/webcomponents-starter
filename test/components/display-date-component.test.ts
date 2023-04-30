import {assert, fixture, html} from '@open-wc/testing';
import {DisplayDateComponent} from '../../src/components/display-date-component';


describe('display-date', () => {
    const test = it;

    test('rendering', async () => {
        const el = await fixture(html`
            <display-date epoch-seconds='1682344758'></display-date>
        `);

        assert.instanceOf(el, DisplayDateComponent);
        assert.lightDom.equal(el, '4/24/2023, 7:59:18 AM');
    });
});
