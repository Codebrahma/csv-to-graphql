class RootController {
  static index(_req, res) {
    return res.send('Hello World!');
  }
}

module.exports = RootController;
