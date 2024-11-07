const bcrypt = require('bcrypt');
const userRepository = require('../repository/userRepository.js');
const UserModel = require('../models/user');

const getUserByEmail = async (email) => {
  return userRepository.getByEmail(email);
};
const getUserById = async (email) => {
  return userRepository.get(email);
};

const saveUser = async (email, username, password) => {
  try {
    const encryptPass = await bcrypt.hash(password, 10);
    const user = new UserModel(email, username, encryptPass);
    const rez = await userRepository.save(user);
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
