/**
 * Sentry initialization
 */
const Sentry = require('@sentry/node');
module.exports = () => {
  if (process.env.NODE_ENV === 'test') { return; }
  Sentry.init({
    environment: (process.env.NODE_ENV || 'development'),
    dsn: process.env.SENTRY_DSN
  });
}
