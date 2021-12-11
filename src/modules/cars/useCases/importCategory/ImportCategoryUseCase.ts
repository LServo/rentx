import { parse as csvParse } from "csv-parse";
import fs from "fs";

class ImportCategoryUseCase {
    execute(file: Express.Multer.File): void {
        const stream = fs.createReadStream(file.path);
        const parseFile = csvParse(); // por padrão o método já reconhece que o delimitador á a vírgula, então não precisamos passar nada

        stream.pipe(parseFile);

        parseFile.on("data", async (line) => {
            console.log(line);
        });
    }
}

export { ImportCategoryUseCase };
