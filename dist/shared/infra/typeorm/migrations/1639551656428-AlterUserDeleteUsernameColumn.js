"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterUserDeleteUsernameColumn1639551656428 = void 0;

var _typeorm = require("typeorm");

class AlterUserDeleteUsernameColumn1639551656428 {
  async up(queryRunner) {
    await queryRunner.dropColumn("users", "username");
  }

  async down(queryRunner) {
    await queryRunner.addColumn("users", new _typeorm.TableColumn({
      name: "username",
      type: "varchar"
    }));
  }

}

exports.AlterUserDeleteUsernameColumn1639551656428 = AlterUserDeleteUsernameColumn1639551656428;