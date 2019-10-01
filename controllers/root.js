const CSVProcessor = require('./../services/csvProcessor');
const graphqlHTTP = require('express-graphql')

class RootController {
  static index(_req, res) {
    return res.render('pages/home');
  }

  static async upload(req, res) {
    res.redirect(`/csv-to-graphql?path=${req.file.path}`);
  }

  static async csvToGraphql(req, res) {
    const schema = await CSVProcessor.process(req.query.path);
    graphqlHTTP({
      schema,
      graphiql: true
    })(req, res);
  }
}

module.exports = RootController;
