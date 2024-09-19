# Usar uma imagem base leve como Alpine
FROM alpine:3.18

# Instalar o SQLite
RUN apk add --no-cache sqlite

# Criar diretório para armazenar o banco de dados
RUN mkdir -p /usr/src/app/database

# Definir o diretório de trabalho
WORKDIR /usr/src/app

# Comando para manter o contêiner rodando (em modo shell)
CMD ["sqlite3", "/usr/src/app/database/database.db"]