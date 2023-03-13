import { TransactionTypeTable } from '../../database/transactions/type/table.js';

export class PHDSTransactions {
  constructor(logging, database) {
    this.logging = logging;
    this.database = database;
    this.transactions = new TransactionTypeTable();
  }

  async getTransactionTypes() {
    const connection = this.database.getConfig();
    return await connection.transaction(async trx => {
      const transactionTypes = await this.transactions.getTransactionTypes(trx);

      return { code: 200, data: transactionTypes };
    }).finally(() => connection.destroy());
  }
}