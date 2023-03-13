import { CreditLineModel, CreditLineFullModel } from './model.js';

export class CreditLineTable {
  constructor () {}

	async getCreditLine(transaction) {
		return await transaction
			.select(CreditLineModel)
			.table('line')
			.withSchema('credit');
	}

	async getCreditLineIdsByBankId(transaction, bankId) {
		return await transaction
			.select('id')
			.table('line')
			.withSchema('credit')
			.where('bank_id', bankId)
			.then((results) => results.map((record) => record.id));
	}

	async getCreditLineByBankId(transaction, bankId) {
		return await transaction
			.select(CreditLineFullModel)
			.table('line')
			.withSchema('credit')
			.whereIn('bank_id', bankId);	
	}

	async insertCreditLineReturningIdAndUuid(transaction, payload) {
		return await transaction
			.insert(payload, ['id', 'uuid'])
			.into('line').withSchema('credit')
	}
}
