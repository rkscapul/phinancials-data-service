import { TransactionTypeModel } from './model.js';

export class TransactionTypeTable {
  constructor () {}

	async getTransactionTypes(transaction) {
		return await transaction
			.select(TransactionTypeModel)
			.table('type')
			.withSchema('transactions')
	}
}
