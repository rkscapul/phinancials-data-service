import { CreditAccountModel, CreditAccountFullModel } from './model.js';

export class CreditAccountTable {
  constructor () {}

	async getCreditAccounts(transaction) {
		return await transaction
			.select(CreditAccountModel)
			.table('account')
			.withSchema('credit');
	}

	async getCreditAccountByCreditLineId(transaction, creditLineId) {
		return await transaction
			.select(CreditAccountFullModel)
			.table('account')
			.withSchema('credit')
			.whereIn ('credit_line_id', creditLineId);
	}

	async getCreditAccountById(transaction, id) {
		return await transaction
			.select(CreditAccountFullModel)
			.table('account')
			.withSchema('credit')
			.where('id', id);
	}

	async insertCreditAccountReturningIdAndUuid(transaction, payload) {
		return await transaction
			.insert(payload, ['id', 'uuid'])
			.into('account').withSchema('credit')
	}
}
