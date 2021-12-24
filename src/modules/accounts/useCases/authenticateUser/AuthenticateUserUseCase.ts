import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    userAlreadyExists: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository
    ) {}
    async execute({ email, password }: IRequest): Promise<IResponse> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);
        if (!userAlreadyExists) {
            throw new AppError("Incorrect email/password");
        }

        const passwordMatch = await compare(
            password,
            userAlreadyExists.password
        );
        if (!passwordMatch) {
            throw new AppError("Incorrect email/password");
        }

        const token = sign({}, "71f6ec88d94e9b6b5e49e90dbdd8e86e", {
            subject: userAlreadyExists.id,
            expiresIn: "1d",
        });

        const tokenReturn: IResponse = {
            token,
            userAlreadyExists: {
                name: userAlreadyExists.name,
                email: userAlreadyExists.email,
            },
        };

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };
