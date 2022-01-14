"use strict";

var _tsyringe = require("tsyringe");

require("./providers");

var _UsersRepository = require("@modules/accounts/infra/typeorm/repositories/UsersRepository");

var _UsersTokensRepository = require("@modules/accounts/infra/typeorm/repositories/UsersTokensRepository");

var _CarsImageRepository = require("@modules/cars/infra/typeorm/repositories/CarsImageRepository");

var _CarsRepository = require("@modules/cars/infra/typeorm/repositories/CarsRepository");

var _CategoriesRepository = require("@modules/cars/infra/typeorm/repositories/CategoriesRepository");

var _SpecificationsRepository = require("@modules/cars/infra/typeorm/repositories/SpecificationsRepository");

var _RentalsRepository = require("@modules/rentals/infra/typeorm/repositories/RentalsRepository");

_tsyringe.container.registerSingleton("CategoriesRepository", (0, _tsyringe.delay)(() => _CategoriesRepository.CategoriesRepository));

_tsyringe.container.registerSingleton("SpecificationsRepository", (0, _tsyringe.delay)(() => _SpecificationsRepository.SpecificationsRepository));

_tsyringe.container.registerSingleton("UsersRepository", (0, _tsyringe.delay)(() => _UsersRepository.UsersRepository));

_tsyringe.container.registerSingleton("CarsImagesRepository", (0, _tsyringe.delay)(() => _CarsImageRepository.CarsImagesRepository));

_tsyringe.container.registerSingleton("RentalsRepository", (0, _tsyringe.delay)(() => _RentalsRepository.RentalsRepository));

_tsyringe.container.registerSingleton("UsersTokensRepository", (0, _tsyringe.delay)(() => _UsersTokensRepository.UsersTokensRepository));

_tsyringe.container.registerSingleton("CarsRepository", (0, _tsyringe.delay)(() => _CarsRepository.CarsRepository));