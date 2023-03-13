import { identifiers } from '../../common/common.js';

export const DetailsModel = {
  name: 'name_',
  alias: 'nickname',
  abbreviation: 'abbreviation',
};

export const DetailsFullModel = {
  ...identifiers,
  ...DetailsModel,
};