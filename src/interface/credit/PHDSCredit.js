import { generateUuid } from '../../helpers/uuid.js';

import { CreditLineTable } from '../../database/credit/line/table.js';
import { CreditAccountTable } from '../../database/credit/account/table.js';

export class PHDSCredit {
  constructor(logging, database) {
    this.logging = logging;
    this.database = database;
    this.credit = new CreditLineTable();
    this.account = new CreditAccountTable();
  }

  async getCreditLine(bankId = '') {
    const connection = this.database.getConfig();
    return await connection.transaction(async trx => {
      let creditLine;
      let code;
      
      if (bankId) {
        creditLine = await this.credit.getCreditLineByBankId(trx, bankId);
      } else {
        creditLine = await this.credit.getCreditLine(trx);
      }

      if (creditLine.data) {
        code = 200;
      } else {
        code = 404;
      }

      return { code, data: creditLine };
    }).finally(() => connection.destroy());
  }

  async createCreditLine(payload) {
    const connection = this.database.getConfig();
    const { bankId: bank_id, amount } = payload;

    return await connection.transaction(async trx => {
      const creditLineIdentifer = await this.credit.insertCreditLineReturningIdAndUuid(trx, {
        uuid: generateUuid(),
        bank_id,
        amount
      });

      return { code: 200, data: creditLineIdentifer };
    });
  }

  async getCreditAccount({ bankId, accountId }) {
    const connection = this.database.getConfig();
    return await connection.transaction(async trx => {
      let creditAccount;
      let code;
      
      if (bankId && !accountId) {
        const creditLineIds = await this.credit.getCreditLineIdsByBankId(trx, bankId);

        creditAccount = await this.account.getCreditAccountByCreditLineId(trx, creditLineIds);
      }

      if (accountId && !bankId) {
        creditAccount = await this.account.getCreditAccountById(trx, accountId);
      }

      if (!bankId && !accountId || bankId && accountId) {
        creditAccount = await this.account.getCreditAccounts(trx);
      }

      if (creditAccount.data) {
        code = 200;
      } else {
        code = 404;
      }

      return { code, data: creditAccount };
    }).finally(() => connection.destroy());
  }

  async insertCreditAccount(payload) {
    const connection = this.database.getConfig();
    const {
      creditLineId: credit_line_id,
      isPrimaryAccount: primary_account,
      isSharedLimit: shared_limit,
      isSeparateLimit: separate_limit,
      cutOffDay: cut_off_day,
      daysUntilDueDate: days_until_due_date,
      accountName: account_name,
    } = payload;

    return await connection.transaction(async trx => {
      const accountIdentifier = await this.account.insertCreditAccountReturningIdAndUuid(
        trx,
        {
          uuid: generateUuid(),
          credit_line_id,
          primary_account,
          shared_limit,
          separate_limit,
          cut_off_day,
          days_until_due_date,
          account_name,
        }
      );

      return { code: 200, data: accountIdentifier };
    });
  }
}