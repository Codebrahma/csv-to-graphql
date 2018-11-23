const capitalize = require('lodash/capitalize');
const controllers = require('./../controllers');

const mapper = (to) => {
  let [ controllerKey = 'root', actionName = 'index' ] = (to || "").split("#");
  const controllerName = `${capitalize(controllerKey)}Controller`;
  return controllers[controllerName][actionName];
}

module.exports = mapper;
