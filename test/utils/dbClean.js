const { sequelize } = require('../../models');
const asyncForEach = require('../../utils/asyncForEach');
const skippedTables = [ 'SequelizeMeta' ];
const tablesSelectQuery = `
  SELECT table_name FROM information_schema.tables
  WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE';
`;

const clean = async () => {
  return sequelize.query(tablesSelectQuery).then(async (tables) => {
    await asyncForEach(tables, async ([ tableName ]) => {
      if (!skippedTables.includes(tableName)) {
        const query = `TRUNCATE "public"."${tableName}" CASCADE`;
        await sequelize.query(query);
      }
    });
  });
};

module.exports = clean;
