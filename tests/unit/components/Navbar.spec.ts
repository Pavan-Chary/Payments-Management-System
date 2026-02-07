import { shallowMount } from '@vue/test-utils';
import Navbar from '@/components/Navbar.vue'; // Adjust path to where your Navbar is

describe('Navbar.vue', () => {

    it('has links pointing to the correct routes', () => {
        const wrapper = shallowMount(Navbar, {
            global: {
                stubs: ['router-link']
            }
        });

        const links = wrapper.findAll('router-link-stub');

        expect(links[1].attributes('to')).toBe('/');
        expect(links[2].attributes('to')).toBe('/users');
        expect(links[3].attributes('to')).toBe('/payments');
    });

});