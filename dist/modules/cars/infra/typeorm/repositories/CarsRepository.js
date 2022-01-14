"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepository = void 0;

var _typeorm = require("typeorm");

var _Car = require("../entities/Car");

class CarsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Car.Car);
  }

  async create({
    brand,
    category_id,
    description,
    daily_rate,
    fine_amount,
    name,
    license_plate,
    specifications,
    id
  }) {
    const car = this.repository.create({
      brand,
      category_id,
      description,
      daily_rate,
      fine_amount,
      name,
      license_plate,
      specifications,
      id
    });
    await this.repository.save(car);
    return car;
  }

  async findByLicensePlate(license_plate) {
    const car = await this.repository.findOne({
      license_plate
    });
    return car;
  }

  async findAvailable(brand, category_id, name) {
    const carsQuery = await this.repository.createQueryBuilder("c").where("available = :available", {
      available: true
    }); // for (let i = 0; i < arguments.length; i++) {
    //     let name = i==0 ? 'brand' : i==1 ? 'category_id' : 'name'
    //     let value = arguments[i];
    //     if (value != null) {
    //         carsQuery.andWhere(`c.${name} = :value`, { value });
    //     }
    // }

    if (brand) {
      carsQuery.andWhere("c.brand = :brand", {
        brand
      });
    }

    if (category_id) {
      carsQuery.andWhere("c.category_id = :category_id", {
        category_id
      });
    }

    if (name) {
      carsQuery.andWhere("c.name = :name", {
        name
      });
    }

    const cars = await carsQuery.getMany();
    return cars;
  }

  async findById(car_id) {
    const car = await this.repository.findOne(car_id);
    return car;
  }

  async updateAvailable(id, available) {
    await this.repository.createQueryBuilder().update().set({
      available
    }).where("id = :id").setParameters({
      id
    }).execute();
  }

}

exports.CarsRepository = CarsRepository;