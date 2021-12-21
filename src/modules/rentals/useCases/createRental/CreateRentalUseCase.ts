import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {}
    async execute({
        user_id,
        car_id,
        expected_return_date,
    }: IRequest): Promise<Rental> {
        const minHours = 24;
        const carIsUnavailable =
            await this.rentalsRepository.findOpenRentalByCar(car_id);
        if (carIsUnavailable) {
            throw new AppError("Car is unavailable");
        }

        const userAlreadyRented =
            await this.rentalsRepository.findOpenRentalByUser(user_id);
        if (userAlreadyRented) {
            throw new AppError("There's a rental in progress for user!");
        }

        const dateNow = this.dateProvider.dateNow();

        const compare = this.dateProvider.compareInHours(
            dateNow,
            expected_return_date
        );

        if (compare < minHours) {
            throw new AppError("Invalid return time!");
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
