import { identifiers } from '../../common/common.js';

export const CreditAccountModel = {
  creditLineId: 'credit_line_id',
  primaryAccount: 'primary_account',
  sharedLimit: 'shared_limit',
  separateLimit: 'separate_limit',
  cutOffDay: 'cut_off_day',
  daysUntilDueDate: 'days_until_due_date',
};

export const CreditAccountFullModel = {
  ...identifiers,
  ...CreditAccountModel,
};
