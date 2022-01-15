"use strict";

var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("../../repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _MailProviderInMemory = require("../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory");

var _AppError = require("../../../../shared/errors/AppError");

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

let sendForgotPasswordMailUseCase;
let usersTokensRepositoryInMemory;
let usersRepositoryInMemory;
let mailProvider;
let dateProvider;
describe("Send Forgot Password Mail Use Case", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
  });
  it("Should be able to send forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");
    await usersRepositoryInMemory.create({
      driver_license: "8766789",
      email: "mariaelizabete@gmail.com",
      name: "Maria Elizabete",
      password: "666"
    });
    await sendForgotPasswordMailUseCase.execute("mariaelizabete@gmail.com");
    expect(sendMail).toHaveBeenCalled();
  });
  it("Should not be able to send and email if user does not exists", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("lindinho123@hotmail.com")).rejects.toEqual(new _AppError.AppError("User does not exists!"));
  });
  it("Should be able to create a new user token", async () => {
    const isGenerated = jest.spyOn(usersTokensRepositoryInMemory, "create");
    usersRepositoryInMemory.create({
      driver_license: "994441",
      email: "luizapocas@hotmail.com",
      name: "Luiza Dantas",
      password: "lulu3131"
    });
    await sendForgotPasswordMailUseCase.execute("luizapocas@hotmail.com");
    expect(isGenerated).toHaveBeenCalled();
  });
});