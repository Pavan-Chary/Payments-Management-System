import { shallowMount } from '@vue/test-utils';
import IndividualTransactionView from '@/components/IndividualTransactionView.vue';
import TransactionStatus from '@/components/models/TransactionStatus';

describe('TransactionView.vue', () => {
    let mockStore: any;

    beforeEach(() => {
        mockStore = {
            getters: {
                getTransactions: [
                    {
                        paymentId: 'TXN-100',
                        userEmail: 'pavan@test.com',
                        amount: 500,
                        method: 'UPI',
                        status: TransactionStatus.PENDING,
                        createdAt: new Date('2026-02-07')
                    }
                ]
            },
            commit: jest.fn()
        };
    });

    it('renders "No Data Found" when paymentId does not exist', () => {
        const wrapper = shallowMount(IndividualTransactionView, {
            props: { paymentId: 'NON-EXISTENT' },
            global: {
                mocks: { $store: mockStore }
            }
        });

        expect(wrapper.text()).toContain('No Data Found!!!');
    });

    it('renders transaction details correctly when data exists', () => {
        const wrapper = shallowMount(IndividualTransactionView, {
            props: { paymentId: 'TXN-100' },
            global: {
                mocks: { $store: mockStore }
            }
        });

        expect(wrapper.find('h1').text()).toBe('Payment');
        expect(wrapper.text()).toContain('TXN-100');
        expect(wrapper.text()).toContain('pavan@test.com');

    });

    it('calls store commit when the update button is clicked', async () => {
        const wrapper = shallowMount(IndividualTransactionView, {
            props: { paymentId: 'TXN-100' },
            global: {
                mocks: { $store: mockStore }
            }
        });

        const select = wrapper.find('select');
        await select.setValue(TransactionStatus.COMPLETED);

        await wrapper.find('button').trigger('click');

        expect(mockStore.commit).toHaveBeenCalledWith('updateTransaction', expect.objectContaining({
            paymentId: 'TXN-100',
            status: TransactionStatus.COMPLETED
        }));

    });
});