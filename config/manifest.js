const envKey = key => {
  const env = process.env.NODE_ENV || 'development';

  const configuration = {
    development: {
      host: '172.16.68.55',
      port: 8002
    },
    uat: {
      host: 'localhost',
      port: 8010
    },
    // These should match environment variables on hosted server
    production: {
      // host: process.env.HOST,
      // port: process.env.PORT
      host: 'localhost',
      port: 8001
    }
  };

  return configuration[env][key];
};
  
const manifest = {
  connections: [
    {
      host: envKey('host'),
      port: envKey('port'),
      routes: {
        cors: true
      },
      router: {
        stripTrailingSlash: true
      }
    }
  ],
  registrations: [
    {
      plugin: './plugins/monitor'
    },
    {
      plugin: './api',
      options: { 
        routes: { 
          prefix: '/v1/api' 
        } 
      }
    },
    {
      plugin: './plugins/good'
    },
    {
      plugin: './plugins/swagger'
    }
  ]
};
module.exports = manifest;