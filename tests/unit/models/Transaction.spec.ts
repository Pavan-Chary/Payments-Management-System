import PaymentMethod from '@/components/models/PaymentMethod';
import Transaction from '@/components/models/Transaction';
import TransactionStatus from '@/components/models/TransactionStatus';

describe('Transaction Interface', () => {

  it('should create a valid transaction object with all required fields', () => {

    const testDate = new Date('2026-02-07');
    
    const newTransaction: Transaction = {
      paymentId: 'PAY-12345',
      userEmail: 'pavan@example.com',
      amount: 500.50,
      method: PaymentMethod.CREDIT_CARD,
      status:  TransactionStatus.COMPLETED,  
      createdAt: testDate
    };
    expect(newTransaction.paymentId).toBe('PAY-12345');
    expect(newTransaction.amount).toBe(500.50);
    expect(newTransaction.createdAt).toEqual(testDate);
  });

});