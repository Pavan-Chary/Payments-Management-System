import { shallowMount } from '@vue/test-utils';
import UserList from '@/components/UsersView.vue';
import type User from '@/components/models/User';

describe('UserList.vue', () => {
    let mockStore: any;

    const mockUsers: User[] = [
        { userId: 101, name: 'Anvitha Rao', email: 'anvitha@test.com', isActive: true },
        { userId: 102, name: 'Srinivas Reddy', email: 'srinivas@test.com', isActive: true }
    ];

    beforeEach(() => {
        mockStore = {
            getters: {
                getUsers: mockUsers
            }
        };
    });

    it('renders a list item for each user in the store', () => {
        const wrapper = shallowMount(UserList, {
            global: {
                mocks: { $store: mockStore },
                stubs: ['router-link']
            }
        });

        expect(wrapper.text()).toContain('Anvitha Rao');
        expect(wrapper.text()).toContain('Srinivas Reddy');

        const userBlocks = wrapper.findAll('.bg-white.border-2');
        expect(userBlocks.length).toBe(2);
    });

    it('shows the empty state message when no users exist', () => {

        mockStore.getters.getUsers = [];

        const wrapper = shallowMount(UserList, {
            global: {
                mocks: { $store: mockStore },
                stubs: ['router-link']
            }
        });

        expect(wrapper.text()).toContain('No users found in system');

        expect(wrapper.find('.group').exists()).toBe(false);
    });

    it('has a "Register User" link pointing to the correct route', () => {
        const wrapper = shallowMount(UserList, {
            global: {
                mocks: { $store: mockStore },
                stubs: ['router-link']
            }
        });

        const registerLink = wrapper.find('router-link-stub');
        expect(registerLink.attributes('to')).toBe('/user-registration');
    });
});