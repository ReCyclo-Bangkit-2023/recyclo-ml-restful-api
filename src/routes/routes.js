import { recommendationPrice } from '../handlers/recyclo-handlers.js';

const routes = [
  {
    method: 'POST',
    path: '/api/recommendation-price',
    handler: recommendationPrice,
    options: {
      payload: {
        parse: true,
        allow: 'multipart/form-data',
        multipart: { output: 'data' },
        maxBytes: 8388608,
      },
    },
  },
];

export default routes;
