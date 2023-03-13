import { DatabaseController } from '../controllers/database.js';

import { PHDSBanks } from '../interface/banks/PHDSBanks.js';
import { PHDSTransactions } from '../interface/transactions/PHDSTransactions.js'
import { PHDSCredit } from '../interface/credit/PHDSCredit.js';

import { PhinancialsDataService } from '../service/PhinancialsDataService.js';

import { logging } from '../controllers/logging.cjs';

const database = new DatabaseController({ connectionString: process.env.POSTGRES_URI });
const phdsBanks = new PHDSBanks(logging, database);
const phdsTransactions = new PHDSTransactions(logging, database);
const phdsCredit = new PHDSCredit(logging, database);

const phinancialsDataService = new PhinancialsDataService(
  process.env.SERVICE_PORT, 
  { logging },
  {
    phdsBanks,
    phdsTransactions,
    phdsCredit,
  },
);

phinancialsDataService.start();