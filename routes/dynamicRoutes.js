const dynamicRoutes = [
  {
    path: '/',
    to: 'root#index',
    via: [ 'get' ],
    isPublic: true,
  },
  {
    path: '/auth/google',
    to: 'auth#index',
    via: [ 'get' ],
    isPublic: true,
  },
  {
    path: '/am-i-authenticated',
    to: 'auth#isUserAuthenticated',
    via: [ 'get' ]
  }
];

module.exports = dynamicRoutes;
