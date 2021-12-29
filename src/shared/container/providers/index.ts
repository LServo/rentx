import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "./StorageProvider/implementations/S3StorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
);

container.registerInstance<IMailProvider>(
    "EtherealMailProvider",
    new EtherealMailProvider()
);
// precisa ser injetado assim que a aplicação é iniciado, para que seja possível criar o client antes que o sendMail seja chamado
// mesmo utilizando o registerInstance, o tsyringe vai utilizar o conceito de singleton, então o EtherealMailProvider só vai ser instanciado uma vez

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    S3StorageProvider
);
// "LocalStorageProvider" -> Trocar para "S3StorageProvider" caso queira testar antes de implementar completamente
