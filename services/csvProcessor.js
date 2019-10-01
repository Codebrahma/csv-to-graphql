const csv = require('csv-parser');
const fs = require('fs');
const _ = require('lodash');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = require('graphql');

class CSVProcessor {
  static async parse(file) {
    return new Promise(resolve => {
      const results = [];
      fs.createReadStream(file)
        .pipe(
          csv({
            mapValues: ({ value }) =>
              value ? unescape(new String(value).trim()) : null,
          }),
        )
        .on('data', data => results.push(data))
        .on('end', () => resolve(results));
    });
  }

  static getType(headers) {
    return new GraphQLObjectType({
      name: 'csv',
      description: '...',

      fields: () =>
        headers.reduce((fields, header) => {
          const headerName = _.snakeCase(header.trim());
          return {
            ...fields,
            [headerName]: {
              type: GraphQLString,
              resolve: row => row[header],
            },
          };
        }, {}),
    });
  }

  static generateGraphQLSchema(rows, headers) {
    return new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'csv_to_graphql',
        description: '...',

        fields: () => ({
          csv: {
            type: new GraphQLList(CSVProcessor.getType(headers)),
            args: {
              limit: { type: GraphQLInt },
            },
            resolve: (_, { limit }) =>
              typeof limit === 'undefined' ? rows : rows.slice(0, limit),
          },
        }),
      }),
    });
  }

  static async process(file) {
    const rows = await CSVProcessor.parse(file);
    const headers = _.keys(rows[0]);

    return CSVProcessor.generateGraphQLSchema(rows, headers);
  }
}

module.exports = CSVProcessor;
