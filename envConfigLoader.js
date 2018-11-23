const path = require('path');

const loader = (envName) => {
  const configPath = path.join(__dirname, 'config', `${envName || 'development'}.env`)
  require('dotenv').config({ path: configPath });
}

module.exports = loader;
