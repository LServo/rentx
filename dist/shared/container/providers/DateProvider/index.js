"use strict";

var _tsyringe = require("tsyringe");

var _DayjsDateProvider = require("./implementations/DayjsDateProvider");

_tsyringe.container.registerSingleton("DayjsDateProvider", (0, _tsyringe.delay)(() => _DayjsDateProvider.DayjsDateProvider));