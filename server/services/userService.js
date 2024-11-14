const { ACCESS_TOKEN_SECRET } = require('../const.js');
const { scrypt, randomBytes, timingSafeEqual } = require('crypto');
const { promisify } = require('util');
const scryptAsync = promisify(scrypt);
const userRepository = require('../repository/userRepository.js');
const UserModel = require('../models/user');
const { scryptHash } = require('../helper/cripto.js');

const getUserByEmail = async (email) => {
  return userRepository.getByEmail(email);
};
const getUserById = async (email) => {
  return userRepository.get(email);
};

const saveUser = async (email, username, password) => {
  try {
    const encryptPass = await scryptHash(password);
    const user = new UserModel(email, username, encryptPass);
    const rez = await userRepository.save(user);
    return rez;
  } catch (err) {
    console.log(err);
  }
};

const getAllUsers = () => {
  return userRepository.getAll();
};
const deleteUser = (id) => {
  return userRepository.deleteUser(id);
};

module.exports = {
  getUserByEmail,
  saveUser,
  getAllUsers,
  deleteUser,
  getUserById,
};
