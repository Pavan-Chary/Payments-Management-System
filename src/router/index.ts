import Home from '@/components/Home.vue'
import IndividualTransactionView from '@/components/IndividualTransactionView.vue'
import TransactionView from '@/components/TransactionView.vue'
import UsersView from '@/components/UsersView.vue'
import UserRegistration from '@/components/UserRegistration.vue'
import TransactionRegistration from '@/components/TransactionRegistration.vue'

import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/users',
      name: 'UsersView',
      component: UsersView
    },
    {
      path: '/payments',
      name: 'TransactionView',
      component: TransactionView
    },
    {
      path: '/payments/:paymentId',
      name: 'IndividualTransactionView',
      component: IndividualTransactionView,
      props: true
    },
    {
      path: '/payment-registration',
      name: 'TransactionRegistration',
      component: TransactionRegistration,
    },
    {
      path: '/user-registration',
      name: 'UserRegistration',
      component: UserRegistration,
    }
  ],
})

export default router
