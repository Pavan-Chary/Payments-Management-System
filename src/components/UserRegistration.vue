<template>
  <div class="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 font-sans">
    <div class="w-full max-w-xl bg-white shadow-md rounded-2xl border border-slate-200 overflow-hidden">

      <div class="bg-slate-50 px-8 py-10 border-b border-slate-100 text-center">
        <h1 class="text-2xl font-black text-slate-900 tracking-tight">User Registration</h1>
      </div>

      <div class="p-8 md:p-12">
        <div v-if="message"
          class="mb-8 p-4 rounded-xl border flex items-center justify-center transition-all duration-300"
          :class="message.includes('Successfully') ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'">
          <span class="text-sm font-black">{{ message }}</span>
        </div>

        <form @submit.prevent="handleFormSubmission()" class="space-y-8">

          <div class="relative">
            <label for="name" class="block text-s font-black uppercase text-slate-900 mb-2 ml-1">Full Name</label>
            <input id="name" v-model="form.name" type="text" placeholder="Enter your name"
              class="w-full px-4 py-4 bg-white border-2 border-slate-100 rounded-xl transition-all duration-200 outline-none placeholder:text-slate-400 font-bold text-slate-900"
              :class="error.name ? 'border-rose-500 focus:border-rose-500' : 'focus:border-slate-900'">
            <div v-if="error.name" class="text-rose-700 text-xs font-black mt-2 ml-1 italic">{{ error.name }}</div>
          </div>

          <div class="relative">
            <label for="email" class="block text-s font-black uppercase text-slate-900 mb-2 ml-1">Email</label>
            <input id="email" v-model="form.email" type="text" placeholder="Enter your email"
              class="w-full px-4 py-4 bg-white border-2 border-slate-100 rounded-xl transition-all duration-200 outline-none placeholder:text-slate-400 font-bold text-slate-900"
              :class="error.email ? 'border-rose-500 focus:border-rose-500' : 'focus:border-slate-900'">
            <div v-if="error.email" class="text-rose-700 text-xs font-black mt-2 ml-1 italic">{{ error.email }}</div>
          </div>

          <div class="pt-4">
            <button type="submit"
              class="w-full text-s bg-slate-900 text-white font-black py-5 px-6 rounded-xl hover:bg-slate-700 hover:shadow-md transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-slate-200">
              SUBMIT
            </button>
          </div>

        </form>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      form: {
        name: "",
        email: "",
      },
      error: {
        name: "",
        email: "",
      },
      message: "",
    };
  },
  methods: {
    validateForm(): boolean {
      const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      let errosFound = false;
      this.error.name = "";
      this.error.email = "";

      if (this.form.name === "") {
        this.error.name = "Name is required";
        errosFound = true;
      } else if (this.form.name.length < 2) {
        this.error.name = "Name should be at least three letters"
        errosFound = true;
      }
      if (this.form.email === "") {
        this.error.email = "Email is required";
        errosFound = true;
      } else if (!regex.test(this.form.email)) {
        this.error.email = "Please provide a valid email"
        errosFound = true;
      }

      return !errosFound;
    },
    setMessage(text: string) {
      this.message = text;
      setTimeout(() => this.message = "", 3000);
    },
    handleFormSubmission() {
      if (this.validateForm()) {
        try {
          this.form.email = this.form.email.toLowerCase();
          this.$store.commit('addUser', { userIdd: 1, ...this.form, isActive: true });
          this.setMessage("User Registered Successfully");
        } catch (e: unknown) {
          if (e instanceof (Error)) {
            this.setMessage("User Already exists")
          }
        }
      }
    }
  }
});
</script>