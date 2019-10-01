const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const dynamicRoutes = [
  {
    path: '/',
    to: 'root#index',
    via: ['get'],
  },
  {
    path: '/upload',
    to: 'root#upload',
    via: ['post'],
    middlewares: [upload.single('csv')],
  },
  {
    path: '/csv-to-graphql',
    to: 'root#csvToGraphql',
    via: ['get', 'post']
  }
];

module.exports = dynamicRoutes;
