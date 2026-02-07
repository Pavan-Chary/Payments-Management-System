import { shallowMount } from '@vue/test-utils';
import UserRegistration from '@/components/UserRegistration.vue';

describe('UserRegistration.vue', () => {
  let mockStore: any;

  beforeEach(() => {
    mockStore = {
      commit: jest.fn()
    };
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

 
  it('shows required error messages when fields are empty', async () => {
    const wrapper = shallowMount(UserRegistration, {
      global: { mocks: { $store: mockStore } }
    });

    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.text()).toContain('Name is required');
    expect(wrapper.text()).toContain('Email is required');
    expect(mockStore.commit).not.toHaveBeenCalled();
  });

  
  it('shows error when name is too short', async () => {
    const wrapper = shallowMount(UserRegistration, {
      global: { mocks: { $store: mockStore } }
    });

    await wrapper.find('#name').setValue('A');
    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.text()).toContain('Name should be at least three letters');
  });

 
  it('commits to store and shows success message on valid input', async () => {
    const wrapper = shallowMount(UserRegistration, {
      global: { mocks: { $store: mockStore } }
    });

    await wrapper.find('#name').setValue('Pavan');
    await wrapper.find('#email').setValue('PAVAN@TEST.COM');
    
    await wrapper.find('form').trigger('submit.prevent');

    expect(mockStore.commit).toHaveBeenCalledWith('addUser', expect.objectContaining({
      name: 'Pavan',
      email: 'pavan@test.com'
    }));

    expect(wrapper.text()).toContain('User Registered Successfully');
 
  });

  it('shows error message when the store throws an error', async () => {
  
    mockStore.commit.mockImplementation(() => {
      throw new Error('User Already exists');
    });

    const wrapper = shallowMount(UserRegistration, {
      global: { mocks: { $store: mockStore } }
    });

    await wrapper.find('#name').setValue('Pavan');
    await wrapper.find('#email').setValue('pavan@test.com');
    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.text()).toContain('User Already exists');
    
  });
});