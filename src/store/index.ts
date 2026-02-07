import { createStore } from "vuex";
import type User from "@/components/models/User";
import type Transaction from "@/components/models/Transaction";
import TransactionStatus from "@/components/models/TransactionStatus";
import PaymentMethod from "@/components/models/PaymentMethod";


export default createStore({

    //State
    state: {
        currentUserId: 120,
        currentTransactionId: 600,

        users: [
            {
                userId: 101,
                name: "Anvitha Rao",
                email: "anvitha.rao@hydmail.in",
                isActive: true
            } as User,
            {
                userId: 102,
                name: "Srinivas Reddy",
                email: "s.reddy@telanganapay.com",
                isActive: true
            } as User,
            {
                userId: 103,
                name: "Mohammed Osman",
                email: "osman.pasha@charminar.org",
                isActive: false
            } as User,
            {
                userId: 104,
                name: "Kavitha Goud",
                email: "kavitha.g@warangal-fin.co",
                isActive: true
            } as User
        ] as User[],

        transactions: [
            {
                paymentId: "TXN-5001A",
                userEmail: "anvitha.rao@hydmail.in",
                amount: 25000.00,
                method: PaymentMethod.UPI,
                status: TransactionStatus.COMPLETED,
                createdAt: new Date(2026, 1, 1, 10, 30)
            },
            {
                paymentId: "TXN-5002B",
                userEmail: "s.reddy@telanganapay.com",
                amount: 1500.50,
                method: PaymentMethod.NET_BANKING,
                status: TransactionStatus.PENDING,
                createdAt: new Date(2026, 1, 2, 14, 15)
            },
            {
                paymentId: "TXN-5003C",
                userEmail: "anvitha.rao@hydmail.in",
                amount: 500.00,
                method: PaymentMethod.UPI,
                status: TransactionStatus.REFUNDED,
                createdAt: new Date(2026, 1, 3, 9, 0)
            },
            {
                paymentId: "TXN-5004D",
                userEmail: "osman.pasha@charminar.org",
                amount: 12000.00,
                method: PaymentMethod.CREDIT_CARD,
                status: TransactionStatus.FAILED,
                createdAt: new Date(2026, 1, 4, 16, 45)
            },
            {
                paymentId: "TXN-5005E",
                userEmail: "kavitha.g@warangal-fin.co",
                amount: 850.00,
                method: PaymentMethod.UPI,
                status: TransactionStatus.COMPLETED,
                createdAt: new Date(2026, 1, 4, 18, 20)
            }
        ] as Transaction[]

    },

    //Getters
    getters: {

        getUsers(state: any) {
            return state.users;
        },

        getTransactions(state: any) {
            return state.transactions;
        }


    },

    //Mutations => commits
    mutations: {

        addUser(state: any, user: User) {

            user.userId = state.currentUserId;
            state.currentUserId++;
            const filteredUsers = state.users.filter((_user: User) => _user.email === user.email);
            if (filteredUsers.length != 0) { throw Error("User Already exists"); }
            state.users.push(user);

        },

        addTransaction(state: any, transaction: Transaction) {

            const filteredTransactions = state.transactions.filter(
                (_transaction: Transaction) => _transaction.paymentId === transaction.paymentId
            )
            if (filteredTransactions.length != 0) {
                throw Error("Transaction Already exists");
            }

            state.transactions.push(transaction);

        },


        updateTransaction(state: any, transaction: Transaction) {

            for (let currentTransaction of state.transactions) {
                if (currentTransaction.paymentId == transaction.paymentId) {
                    currentTransaction.status = transaction.status;
                }
            }
        }
    }
})