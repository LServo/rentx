import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const oneDayLater = dayjs().add(1, "d").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsDateProvider,
            carsRepositoryInMemory
        );
    });

    it("Should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "121212",
            expected_return_date: oneDayLater,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("Should not be able to create a new rental if the user already have one", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "11111",
                car_id: "11111",
                expected_return_date: oneDayLater,
            });

            await createRentalUseCase.execute({
                user_id: "11111",
                car_id: "22222",
                expected_return_date: oneDayLater,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to create a new rental if the car already have one", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: "test",
                expected_return_date: oneDayLater,
            });

            await createRentalUseCase.execute({
                user_id: "321",
                car_id: "test",
                expected_return_date: oneDayLater,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to create a new rental with invalid return time", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "user_test",
                car_id: "car_test",
                expected_return_date: dayjs().toDate(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
