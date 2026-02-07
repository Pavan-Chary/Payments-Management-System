import { shallowMount } from '@vue/test-utils';
import TransactionRegistration from '@/components/TransactionRegistration.vue';
import PaymentMethod from '@/components/models/PaymentMethod';

describe('TransactionRegistration.vue', () => {
    let mockStore: any;

    beforeEach(() => {
        mockStore = {
            commit: jest.fn()
        };
    });

    it('renders the form with default values', () => {
        const wrapper = shallowMount(TransactionRegistration, {
            global: { mocks: { $store: mockStore } }
        });

        expect(wrapper.find('h1').text()).toBe('Transaction Registration');
        expect(wrapper.find('button[type="submit"]').exists()).toBe(true);

    });


    it('shows error message when email is invalid', async () => {
        const wrapper = shallowMount(TransactionRegistration, {
            global: { mocks: { $store: mockStore } }
        });


        const emailInput = wrapper.find('#useEmail');
        await emailInput.setValue('invalid-email');
        await wrapper.find('form').trigger('submit.prevent');


        expect(wrapper.text()).toContain('Please provide a valid email');
        expect(mockStore.commit).not.toHaveBeenCalled();
    });


    it('shows error when amount is zero or negative', async () => {
        const wrapper = shallowMount(TransactionRegistration, {
            global: { mocks: { $store: mockStore } }
        });

        await wrapper.find('#amount').setValue(0);
        await wrapper.find('form').trigger('submit.prevent');

        expect(wrapper.text()).toContain('Amount should be greater than zero');
    });


    it('commits to store when form is valid', async () => {

        const wrapper = shallowMount(TransactionRegistration, {
            global: { mocks: { $store: mockStore } }
        });


        await wrapper.find('#transactionId').setValue('TXN123');
        await wrapper.find('#useEmail').setValue('pavan@test.com');
        await wrapper.find('#amount').setValue(500);

        await wrapper.find('form').trigger('submit.prevent');

        expect(mockStore.commit).toHaveBeenCalledWith('addTransaction', expect.objectContaining({
            transactionId: 'TXN123',
            userEmail: 'pavan@test.com',
            amount: 500
        }));
    });
});