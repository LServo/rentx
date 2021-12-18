import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError("Token missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(
            token,
            "71f6ec88d94e9b6b5e49e90dbdd8e86e"
        ) as IPayload;

        const usersRepository = new UsersRepository();
        const userAlreadyExists = await usersRepository.findById(user_id);
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
