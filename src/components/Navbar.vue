<template>
  <nav class="bg-white border-b border-slate-200 px-8 py-4 font-sans sticky top-0 z-50 shadow-sm shadow-purple-300">
    <div class="max-w-7xl mx-auto flex flex-row justify-between items-center">

      <div class="flex items-center ">
        <router-link to="/"
          class=" text-2xl font-black text-purple-500 tracking-tighter hover:opacity-80 transition-opacity no-underline">
          Zeta PMS
        </router-link>
      </div>

      <div class="flex flex-row items-center space-x-8">

        <router-link to="/"
          class="text-s font-black uppercase tracking-widest text-slate-900 hover:text-slate-500 transition-colors no-underline"
          active-class="border-b-2 border-slate-900 pb-1">
          Home
        </router-link>

        <router-link to="/users"
          class="text-s font-black uppercase tracking-widest text-slate-900 hover:text-slate-500 transition-colors no-underline"
          active-class="border-b-2 border-slate-900 pb-1">
          Users
        </router-link>

        <router-link to="/payments"
          class="text-s font-black uppercase tracking-widest text-slate-900 hover:text-slate-500 transition-colors no-underline"
          active-class="border-b-2 border-slate-900 pb-1">
          Payments
        </router-link>
      </div>

    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {};
  }
});
</script>