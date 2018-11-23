const getCassette = (cassetteName) => {
  const [ cassette ] = require(`./../../cassettes/${cassetteName}.json`)
  return cassette;
}

module.exports = getCassette;
