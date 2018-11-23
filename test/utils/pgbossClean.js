const { sequelize } = require('./../../models');

const cleaner = async () => {
  try {
    await sequelize.query('DELETE from pgboss.archive');
    await sequelize.query('DELETE from pgboss.job');
  }
  catch(e) {
    console.log('QUEUEs not found');
  }
};

module.exports = cleaner;
