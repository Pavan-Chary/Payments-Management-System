<template>
  <div class="min-h-screen bg-slate-50 p-8 font-sans flex justify-center">
    <div v-if="!getTransaction"
      class="w-full max-w-2xl bg-white border-2 border-dashed border-slate-200 rounded-2xl p-20 text-center">
      <p class="text-slate-400 font-black uppercase tracking-widest">No Data Found!!!</p>
    </div>

    <div v-else class="w-full max-w-2xl bg-white shadow-md rounded-2xl border border-slate-200 overflow-hidden">

      <div class="bg-slate-50 px-8 py-10 border-b border-slate-100 flex justify-between items-end">
        <div>
          <h1 class="text-2xl font-black text-slate-900 tracking-tight">Payment</h1>
          <p class="text-slate-500 text-xs font-black uppercase tracking-widest mt-1">Detailed Record View</p>
        </div>
        <div class="text-right">
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-tighter">ID Reference</p>
          <p class="text-lg font-black text-slate-900">#{{ getTransaction.paymentId }}</p>
        </div>
      </div>

      <div class="p-8 md:p-12 space-y-6">

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p class="text-xs font-black text-slate-400 uppercase tracking-tighter mb-1">User Email</p>
            <p class="text-sm font-black text-slate-900">{{ getTransaction.userEmail }}</p>
          </div>
          <div>
            <p class="text-xs font-black text-slate-400 uppercase tracking-tighter mb-1">Payment Type</p>
            <p class="text-sm font-black text-slate-900">{{ getTransaction.method }}</p>
          </div>
          <div>
            <p class="text-xs font-black text-slate-400 uppercase tracking-tighter mb-1">Created On</p>
            <p class="text-sm font-black text-slate-900">{{ getTransaction.createdAt.toLocaleDateString() }}</p>
          </div>
          <div>
            <p class="text-xs font-black text-slate-400 uppercase tracking-tighter mb-1">Current Status</p>
            <span :class="{
              'px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border': true,
              'bg-emerald-50 text-emerald-700 border-emerald-200': getTransaction.status === 'Completed',
              'bg-amber-50 text-amber-700 border-amber-200': getTransaction.status === 'Pending',
              'bg-rose-50 text-rose-700 border-rose-200': getTransaction.status === 'Failed'
            }">
              {{ getTransaction.status }}
            </span>
          </div>
        </div>

        <div class="mt-12 pt-10 border-t border-slate-100">
          <p class="text-xs font-black text-slate-900 uppercase tracking-widest mb-4">Modify Payment Status</p>
          <div class="flex flex-col sm:flex-row gap-4">
            <select v-model="updatedStatus" id="paymentMethod" name="paymentMethod"
              class="flex-1 px-4 py-4 bg-white border-2 border-slate-100 rounded-xl outline-none focus:border-slate-900 font-black text-slate-900 text-sm appearance-none cursor-pointer">
              <option v-for="status in transactionStatusOptions" :key="status" :value="status">
                {{ status }}
              </option>
            </select>

            <button @click="handleUpdateStatus()"
              class="bg-slate-900 text-white px-8 py-4 rounded-xl font-black text-sm hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200 uppercase tracking-widest">
              Update
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type Transaction from './models/Transaction';
import TransactionStatus from './models/TransactionStatus';

export default defineComponent({
  data() {
    return {
      updatedStatus: TransactionStatus.PENDING,
      transactionStatusOptions: Object.values(TransactionStatus)
    };
  },
  methods: {
    handleUpdateStatus() {
      const transaction = this.getTransaction
      if (transaction) {
        transaction.status = this.updatedStatus
        this.$store.commit('updateTransaction', transaction)
      }
    }
  },
  props: {
    paymentId: {
      type: String,
      required: true,
      default: ""
    }
  },
  computed: {
    getTransaction(): Transaction | null {
      const transactions = this.$store.getters.getTransactions;
      const filteredTransactions = transactions.filter((transaction: Transaction) => transaction.paymentId === this.paymentId);
      if (filteredTransactions.length === 0) {
        return null
      }
      this.updatedStatus = filteredTransactions[0].status;
      return filteredTransactions[0]
    }
  },
});
</script>