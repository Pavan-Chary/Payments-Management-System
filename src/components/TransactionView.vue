<template>

  <div class="min-h-screen bg-slate-50 p-8 font-sans">

    <div class="max-w-6xl mx-auto">
      
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-black text-slate-900 tracking-tight">Payments</h1>
          <p class="text-slate-500 text-xs font-black uppercase tracking-widest mt-1">Transaction Ledger</p>
        </div>
        <router-link 
          to="/payment-registration" 
          class="bg-slate-900 no-underline text-white px-6 py-3 rounded-xl font-black text-sm hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200 uppercase tracking-widest"
        >
          Register Payment
        </router-link>
      </div>

      <!-- Filters -->
       
      <div class="bg-white border border-slate-200 rounded-2xl p-6 mb-8 shadow-sm">
        <h2 class="text-xs font-black uppercase text-slate-400 tracking-widest mb-6 flex items-center">
          Refine Transactions
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="space-y-2">
            <label class="block text-[10px] font-black uppercase text-slate-900 ml-1">Min Amount</label>
            <input type="number" v-model="minAmount" @change="onFilterChange()" class="w-auto bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2 font-bold text-slate-900 text-sm focus:border-slate-900 outline-none transition-colors">
          </div>
          
          <div class="space-y-2">
            <label class="block text-[10px] font-black uppercase text-slate-900 ml-1">Max Amount</label>
            <input type="number" v-model="maxAmount" @change="onFilterChange()" class="w-auto bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2 font-bold text-slate-900 text-sm focus:border-slate-900 outline-none transition-colors">
          </div>

          <div class="space-y-2">
            <label class="block text-[10px] font-black uppercase text-slate-900 ml-1">Status</label>
            <select v-model="transactionStatus" @change="onFilterChange()" class="w-auto bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2 font-bold text-slate-900 text-sm focus:border-slate-900 outline-none transition-colors appearance-none cursor-pointer">
              <option value="">All Statuses</option>
              <option v-for="status in trasacationStatusOptions" :key="status" :value="status">{{ status }}</option>
            </select>
          </div>

          <div class="space-y-2">
            <label class="block text-[10px] font-black uppercase text-slate-900 ml-1">Payment Mode</label>
            <select v-model="paymentMethod" @change="onFilterChange()" class="w-auto bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2 font-bold text-slate-900 text-sm focus:border-slate-900 outline-none transition-colors appearance-none cursor-pointer">
              <option value="">All Methods</option>
              <option v-for="payment in paymentMethodOptions" :key="payment" :value="payment">{{ payment }}</option>
            </select>
          </div>

        </div>
      </div>

      <!-- Payments List -->

      <div class="space-y-3">
        <div class="px-6 py-3 flex text-[10px] font-black uppercase text-slate-400 tracking-widest">
          <span class="w-1/4">ID</span>
          <span class="w-1/4">Method</span>
          <span class="w-1/4 text-right pr-10">Amount</span>
          <span class="w-1/4">Status</span>
          <span class="w-20"></span>
        </div>

        <div v-if="getFilteredTransactionsLength === 0" class="bg-white border-2 border-dashed border-slate-200 rounded-2xl py-16 text-center">
          <p class="text-slate-400 font-black uppercase tracking-widest text-sm">No transactions found!!</p>
        </div>

        <div 
          v-for="transaction in filteredTransactions" 
          :key="transaction.paymentId"
          class="bg-white border-2 border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-900 transition-all duration-200 flex items-center group"
        >
          <span class="w-1/4 font-black text-slate-900 text-sm">#{{ transaction.paymentId }}</span>
          <span class="w-1/4 font-black text-slate-500 text-xs uppercase tracking-tighter">{{ transaction.method }}</span>
          <span class="w-1/4 text-right pr-10 font-black text-slate-900 text-sm">₹ {{ transaction.amount }}</span>
          
          <div class="w-1/4">
            <span :class="{
              'px-3 py-1 rounded-full text-[13px] font-black uppercase tracking-widest border': true,
              'bg-emerald-50 text-emerald-700 border-emerald-100': transaction.status === 'Completed',
              'bg-amber-50 text-amber-700 border-amber-100': transaction.status === 'Pending',
              'bg-rose-50 text-rose-700 border-rose-100': transaction.status === 'Failed',
              'bg-slate-50 text-slate-700 border-slate-100': transaction.status === 'Refunded'
            }">
              {{ transaction.status }}
            </span>
          </div>

          <div class="w-20 text-right">
            <button 
              @click="handleView(transaction.paymentId)"
              class="text-[14px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors"
            >
              View
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TransactionRegistration from './TransactionRegistration.vue';
import type Transaction from './models/Transaction';
import TransactionStatus from './models/TransactionStatus';
import PaymentMethod from './models/PaymentMethod';

export default defineComponent({
    data(){
        return{
            originalTransactions:[],
            toggleTransactionRegistration:false,
            filteredTransactions:[] as Transaction[],
            minAmount:0,
            maxAmount:100000000,
            transactionStatus:"",
            paymentMethod:"",
            trasacationStatusOptions:Object.values(TransactionStatus),
            paymentMethodOptions:Object.values(PaymentMethod)
        };
    },
    components:{
        TransactionRegistration
    },
    methods:{
         handleView(paymentId:string){
            this.$router.push("payments/"+paymentId)
         },
         handleToggleUserRegisteration(){
            this.toggleTransactionRegistration=!this.toggleTransactionRegistration;
         },
         onFilterChange(){
            if(this.minAmount>this.maxAmount){
                this.minAmount=0;
            }
            this.filteredTransactions=this.originalTransactions.filter((transaction:Transaction)=>{
                if(transaction.amount<this.minAmount || transaction.amount>this.maxAmount){
                    return false;
                }
                if(this.transactionStatus!=="" && transaction.status!=this.transactionStatus){
                    return false;
                }
                if(this.paymentMethod!=="" && transaction.method!=this.paymentMethod){
                    return false;
                }
                return true;
            })
         }
    },
    computed:{
        getAllTransactions(){
            this.originalTransactions = this.$store.getters.getTransactions;
            this.filteredTransactions = this.originalTransactions;
        },
        getFilteredTransactionsLength():number{
            this.getAllTransactions;
            return this.filteredTransactions.length;
        }
    }
});
</script>