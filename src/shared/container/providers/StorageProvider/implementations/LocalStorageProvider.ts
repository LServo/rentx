import fs from "fs";
import { resolve } from "path";

import upload from "@config/upload";

import { IStorageProvider } from "../IStorageProvider";

class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      resolve(upload.tmpFolder, file), // tirando o arquivo desta pasta
      resolve(`${upload.tmpFolder}/${folder}`, file) // passando para essa
    );

    return file;
  }
  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${upload.tmpFolder}/${folder}`, file); // passando para essa

    try {
      await fs.promises.stat(filename); // tenta retornar informações sobre o arquivo
    } catch {
      return; // se não conseguir é porque já foi deletado, então, apenas retorna
    }

    await fs.promises.unlink(filename); // se conseguir é porque o arquivo existe, então, deleta
  }
}

export { LocalStorageProvider };
