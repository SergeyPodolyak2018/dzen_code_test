let lastId = 0;

class UserModel {
  email;
  name;
  password;
  constructor(email, name, password) {
    this.email = email;
    this.name = name;
    this.password = password;
  }
}

module.exports = UserModel;
