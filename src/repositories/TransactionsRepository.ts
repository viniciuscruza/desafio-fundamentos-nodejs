import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Extract {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Extract {
    const transactions = this.transactions;
    const balance = this.getBalance();
    return {transactions, balance};
  }

  public getBalance(): Balance {
    const income: number = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((sum, record) => { return sum + record.value }, 0);

    const outcome: number = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((sum, record) => { return sum + record.value }, 0);

    const total = income - outcome;

    return ({ income, outcome, total });
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
