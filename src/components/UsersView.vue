<template>
  <div class="min-h-screen bg-slate-50 p-8 font-sans">
    <div class="max-w-4xl mx-auto">

      <div class="flex justify-between items-center mb-10 pb-6 border-b border-slate-200">
        <div>
          <h1 class="text-3xl font-black text-slate-900 tracking-tight">Users</h1>
          <p class="text-slate-500 text-xs font-black uppercase tracking-widest mt-1">Management Directory</p>
        </div>

        <router-link to="/user-registration"
          class="bg-slate-900 no-underline text-white px-6 py-3 rounded-xl font-black text-sm hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200 uppercase tracking-wider">
          Register User
        </router-link>
      </div>

      <div class="space-y-4">
        <div v-for="user in retriveUsers" :key="user.email"
          class="bg-white border-2 border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-900 transition-all duration-200 flex items-center justify-between group">
          <div class="flex items-center space-x-6">

            <div>
              <p class="text-xs font-black text-slate-400 uppercase tracking-tighter mb-0.5">Full Name</p>
              <p class="text-lg font-black text-slate-900 leading-tight">{{ user.name }}</p>
            </div>
          </div>

          <div class="text-right">
            <p class="text-xs font-black text-slate-400 uppercase tracking-tighter mb-0.5">Email Address</p>
            <p class="text-sm font-black text-slate-900">{{ user.email }}</p>
          </div>
        </div>

        <div v-if="retriveUsers.length === 0"
          class="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
          <p class="text-slate-400 font-black uppercase tracking-widest text-sm">No users found in system</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserRegistration from './UserRegistration.vue';
import User from './models/User';

export default defineComponent({
  data() {
    return {
      toggleUserRegistraion: false
    };
  },
  methods: {
    handleToggleAddUser() {
      this.toggleUserRegistraion = !this.toggleUserRegistraion;
    }
  },
  computed: {
    retriveUsers(): User[] {
      return this.$store.getters.getUsers;
    }
  },
  components: {
    UserRegistration
  }
});
</script>