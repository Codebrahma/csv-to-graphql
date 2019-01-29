const { createLogger, format, transports } = require('winston');
const expressWinston = require('express-winston');
const { Papertrail } = require('winston-papertrail');
const { combine, timestamp, label, printf } = format;
const env = process.env.NODE_ENV || 'development';

const formatMessageWithTimestampAndLabel = printf(
  process.env.PAPERTRAIL_HOST ?
  (info) => (`<<<<[${info.level}] - [${info.label}]: ${info.message}>>>>`)
  : (info) => (`[${info.level}] - [${info.label}]: ${info.message}`)
);

const logTransports = () => {
  switch(env) {
    case 'development':
    case 'staging':
      return [ new transports.Console() ];
    case 'test':
      return [ new transports.File({ filename: `./logs/${process.env.NODE_ENV}.log` }) ];
    default:
      return [
        new transports.Papertrail({
          host: process.env.PAPERTRAIL_HOST,
          port: process.env.PAPERTRAIL_PORT,
          inlineMeta: true,
          logFormat: (_, message) => {
            const messagesToDisplay = message.match(/<<<<(.*)>>>>/)
            return (messagesToDisplay && messagesToDisplay[1])
          },
        })
      ]
  }
}

const formatter = (tagName) => combine(
  label({ label: tagName }),
  timestamp(),
  formatMessageWithTimestampAndLabel
);

class Logger {
  static getInstance() {
    if (Logger.instance) { return Logger.instance; }
    Logger.instance = new Logger();
    return Logger.instance;
  }

  constructor() {
    this.handlers = {};
    this.makeLogger = this.makeLogger.bind(this);
    this.controllerLogger = this.controllerLogger.bind(this);
    this.getRequestLogger = this.getRequestLogger.bind(this);
    this.getResponseLogger = this.getResponseLogger.bind(this);
  }

  makeLogger(tagName) {
    if (this.handlers[tagName]) { return this.handlers[tagName]; }
    this.handlers[tagName] = createLogger({
      transports: logTransports(),
      format: formatter(tagName)
    });
    return this.handlers[tagName];
  }

  controllerLogger(tagName, message) {
    if (this.handlers[tagName]) { return this.handlers[tagName] }
    this.handlers[tagName] = expressWinston.logger({
      winstonInstance: this.makeLogger(tagName),
      meta: true,
      msg: message
    });
    return this.handlers[tagName];
  }

  getRequestLogger() {
    const requestLoggerInstance = this.makeLogger('REQUEST');
    return (req, _res, next) => {
      requestLoggerInstance.info(`Started ${req.method}: ${req.url}`);
      return next();
    }
  }

  getResponseLogger() {
    const message = "Processed {{req.method}}: {{req.url}} in {{res.responseTime}}ms with {{res.statusCode}}";
    return this.controllerLogger('RESPONSE', message);
  }
}

Logger.instance = null;

module.exports = Logger.getInstance();
