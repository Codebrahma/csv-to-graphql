class RootController {
  static index(_req, res) {
    return res.render('pages/home');
  }

  static upload(req, res) {
    return res.render('pages/home');
  }
}

module.exports = RootController;
