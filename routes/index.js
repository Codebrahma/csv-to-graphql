const { getRequestLogger, getResponseLogger } = require('./../logger');
const { authMiddleware } = require('./middlewares');
const mapper = require('./mapper');
const dynamicRoutes = require('./dynamicRoutes');

module.exports = (app) => {
  // Adding logger middlewares
  app.use(getRequestLogger());
  app.use(getResponseLogger());

  dynamicRoutes.forEach((dynamicRoute) => {
    const { path, via: httpMethods, to, isPublic, middlewares = [] } = dynamicRoute;
    const routeMiddlewares = isPublic ? middlewares : [ authMiddleware, ...middlewares ];
    httpMethods.forEach((httpMethod) => {
      const method = httpMethod.toLowerCase();
      app[method](path, ...routeMiddlewares, mapper(to));
    });
  });
}
