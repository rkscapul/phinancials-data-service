import { DetailsFullModel, DetailsModel } from './model.js';

export class BankDetailsTable {
  constructor () {}

	async getBanks(transaction) {
		return await transaction
			.select(DetailsModel)
			.table('details')
			.withSchema('bank')
	}
}