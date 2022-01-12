import { container } from "tsyringe";

import { IMailProvider } from "./IMailProvider";
import { EtherealMailProvider } from "./implementations/EtherealMailProvider";
import { SESMailProvider } from "./implementations/SESMailProvider";

const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  "MailProvider",
  mailProvider[process.env.mail]
);
// precisa ser injetado assim que a aplicação é iniciado, para que seja possível criar o client antes que o sendMail seja chamado
// mesmo utilizando o registerInstance, o tsyringe vai utilizar o conceito de singleton, então o EtherealMailProvider só vai ser instanciado uma vez
