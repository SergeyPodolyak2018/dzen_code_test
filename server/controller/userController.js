const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const { ACCESS_TOKEN_SECRET } = require('../const.js');
const MESSAGE = require('../helper/messages.js');
const UserService = require('../services/userService.js');
const RedisService = require('../services/redisService.js');

const loginUserPage = async (req, res) => {
  res.sendFile(path.join(__dirname, '../view/login.html'));
};
const userSignUpPage = async (req, res) => {
  res.sendFile(path.join(__dirname, '../view/signup.html'));
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserService.getUserByEmail(email);
    console.log(user);
    if (
      user &&
      user.length > 0 &&
      (await bcrypt.compare(password, user[0].password))
    ) {
      const accessToken = jwt.sign(
        { email, id: user[0].id },
        ACCESS_TOKEN_SECRET,
        {
          expiresIn: '1h',
        }
      );
      res.cookie('SESSION_TOKEN', accessToken, {
        expires: new Date(Date.now() + 90000),
        httpOnly: true,
      });
      RedisService.saveSession(accessToken, user[0].id, 60 * 60 * 60);

      res.redirect('/');
    } else {
      const massage = MESSAGE.INVALID_CREDENTIALS();
      res.status(massage.status).json(massage.data);
    }
  } catch (err) {
    console.log(err);
    res.redirect('/login.html');
  }
};

const postUser = async (req, res) => {
  const { email, username, password } = req.body;

  await UserService.saveUser(email, username, password);

  res.redirect('/user/login');
};
const info = async (req, res) => {
  const userId = res.locals?.decoded?.userId || 1; //TODO remove 1

  const result = await UserService.getUserById(userId);
  const massage = MESSAGE.DATA(result);
  res.status(massage.status).json(massage.data);
};

module.exports = { loginUser, loginUserPage, userSignUpPage, postUser, info };
