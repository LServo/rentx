"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

var _ListAvailableCarsUseCase = require("./ListAvailableCarsUseCase");

let listAvailableCarsUseCase;
let carsRepositoryInMemory;
describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    listAvailableCarsUseCase = new _ListAvailableCarsUseCase.ListAvailableCarsUseCase(carsRepositoryInMemory);
  });
  it("Should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Car Description",
      daily_rate: 70,
      license_plate: "RX-666",
      fine_amount: 140,
      brand: "Car Brand",
      category_id: "category_id"
    });
    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });
  it("Should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car Description",
      daily_rate: 70,
      license_plate: "RX-666",
      fine_amount: 140,
      brand: "Car_Brand_test",
      category_id: "category_id"
    });
    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_Brand_test"
    });
    expect(cars).toEqual([car]);
  });
  it("Should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Car Description",
      daily_rate: 70,
      license_plate: "RX-666",
      fine_amount: 140,
      brand: "Car_Brand_test",
      category_id: "category_id"
    });
    const cars = await listAvailableCarsUseCase.execute({
      name: "Car3"
    });
    expect(cars).toEqual([car]);
  });
  it("Should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car4",
      description: "Car Description",
      daily_rate: 70,
      license_plate: "RX-666",
      fine_amount: 140,
      brand: "Car_Brand_test",
      category_id: "category_id"
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category_id"
    });
    expect(cars).toEqual([car]);
  });
});