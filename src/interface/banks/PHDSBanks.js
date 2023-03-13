import { BankDetailsTable } from '../../database/banks/details/table.js';

export class PHDSBanks {
  constructor(logging, database) {
    this.logging = logging;
    this.database = database;
    this.banks = new BankDetailsTable();
  }

  async getBankList() {
    const connection = this.database.getConfig();
    return await connection.transaction(async trx => {
      const bankList = await this.banks.getBanks(trx);

      return { code: 200, data: bankList };
    }).finally(() => connection.destroy());
  }

  async getBankListWithId() {
    const connection = this.database.getConfig();
    return await connection.transaction(async trx => {
      const bankList = await this.banks.getBanks(trx);

      return { code: 200, data: bankList };
    }).finally(() => connection.destroy());
  }
}