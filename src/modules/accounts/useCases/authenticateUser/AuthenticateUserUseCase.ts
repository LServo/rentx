import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
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
    refreshToken: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}
    async execute({ email, password }: IRequest): Promise<IResponse> {
        const {
            secret_token,
            expires_in_token,
            secret_refresh_token,
            expires_in_refresh_token,
            expires_refresh_tokens_days,
        } = auth;
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

        const token = sign({}, secret_token, {
            subject: userAlreadyExists.id,
            expiresIn: expires_in_token,
        });

        const refreshToken = sign({ email }, secret_refresh_token, {
            subject: userAlreadyExists.id,
            expiresIn: expires_in_refresh_token,
        });

        const refresh_token_expires_date = this.dateProvider.addDays(
            expires_refresh_tokens_days
        );

        await this.usersTokensRepository.create({
            user_id: userAlreadyExists.id,
            refresh_token: refreshToken,
            expires_date: refresh_token_expires_date,
        });

        const tokenReturn: IResponse = {
            token,
            userAlreadyExists: {
                name: userAlreadyExists.name,
                email: userAlreadyExists.email,
            },
            refreshToken,
        };

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };
