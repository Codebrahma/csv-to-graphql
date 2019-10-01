const dynamicRoutes = [
  {
    path: '/',
    to: 'root#index',
    via: [ 'get' ],
  },
];

module.exports = dynamicRoutes;
