"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRepository = void 0;

var _typeorm = require("typeorm");

var _User = require("@modules/accounts/infra/typeorm/entities/User");

class UsersRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_User.User);
  }

  async create({
    name,
    password,
    email,
    driver_license,
    avatar,
    id
  }) {
    const user = this.repository.create({
      name,
      password,
      email,
      driver_license,
      avatar,
      id
    });
    await this.repository.save(user);
  }

  async findByEmail(email) {
    const user = await this.repository.findOne({
      email
    });
    return user;
  }

  async findById(user_id) {
    const user = await this.repository.findOne(user_id);
    return user;
  }

}

exports.UsersRepository = UsersRepository;