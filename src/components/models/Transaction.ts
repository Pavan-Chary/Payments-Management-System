import type PaymentMethod from "./PaymentMethod";
import type TransactionStatus from "./TransactionStatus";

export default interface Transaction{
    paymentId:string,
    userEmail:string,
    amount:number,
    method:PaymentMethod,
    status:TransactionStatus,
    createdAt: Date;
}