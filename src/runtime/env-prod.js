import { PhinancialsDataService } from '../service/PhinancialsDataService.js';

import { logging } from '../controllers/logging.cjs';

const phinancialsDataService = new PhinancialsDataService(process.env.SERVICE_PORT, logging);

phinancialsDataService.start();