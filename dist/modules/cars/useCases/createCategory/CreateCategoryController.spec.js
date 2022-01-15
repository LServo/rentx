"use strict";

var _bcrypt = require("bcrypt");

var _supertest = _interopRequireDefault(require("supertest"));

var _uuid = require("uuid");

var _app = require("../../../../shared/infra/http/app");

var _typeorm = _interopRequireDefault(require("../../../../shared/infra/typeorm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let connection;
describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await (0, _typeorm.default)();
    await connection.runMigrations();
    const id = (0, _uuid.v4)();
    const password = await (0, _bcrypt.hash)("admin", 8);
    await connection.query(`INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license )
            values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')`);
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it("Should be able to create a new category", async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin"
    });
    const {
      refreshToken
    } = responseToken.body;
    const response = await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "Category SuperTest",
      description: "Category SuperTest"
    }).set({
      Authorization: `Bearer ${refreshToken}`
    });
    expect(response.status).toBe(201);
  });
  it("Should not be able to create a new category with an existent name", async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin"
    });
    const {
      refreshToken
    } = responseToken.body;
    const response = await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "Category SuperTest",
      description: "Category SuperTest"
    }).set({
      Authorization: `Bearer ${refreshToken}`
    });
    expect(response.status).toBe(400);
  });
});