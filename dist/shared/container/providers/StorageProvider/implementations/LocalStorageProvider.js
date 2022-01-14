"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocalStorageProvider = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = require("path");

var _upload = _interopRequireDefault(require("@config/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LocalStorageProvider {
  async save(file, folder) {
    await _fs.default.promises.rename((0, _path.resolve)(_upload.default.tmpFolder, file), // tirando o arquivo desta pasta
    (0, _path.resolve)(`${_upload.default.tmpFolder}/${folder}`, file) // passando para essa
    );
    return file;
  }

  async delete(file, folder) {
    const filename = (0, _path.resolve)(`${_upload.default.tmpFolder}/${folder}`, file); // passando para essa

    try {
      await _fs.default.promises.stat(filename); // tenta retornar informações sobre o arquivo
    } catch {
      return; // se não conseguir é porque já foi deletado, então, apenas retorna
    }

    await _fs.default.promises.unlink(filename); // se conseguir é porque o arquivo existe, então, deleta
  }

}

exports.LocalStorageProvider = LocalStorageProvider;