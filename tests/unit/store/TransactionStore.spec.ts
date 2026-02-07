import store from "@/store";
import TransactionStatus from "@/components/models/TransactionStatus";
import PaymentMethod from "@/components/models/PaymentMethod";
import type Transaction from "@/components/models/Transaction";

describe("Vuex Store - Transaction Operations", () => {

 
  it("should add a new transaction successfully", () => {
    
    const initialCount = store.getters.getTransactions.length;
    const newTxn: Transaction = {
      paymentId: "TXN-9999Z",
      userEmail: "user@test.com",
      amount: 1000.00,
      method: PaymentMethod.UPI,
      status: TransactionStatus.PENDING,
      createdAt: new Date()
    };

    store.commit("addTransaction", newTxn);

    const transactions = store.getters.getTransactions;
    expect(transactions.length).toBe(initialCount + 1);
    expect(transactions[transactions.length - 1].paymentId).toBe("TXN-9999Z");

  });

  it("should throw an error when adding a transaction with an existing paymentId", () => {

    const duplicateTxn: Transaction = {
      paymentId: "TXN-5001A",
      userEmail: "test@test.com",
      amount: 10.00,
      method: PaymentMethod.UPI,
      status: TransactionStatus.COMPLETED,
      createdAt: new Date()
    };
    expect(() => {
      store.commit("addTransaction", duplicateTxn);
    }).toThrow("Transaction Already exists");
  });

  it("should update the status of an existing transaction", () => {
    
    const updatePayload: Transaction = {
      paymentId: "TXN-5002B",
      status: TransactionStatus.COMPLETED,
      
    } as Transaction;

    store.commit("updateTransaction", updatePayload);

    const transactions = store.getters.getTransactions;
    const updated = transactions.find((t: Transaction) => t.paymentId === "TXN-5002B");
    
    expect(updated).toBeDefined();
    expect(updated?.status).toBe(TransactionStatus.COMPLETED);
  });

});