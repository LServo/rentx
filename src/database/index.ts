import { createConnection, getConnectionOptions } from "typeorm";

interface IOptions {
    host: string; // por padrão é uma propriedade readonly por isso precisamos passá-lo pela interface, já que não é possível sobrescrevê-lo
}

getConnectionOptions().then((options) => {
    const newOptions = options as IOptions; // newOptions e Options passam a se comportar como o mesmo objeto, desta forma sobrescrevemos o valor de host
    newOptions.host = "database_ignite"; // nome do banco de dados
    createConnection({
        ...options,
    });
});
