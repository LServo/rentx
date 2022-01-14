"use strict";

var _dayjs = _interopRequireDefault(require("dayjs"));

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

var _RentalsRepositoryInMemory = require("@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory");

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _AppError = require("@shared/errors/AppError");

var _CreateRentalUseCase = require("./CreateRentalUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createRentalUseCase;
let carsRepositoryInMemory;
let rentalsRepositoryInMemory;
let dayjsDateProvider;
describe("Create Rental", () => {
  const oneDayLater = (0, _dayjs.default)().add(1, "d").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new _RentalsRepositoryInMemory.RentalsRepositoryInMemory();
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    dayjsDateProvider = new _DayjsDateProvider.DayjsDateProvider();
    createRentalUseCase = new _CreateRentalUseCase.CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
  });
  it("Should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 90,
      license_plate: "test",
      fine_amount: 40,
      category_id: "test132",
      brand: "testcar"
    });
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: oneDayLater
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });
  it("Should not be able to create a new rental if the user already have one", async () => {
    await rentalsRepositoryInMemory.create({
      // inserindo informação mockada direto no banco de dados ao invés de passar pelo use case (daria error)
      user_id: "11111",
      expected_return_date: oneDayLater,
      car_id: "11111"
    });
    await expect(createRentalUseCase.execute({
      user_id: "11111",
      car_id: "22222",
      expected_return_date: oneDayLater
    })).rejects.toEqual(new _AppError.AppError("There's a rental in progress for user!"));
  });
  it("Should not be able to create a new rental if the car already have one", async () => {
    await rentalsRepositoryInMemory.create({
      user_id: "123",
      expected_return_date: oneDayLater,
      car_id: "test"
    });
    await expect(createRentalUseCase.execute({
      user_id: "321",
      car_id: "test",
      expected_return_date: oneDayLater
    })).rejects.toEqual(new _AppError.AppError("Car is unavailable"));
  });
  it("Should not be able to create a new rental with invalid return time", async () => {
    await expect(createRentalUseCase.execute({
      user_id: "user_test",
      car_id: "car_test",
      expected_return_date: (0, _dayjs.default)().toDate()
    })).rejects.toEqual(new _AppError.AppError("Invalid return time!"));
  });
});