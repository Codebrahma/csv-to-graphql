const promisify = function(action) {
  return new Promise((resolve, reject) => action(resolve, reject));
}

module.exports = promisify
