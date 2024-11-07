# URL Shortener System
## Visão Geral
Este projeto implementa um sistema de encurtamento de URLs desenvolvido em Node.js, com a intenção de tornar URLs longas mais curtas e fáceis de compartilhar. O sistema está projetado para ser escalável verticalmente, permitindo o cadastro e autenticação de usuários, além de gerenciamento de URLs encurtadas. O sistema também conta com uma contagem de acessos, listagem e funcionalidade de exclusão lógica para URLs.
## Estrutura da Arquitetura
O sistema é dividido em serviços desacoplados, no qual respeitam designs e arquitetura, tais como domain driven design, clean architecture e SOLID.
- Node.js e express para a implementação da API, ideal para o padrão do projeto.
- TypeOrm e SQLite como banco de dados relacional para persistência. Escolhido em razões do porte do projeto.
- Docker e Docker Compose para orquestração e gerenciamento de contêineres, o que facilita o desenvolvimento e a implantação.
- Utilização de outros design patter como Abstract Factory, Adapters, TDD, Composite Validator.

## Funcionalidades

- **Cadastro e Autenticação de Usuários:** Os usuários podem se cadastrar e realizar login. O sistema utiliza autenticação via Bearer Token.

- **Encurtamento de URL:** Qualquer usuário, autenticado ou não, pode encurtar URLs para um máximo de 6 caracteres. Usuários autenticados terão seus URLs associados à sua conta.

- **Gerenciamento de URLs para Usuários Autenticados:**
  - Listar URLs encurtadas com contagem de acessos.
  - Excluir URLs encurtadas.
    
- **Redirecionamento:** URLs encurtadas redirecionam para o URL original e incrementam o contador de acessos.

## Instruções para Execução
   
## Configuração e Instalação
Para configurar e rodar o sistema, siga os passos abaixo:
1. Clone o repositório do projeto.
   ```bash
    git clone https://github.com/Vinicius458/shortUrl.git
    cd shortUrl
   
 2. Execute o comando para iniciar os contêineres:
    ```bash
    docker-compose up --build

 3. A aplicação estará disponível na porta 5050.

## API Endpoints
Para fazer uma requisição, basta colocar: localhost:5050/api/rota_desejada

### 1. Autenticação

#### Registro de Usuário
- **POST api/auth/signup** - Criação de um novo usuário.

   ```bash
   curl -X POST http://localhost:5050/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"seu-nome", "email": "seu-email@example.com", "password": "sua-senha"}'

#### Login de Usuário
- **POST api/auth/login** - Acessa a conta do usuário.

   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "seu-email@example.com", "password": "sua-senha"}'


### 2. Encurtal URL
- **POST api/url/shorten** - Cria uma URL encurtada. Disponível para usuários autenticados e não autenticados. Usuários autenticados terão a URL associada à sua conta.

   ```bash
   curl -X POST http://localhost:5050/api/url/shorten \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{"url": "https://exemplo.com/longo-url"}'

### 3. Gerenciamento de URLs (Apenas para Usuários Autenticados)
- **GET api/url** - Retorna todas as URLs encurtadas do usuário autenticado, incluindo a contagem de acessos.

   ```bash
   curl -X GET http://localhost:5050/api/url \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

- **DELETE api/url** - Deleta todas URLs registrados ao usuário 

   ```bash
   curl -X DELETE http://localhost:5050/api/url \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

### 4. Redirecionamento
#### Acessar uma URL Encurtada
- **GET api/** - Redireciona para a URL original e incrementa o contador de acessos.

   ```bash
   curl -X GET http://localhost:5050/:shortUrl


