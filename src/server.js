import Hapi from '@hapi/hapi';

const initHapiServer = async () => {
  const hapiServer = Hapi.server({
    port: 9000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
  });

  await hapiServer.start();

  console.info(`Server is running on ${hapiServer.info.uri}`);
};

initHapiServer();
