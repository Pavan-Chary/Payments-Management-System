<template>
  <div id="app" class="text-center font-serif bg-blend-color">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import Navbar from './components/Navbar.vue';
    import type User from './components/models/User';
    import UserRegistration from './components/UserRegistration.vue';
    import TransactionRegistration from './components/TransactionRegistration.vue';
    import TransactionView from './components/TransactionView.vue';


    export default defineComponent({

      //Components
      components:{
        Navbar, UserRegistration, TransactionRegistration, TransactionView
      },

      //Data
      data(){
        //initial data
        users:[] as User[]
        return{
          users:[] as User[]
        };
      },

      //Methods
      methods:{

      },

      //Computed
      computed:{
        retrieveUsers():User[]{
          return this.$store.getters.getUsers;
        }
      }

    });
</script>