import { shallowMount } from '@vue/test-utils';
import PaymentsList from '@/components/TransactionView.vue';
import TransactionStatus from '@/components/models/TransactionStatus';
import PaymentMethod from '@/components/models/PaymentMethod';

describe('PaymentsList.vue', () => {
    let mockStore: any;
    let mockRouter: any;

    const mockTransactions = [
        { paymentId: 'TXN-1', amount: 100, status: TransactionStatus.COMPLETED, method: PaymentMethod.UPI },
        { paymentId: 'TXN-2', amount: 500, status: TransactionStatus.PENDING, method: PaymentMethod.NET_BANKING },
        { paymentId: 'TXN-3', amount: 1000, status: TransactionStatus.FAILED, method: PaymentMethod.CREDIT_CARD }
    ];

    beforeEach(() => {
        mockStore = {
            getters: { getTransactions: mockTransactions }
        };
        mockRouter = {
            push: jest.fn()
        };
    });

    it('renders all transactions from the store initially', () => {
        const wrapper = shallowMount(PaymentsList, {
            global: {
                mocks: { $store: mockStore, $router: mockRouter },
                stubs: ['router-link']
            }
        });

        expect(wrapper.text()).toContain('#TXN-1');
        expect(wrapper.text()).toContain('#TXN-2');
        expect(wrapper.text()).toContain('#TXN-3');
    });
    it('filters transactions when status is changed', async () => {
        const wrapper = shallowMount(PaymentsList, {
            global: {
                mocks: { $store: mockStore, $router: mockRouter },
                stubs: ['router-link']
            }
        });

        const statusSelect = wrapper.findAll('select')[0];
        await statusSelect.setValue(TransactionStatus.COMPLETED);

        await statusSelect.trigger('change');

        expect(wrapper.text()).toContain('#TXN-1');
        expect(wrapper.text()).not.toContain('#TXN-2');
    });

    it('filters transactions based on min/max amount', async () => {
        const wrapper = shallowMount(PaymentsList, {
            global: {
                mocks: { $store: mockStore, $router: mockRouter },
                stubs: ['router-link']
            }
        });

        const minInput = wrapper.find('input[type="number"]');
        await minInput.setValue(600);
        await minInput.trigger('change');

        expect(wrapper.text()).toContain('#TXN-3');
        expect(wrapper.text()).not.toContain('#TXN-1');
    });
});