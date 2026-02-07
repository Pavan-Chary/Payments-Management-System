<template>
  <div class="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 font-sans">
    <div class="w-full max-w-xl bg-white shadow-md rounded-2xl border border-slate-200 overflow-hidden">
      
      <div class="bg-slate-50 px-8 py-10 border-b border-slate-100 text-center">
        <h1 class="text-2xl font-black text-slate-900 tracking-tight">Transaction Registration</h1>
      </div>

      <div class="p-8 md:p-12">
        <div v-if="message" 
             class="mb-8 p-4 rounded-xl border flex items-center justify-center transition-all duration-300 bg-rose-50 border-rose-200 text-rose-900">
          <span class="text-sm font-black">{{ message }}</span>
        </div>

        <form @submit.prevent="handleFormSubmit()" class="space-y-6">

          <div class="relative">
            <label for="transactionId" class="block text-xs font-black uppercase text-slate-900 mb-2 ml-1">Transaction ID</label>
            <input 
              required
              id="transactionId" 
              type="text" 
              v-model="form.transactionId"
              placeholder="e.g. TXN9901"
              class="w-full px-4 py-3 bg-white border-2 border-slate-100 rounded-xl outline-none focus:border-slate-900 font-bold text-slate-900 text-sm"
              :class="{'border-rose-500': formError.transactionId}"
            >
            <div v-if="formError.transactionId" class="text-rose-700 text-[10px] font-black mt-1 ml-1 uppercase italic">{{ formError.transactionId }}</div>
          </div>

          <div class="relative">
            <label for="useEmail" class="block text-xs font-black uppercase text-slate-900 mb-2 ml-1">User Email ID</label>
            <input 
              required
              id="useEmail" 
              type="text" 
              v-model="form.userEmail"
              placeholder="customer@domain.com"
              class="w-full px-4 py-3 bg-white border-2 border-slate-100 rounded-xl outline-none focus:border-slate-900 font-bold text-slate-900 text-sm"
              :class="{'border-rose-500': formError.userEmail}"
            >
            <div v-if="formError.userEmail" class="text-rose-700 text-[10px] font-black mt-1 ml-1 uppercase italic">{{ formError.userEmail }}</div>
          </div>

          <div class="relative">
            <label for="amount" class="block text-xs font-black uppercase text-slate-900 mb-2 ml-1">Amount</label>
            <input 
              required
              id="amount" 
              type="number" 
              v-model="form.amount"
              class="w-full px-4 py-3 bg-white border-2 border-slate-100 rounded-xl outline-none focus:border-slate-900 font-bold text-slate-900 text-sm"
              :class="{'border-rose-500': formError.amount}"
            >
            <div v-if="formError.amount" class="text-rose-700 text-[10px] font-black mt-1 ml-1 uppercase italic">{{ formError.amount }}</div>
          </div>

          <div class="relative">
            <label for="paymentMethod" class="block text-xs font-black uppercase text-slate-900 mb-2 ml-1">Payment Method</label>
            <select 
              v-model="form.category"  
              id="paymentMethod" 
              name="paymentMethod"
              class="w-full px-4 py-3 bg-white border-2 border-slate-100 rounded-xl outline-none focus:border-slate-900 font-black text-slate-900 text-sm appearance-none cursor-pointer"
            >
              <option v-for="payment in paymentMethodOptions" :key="payment" :value="payment">
                {{ payment }}
              </option>
            </select>
          </div>

          <div class="pt-6">
            <button 
              type="submit"
              class="w-full bg-slate-900 text-white font-black py-4 px-6 rounded-xl hover:bg-slate-800 transition-all duration-300 transform active:scale-[0.98] shadow-lg shadow-slate-200 uppercase tracking-widest text-sm"
            >
              Submit Transaction
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type Transaction from './models/Transaction';
import TransactionStatus from './models/TransactionStatus';
import PaymentMethod from './models/PaymentMethod';

export default defineComponent({
    data(){
       const trasacationStatusOptions = Object.values(TransactionStatus)
       const paymentMethodOptions = Object.values(PaymentMethod)
    return{
        trasacationStatusOptions,
        paymentMethodOptions,
        message:"",
        form:{
            transactionId:"",
            userEmail:"",
            amount:0,
            category:paymentMethodOptions[0],
            status:trasacationStatusOptions[0],
            createdAt: new Date()
        },
        formError:{
            transactionId:"",
            userEmail:"",
            amount:"",
            category:"",
            status:"",
            createdAt:""
        },
    };
    },
    methods:{
        setMessage(text:string){
            this.message=text;
        },
        validateForm(){
            const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
            let noErrors=true;
            
            this.formError.transactionId = "";
            this.formError.userEmail = "";
            this.formError.amount = "";

            if(this.form.transactionId.length<2){
                this.formError.transactionId="Enter a valid transaction ID"
                noErrors=false;
            }
            if(!regex.test(this.form.userEmail)){
                this.formError.userEmail="Please provide a valid email"
                noErrors=false;
            }
            if(this.form.amount<=0){
                this.formError.amount="Amount should be greater than zero"
                noErrors=false;
            }
            return noErrors;
        }, 
        handleFormSubmit(){
            if(this.validateForm()){
                this.form.createdAt = new Date();
                this.$store.commit('addTransaction', this.form);
                this.message = ""; 
            }else{
                this.setMessage("Transaction has been already recorded")
            }
        }
    }
});
</script>