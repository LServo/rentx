import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let mailProvider: MailProviderInMemory;
let dateProvider: DayjsDateProvider;

describe("Send Forgot Password Mail Use Case", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        mailProvider = new MailProviderInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    });

    it("Should be able to send forgot password mail to user", async () => {
        const sendMail = jest.spyOn(mailProvider, "sendMail");
        await usersRepositoryInMemory.create({
            driver_license: "8766789",
            email: "mariaelizabete@gmail.com",
            name: "Maria Elizabete",
            password: "666",
        });

        await sendForgotPasswordMailUseCase.execute("mariaelizabete@gmail.com");

        expect(sendMail).toHaveBeenCalled();
    });

    it("Should not be able to send and email if user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("lindinho123@hotmail.com")
        ).rejects.toEqual(new AppError("User does not exists!"));
    });

    it("Should be able to create a new user token", async () => {
        const isGenerated = jest.spyOn(usersTokensRepositoryInMemory, "create");

        usersRepositoryInMemory.create({
            driver_license: "994441",
            email: "luizapocas@hotmail.com",
            name: "Luiza Dantas",
            password: "lulu3131",
        });

        await sendForgotPasswordMailUseCase.execute("luizapocas@hotmail.com");

        expect(isGenerated).toHaveBeenCalled();
    });
});
