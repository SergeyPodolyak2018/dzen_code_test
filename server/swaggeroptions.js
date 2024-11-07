const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'DZEN code test task',
      version: '0.1.0',
      description: 'Documentation for API',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Sergey Podolyak',
        email: 'sergey.dev.2024@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

module.exports = options;
