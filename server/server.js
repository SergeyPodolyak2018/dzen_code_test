const app = require('./app');
const { PORT, BASE_URI } = require('./const');

const port = PORT;
try {
  app.listen(port, () =>
    console.info(`App is running on port ${port}...${BASE_URI}`)
  );
  app.on('error', (err) => {
    console.log(err);
  });
} catch (error) {
  console.log(error);
}
