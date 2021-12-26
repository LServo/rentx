import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { UsersTokensRepository } from "@modules/accounts/repositories/in-memory/UsersTokensRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;
    const usersTokensRepository = new UsersTokensRepository();
    if (!authHeader) {
        throw new AppError("Token missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(
            token,
            auth.secret_refresh_token
        ) as IPayload;

        const userAlreadyExists =
            await usersTokensRepository.findByUserIdAndRefreshToken(
                user_id,
                token
            );
        if (!userAlreadyExists) {
            throw new AppError("User does not exists!", 404);
        }

        request.user = {
            id: user_id,
        };

        next();
    } catch (error) {
        throw new AppError("Invalid token!", 401);
    }
}
