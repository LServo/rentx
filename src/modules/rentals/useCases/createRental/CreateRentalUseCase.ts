import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

dayjs.extend(utc);

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

// @injectable()
class CreateRentalUseCase {
    constructor(
        // @inject('aaa')
        private rentalsRepository: IRentalsRepository
    ) {}
    async execute({
        user_id,
        car_id,
        expected_return_date,
    }: IRequest): Promise<Rental> {
        const minHours = 24;
        const carIsAvailable = await this.rentalsRepository.findOpenRentalByCar(
            car_id
        );

        if (!carIsAvailable) {
            throw new AppError("Car is not available");
        }

        const userAlreadyRented =
            await this.rentalsRepository.findOpenRentalByUser(user_id);
        if (userAlreadyRented) {
            throw new AppError("There's a rental in progress for user!");
        }

        const expected_return_dateFormatted = dayjs(expected_return_date)
            .utc()
            .local()
            .format();
        const dateNow = dayjs().utc().local().format();
        const compare = dayjs(expected_return_dateFormatted).diff(
            dateNow,
            "hours"
        );

        if (compare < minHours) {
            throw new AppError("Invalid expected return date!");
        }

        const newRental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        return newRental;
    }
}

export { CreateRentalUseCase };
