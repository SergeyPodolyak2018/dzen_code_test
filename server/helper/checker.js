const sanitizeHtml = require('sanitize-html');

const checkId = (req, res, next, id) => {
  const someId = id || req.params.id;
  res.locals.id = someId;
  next();
};
const filesTypes = ['image/jpeg', 'image/gif', 'image/png', 'text/plain'];
const filesSize = {
  'text/plain': 102400,
};
const requiredParams = {
  'post:comments': {
    article_id: 'stringNumber',
    comment_id: 'stringNumber',
    text: 'string',
  },
  'get:comments': {
    article_id: 'stringNumber',
    comment_id: 'stringNumber',
  },
};
const notRequiredParams = {
  'get:comments': {
    page: 'stringNumber',
    limit: 'stringNumber',
    order_by: 'string',
    orderDirection: 'string',
  },
};

const paramsType = {
  string: (val) => typeof val === 'string' && val !== '',
  stringNumber: (val) => typeof Number(val) === 'number' && !isNaN(Number(val)),
};

const checkRequiredParams = (body, params) => {
  for (const element of Object.keys(params)) {
    if (
      !body[element] ||
      !paramsType[params[element]] ||
      !paramsType[params[element]](body[element])
    ) {
      return false;
    }
  }
  return true;
};
const checkNotRequiredParams = (body, params) => {
  for (const element of Object.keys(params)) {
    if (body[element]) {
      if (
        !paramsType[params[element]] ||
        !paramsType[params[element]](body[element])
      ) {
        return false;
      }
    }
  }
  return true;
};

const checkFileSize = (file) => {
  if (!filesSize[file.mimetype]) return true;
  if (filesSize[file.mimetype] <= file.size) return true;
  return false;
};
const checkFileType = (file) => {
  if (filesTypes.includes(file.mimetype)) return true;
  return false;
};

const sanitizer = (dirty) =>
  sanitizeHtml(dirty, {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p'],
    allowedAttributes: {
      a: ['href'],
    },
  });

module.exports = {
  checkId,
  checkFileSize,
  checkFileType,
  checkRequiredParams,
  requiredParams,
  notRequiredParams,
  sanitizer,
  checkNotRequiredParams,
};
