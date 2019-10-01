const { getRequestLogger, getResponseLogger } = require('./../logger');
const mapper = require('./mapper');
const dynamicRoutes = require('./dynamicRoutes');

module.exports = (app) => {
  // Adding logger middlewares
  app.use(getRequestLogger());
  app.use(getResponseLogger());

  dynamicRoutes.forEach((dynamicRoute) => {
    const { path, via: httpMethods, to, middlewares: routeMiddlewares = [] } = dynamicRoute;
    httpMethods.forEach((httpMethod) => {
      const method = httpMethod.toLowerCase();
      app[method](path, ...routeMiddlewares, mapper(to));
    });
  });
}
