const pino = require('pino');
const logger = pino();

module.exports.logging = {
  info(message, sendWebhook = false) {
    logger.info(message);
  },

  err(message) { 
    logger.error(message) 
  },
}