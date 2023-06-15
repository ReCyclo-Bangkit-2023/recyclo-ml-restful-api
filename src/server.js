import Hapi from '@hapi/hapi';
import nodeProcess from 'node:process';
import routes from './routes/routes.js';

const initHapiServer = async () => {
  const hapiServer = Hapi.server({
    port: nodeProcess.env.PORT || 9000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
  });

  hapiServer.route(routes);

  await hapiServer.start();

  console.info(`Server is running on ${hapiServer.info.uri}`);
};

initHapiServer();
