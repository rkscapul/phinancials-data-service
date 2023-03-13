import { identifiers } from '../../common/common.js';

export const CreditLineModel = {
  bankId: 'bank_id',
  aamount: 'amount',
};

export const CreditLineFullModel = {
  ...identifiers,
  ...CreditLineModel,
};
