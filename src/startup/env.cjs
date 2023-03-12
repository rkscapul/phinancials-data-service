const pathLib = require('path');
const environment = process.env.APP_MODE ? `.${process.env.APP_MODE}` : '';

// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config({ path: pathLib.resolve(process.cwd(), `.env${environment}`) });