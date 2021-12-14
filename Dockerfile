# Imagem a ser utilizada
FROM node

# Diretório aonde as informações do app estarão contidas!
WORKDIR /usr/app

# Queremos que o container seja responsável por baixar e instalar as dependências, por isso, copiamos apenas o pakcage json para o workdir
COPY package.json ./

# Nem todas as imagens já vem como o yarn instalado, por isso, aqui utilizamos o npm
RUN npm install

# Copiamos tudo para a pasta raiz criada! (Tudo exceto o que foi setado no .dockerignore)
COPY . .

# Damos um expose na porta que estamos utilizando, que no caso é a 3000
EXPOSE 3000

# O cmd permite que seja possível rodar comandos/scripts
CMD [ "npm", "run", "dev" ]