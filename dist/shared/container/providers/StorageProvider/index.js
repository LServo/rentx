"use strict";

var _tsyringe = require("tsyringe");

var _LocalStorageProvider = require("./implementations/LocalStorageProvider");

var _S3StorageProvider = require("./implementations/S3StorageProvider");

const diskStorage = {
  local: _tsyringe.container.resolve(_LocalStorageProvider.LocalStorageProvider),
  s3: _tsyringe.container.resolve(_S3StorageProvider.S3StorageProvider)
};

_tsyringe.container.registerInstance("StorageProvider", diskStorage[process.env.disk]);