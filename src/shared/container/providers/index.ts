import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";

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
