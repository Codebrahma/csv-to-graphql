const fs = require('fs');
const isFileExists = require('util').promisify(fs.exists);
const graphqlHTTP = require('express-graphql');

const CSVProcessor = require('./../services/csvProcessor');

class RootController {
  static index(_req, res) {
    return res.render('pages/home');
  }

  static async upload(req, res) {
    if (!req.file || !req.file.path) {
      return res.redirect('/?notice=CSV File is required to proceed');
    }
    res.redirect(`/csv-to-graphql?path=${req.file.path}`);
  }

  static async csvToGraphql(req, res) {
    const {
      query: { path = '' },
    } = req;

    if (!path) {
      return res.redirect('/?notice=CSV File is required to proceed');
    }

    if (!(await isFileExists(path))) {
      return res.redirect('/?notice=CSV File not found. Perhaps it could be expired or deleted.');
    }

    const schema = await CSVProcessor.process(path);
    graphqlHTTP({
      schema,
      graphiql: true,
    })(req, res);
  }
}

module.exports = RootController;
