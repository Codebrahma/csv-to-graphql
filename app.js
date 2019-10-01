require('./envConfigLoader')(process.env.NODE_ENV); // Load env based config

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const http = require('http');
const initializeSentry = require('./sentry');

const initializeApp = () => {
  initializeSentry(); // Sentry config initialization

  /**
   * Logger creation and configuration
   */
  const logger = require('./logger').makeLogger('APP');
  logger.info(`Loading env... ${process.env.NODE_ENV}`);

  app.set('view engine', 'ejs');
  app.use(function(_req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, jwt");
    next();
  });

  app.use(bodyParser.json());
  app.use(cookieParser());
  require('./routes')(app);

  const httpServer = http.createServer(app);
  httpServer.listen(process.env.PORT || 3000, () => logger.info('http 3000'));
  return httpServer;
}

const mainApp = initializeApp();
module.exports = mainApp;
