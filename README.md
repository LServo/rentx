# CADASTRO DE CARRO

**RF**
-> Deve ser possível cadastrar um novo carro 

**RNF**
->

**RN** 
-> Não deve ser possível cadastrar um carro com uma placa já existente
-> Carros devem ser cadastrados como disponível, por padrão
-> O usuário responsável peloc adastro deve ser um administrador

---

# Listagem de Carros

**RF**
-> Deve ser possível listar todos os carros disponíveis
-> Deve ser possível listar todos os carros disponíveis pelo nome da categoria
-> Deve ser possível listar todos os carros disponíveis pelo nome da marca
-> Deve ser possível listar todos os carros disponíveis pelo nome da carro

**RNF**
-> 

**RN**
-> O usuário não precisa estar logado no sistema

---

# Cadastro de Especificação de Carros

**RF**
-> Deve ser possível cadastrar uma especificaçao para um carro

**RNF**
->

**RN**
-> O usuário responsável peloc adastro deve ser um administrador
-> Não deve ser possível cadastrar uma especificação para um carro não cadastrado
-> Não deve ser possível cadastrar uma espeficicação já existente para um mesmo carro

---

# Cadastro de Imagens do Carro

**RF**
-> Deve ser possível cadastrar imagens do carro
-> Deve ser possível listar todos os carros

**RNF**
-> Utilizar o multer para upload dos arquivos

**RN**
-> Usuário deve poder cadastrar mais de uma imagem para o mesmo carro
-> O usuário responsável peloc adastro deve ser um administrador

---

# Aluguel de Carro

**RF**
-> Deve ser possível cadastrar um aluguel

**RNF**
-> 

**RN**
-> O aluguel deve ter duração mínima de 24h
-> O usuário deve estar logado na aplicação
-> Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível
-> Não deve ser possívle cadastrar um novo aluguel caso já exista um em aberto para o mesmo usuário
-> Não deve ser possívle cadastrar um novo aluguel caso já exista um em aberto para o mesmo carro

---

# Devolução de carro

**RF**
-> Deve ser possível realizar a devolução de um carro

**RN**
-> Se o carro for devoltido com menos de 24 horas, deverá ser cobrada a diária completa
-> Ao realizar a devolução, o carro deverá ser liberado para outro aluguel
-> Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel
-> Ao realizar a devolução, deverá ser calculado o total do aluguel
-> Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrada multa proporcional aos dias de atraso
-> Caso haja multi, deverá ser somado ao total do aluguel

---

# Listagem de Aluguéis para Usuário

**RF**
-> Deve ser possível realizar a busca de todos os aluguéis para o usuário

**RN**
-> O usuário deve estar logado na aplicação