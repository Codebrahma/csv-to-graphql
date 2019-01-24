const dynamicRoutes = [
  {
    path: '/',
    to: 'root#index',
    via: [ 'get' ],
    isPublic: true,
  },
  {
    path: '/register',
    to: 'auth#register',
    via: [ 'post' ],
    isPublic: true,
  },
  {
    path: '/sign-in',
    to: 'auth#signIn',
    via: [ 'post' ],
    isPublic: true,
  },
  {
    path: '/am-i-authenticated',
    to: 'auth#isUserAuthenticated',
    via: [ 'get' ]
  }
];

module.exports = dynamicRoutes;
