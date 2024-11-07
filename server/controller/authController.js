const jwt = require('jsonwebtoken');

const MESSAGE = require('../helper/messages.js');
const { ACCESS_TOKEN_SECRET } = require('../const.js');
const { checkSession } = require('../services/redisService.js');
const {
  checkFileType,
  checkFileSize,
  checkRequiredParams,
  checkNotRequiredParams,
} = require('../helper/checker.js');

const verifyAccessToken = async (req, res, next) => {
  const token = req.cookies['SESSION_TOKEN'];
  if (token === '') {
    const massage = MESSAGE.UNAUTORIZED();
    return res.status(massage.status).json(massage.data);
  }
  try {
    //containe user id
    const storedSession = await checkSession(token);

    if (storedSession) {
      res.locals.decoded = { userId: storedSession };
      return next();
    } else {
      res.redirect('/user/login');
      return;
    }
  } catch (err) {
    console.log(err);
    res.redirect('/user/login');
    return;
  }
};

const getDataFromToken = async (token) => {
  if (token === '') {
    return { error: 'Not valid credentials' };
  }
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const email = decoded?.email;
    const user = await getUserByEmail(email);

    if (email && user[0]) {
      return { email, id: decoded.id, role: user[0].role };
    } else {
      return { error: 'Not valid credentials' };
    }
  } catch (err) {
    console.log(err);
    return { error: 'Not valid credentials' };
  }
};

const verifyFile = async (req, res, next) => {
  const file = req.files?.file;
  if (!file) return next();
  if (checkFileType(file) && checkFileSize(file)) return next();

  const massage = MESSAGE.ERROR(
    'File type or size error:accepted types is jpg, png, gif,text. Size for txt <= 100 kB'
  );
  return res.status(massage.status).json(massage.data);
};

const verifyParams =
  (paramsWithConditions, source) => async (req, res, next) => {
    const body = source === 'body' ? req.body : req.query;
    if (checkRequiredParams(body, paramsWithConditions)) return next();

    const massage = MESSAGE.ERROR('Wrong params types');
    return res.status(massage.status).json(massage.data);
  };
const verifyNotReqParams =
  (paramsWithConditions, source) => async (req, res, next) => {
    const body = source === 'body' ? req.body : req.query;
    if (checkNotRequiredParams(body, paramsWithConditions)) return next();

    const massage = MESSAGE.ERROR('Wrong params types');
    return res.status(massage.status).json(massage.data);
  };

module.exports = {
  verifyAccessToken,
  getDataFromToken,
  verifyFile,
  verifyParams,
  verifyNotReqParams,
};
