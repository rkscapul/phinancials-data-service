import express, { json } from 'express';

export class PhinancialsDataService {
  constructor (port, logging) {
    this.api = express();
    this.port = port || 4500;
    this.logging = logging;
  }

  setup () {
    this.api.use(json());

    this.api.get('/', (req, res) => {
      res.send({ message: 'Hello world' });
    });
  }

  start () {
    this.setup();

    return this.api.listen(this.port, () => {
      this.logging.info(`Service running on port ${this.port}`);
    })
  }
}