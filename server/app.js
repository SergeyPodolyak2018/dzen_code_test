const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggOptions = require('./swaggeroptions.js');
const cors = require('cors');
const { createServer } = require('node:http');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const { BASE_URI } = require('./const');
const commentRouter = require('./routes/commentRouter');
const articlesRouter = require('./routes/articlesRouter');
const mainRouter = require('./routes/mainRouter');
const userRouter = require('./routes/userRouter');

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const specs = swaggerJsdoc(swaggOptions);

const app = express();
const server = createServer(app);
//app.use(cors());

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload({}));

app.use(express.static('public'));
app.use(`${BASE_URI}/api-docs`, swaggerUi.serve, swaggerUi.setup(specs));
app.use(`${BASE_URI}`, mainRouter);
app.use(`${BASE_URI}/user`, userRouter);
app.use(`${BASE_URI}/article`, articlesRouter);
app.use(`${BASE_URI}/comment`, commentRouter);

module.exports = server;
