import express, { json } from 'express';

export class PhinancialsDataService {
  constructor (port, { logging }, schemas) {
    this.api = express();
    this.port = port || 4500;
    this.logging = logging;

    this.schemas = schemas;
  }

  setup() {
    this.api.use(json());

    this.api.get('/', (req, res) => {
      res.send({ message: 'Hello world' });
    });

    this.api.get('/api/banks/list', async (req, res) => {
      const response = await this.schemas.phdsBanks.getBankList();

      res.status(response.code).send(response.data);
    });

    this.api.get('/api/transaction/type/list', async (req, res) => {
      const response = await this.schemas.phdsTransactions.getTransactionTypes();

      res.status(response.code).send(response.data);
    });

    this.api.get('/api/credit/line/all', async (req, res) => {
      const response = await this.schemas.phdsCredit.getCreditLine();

      res.status(response.code).send(response.data);
    });

    this.api.get('/api/credit/line/:bankId', async (req, res) => {
      const { bankId } = req.params;
      const response = await this.schemas.phdsCredit.getCreditLine(bankId);

      res.status(response.code).send(response.data);
    });

    this.api.post('/api/credit/line/add-new', async (req, res) => {
      const { body } = req;
      const response = await this.schemas.phdsCredit.createCreditLine(body);

      res.status(response.code).send(response.data);
    });

    this.api.get('/api/credit/accounts/all', async (req, res) => {
      const response = await this.schemas.phdsCredit.getCreditAccount({});

      res.status(response.code).send(response.data);
    });

    this.api.get('/api/credit/accounts', async (req, res) => {
      const { query } = req;
      const response = await this.schemas.phdsCredit.getCreditAccount(query);

      res.status(response.code).send(response.data);
    });

    this.api.get('/api/credit/accounts/add', async (req, res) => {
      const { body } = req;
      const response = await this.schemas.phdsCredit.getCreditAccount(query);

      res.status(response.code).send(response.data);
    });

    this.api.post('/api/credit/accounts/add-new', async (req, res) => {
      const { body } = req;
      const response = await this.schemas.phdsCredit.insertCreditAccount(body);

      res.status(response.code).send(response.data);
    });
  }

  start() {
    this.setup();

    return this.api.listen(this.port, () => {
      this.logging.info(`Service running on port ${this.port}`); 
    });
  }
}