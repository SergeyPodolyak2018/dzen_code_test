const app = require('./app');
const { PORT, BASE_URI } = require('./const');

const port = PORT;
app.listen(port, () =>
  console.info(`App is running on port ${port}...${BASE_URI}`)
);
