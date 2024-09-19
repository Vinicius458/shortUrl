# Etapa 1: Build (dependências e compilação do TypeScript)
FROM node:20-alpine AS build

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copiar os arquivos de dependências
COPY package*.json ./

# Instalar dependências de produção e desenvolvimento
RUN npm install

# Copiar todo o código do projeto para dentro do contêiner
COPY . .

# Executar o build do projeto
RUN npm run build

# Etapa 2: Imagem final (somente os arquivos necessários para rodar o app)
FROM node:20-alpine AS production

# Definir o diretório de trabalho na imagem final
WORKDIR /usr/src/app

# Copiar apenas as dependências de produção da etapa de build
COPY --from=build /usr/src/app/package*.json ./
RUN npm install --only=production

# Copiar os arquivos do build para a imagem final
COPY --from=build /usr/src/app/dist ./dist

# Expor a porta usada pelo aplicativo
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "dist/main/server.js"]