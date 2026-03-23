# EduBlog API

API RESTful para gerenciamento de posts de um blog educacional, desenvolvida como parte do Tech Challenge — Fase 2 da pós-graduação em Arquitetura de Software.

---

## Sumário

- [Arquitetura do Sistema](#arquitetura-do-sistema)
- [Endpoints da API](#endpoints-da-api)
- [Como Executar](#como-executar)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Testes](#testes)
- [CI/CD](#cicd)
- [Relato de Experiências e Desafios](#relato-de-experiências-e-desafios)

---

## Arquitetura do Sistema

O projeto adota uma **arquitetura em camadas** inspirada nos princípios da **Clean Architecture**, separando claramente as responsabilidades entre as camadas de apresentação, regras de negócio e persistência de dados.

### Fluxo de uma Requisição

1. O cliente envia uma requisição HTTP para um endpoint da API.
2. O **Controller** (Fastify handler) valida os dados de entrada usando **Zod** e delega ao **Use Case** correspondente, instanciado via **Factory**.
3. O **Use Case** executa a regra de negócio e interage com o banco de dados por meio da interface `IPostsRepository`.
4. O **TypeORM Repository** traduz as operações para queries SQL no PostgreSQL.
5. O resultado percorre o caminho inverso até ser retornado ao cliente como JSON.

### Padrões Arquiteturais Aplicados

| Padrão                   | Descrição                                                                                                            |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| **Repository Pattern**   | Abstração do acesso a dados por meio de uma interface, permitindo trocar a implementação sem alterar os casos de uso |
| **Use Case Pattern**     | Cada regra de negócio isolada em uma classe com método `handler`, facilitando testes e manutenção                    |
| **Factory Pattern**      | Funções `make*UseCase()` responsáveis por montar o grafo de dependências (injeção de dependência manual)             |
| **Dependency Inversion** | Use cases dependem de interfaces, não de implementações concretas                                                    |
| **In-Memory Repository** | Implementação fake da interface para testes unitários rápidos e sem banco de dados                                   |

---

## Tecnologias Utilizadas

| Categoria           | Tecnologia              | Versão |
| ------------------- | ----------------------- | ------ |
| Runtime             | Node.js                 | 20     |
| Framework HTTP      | Fastify                 | 5.x    |
| ORM                 | TypeORM                 | 0.3.x  |
| Banco de dados      | PostgreSQL              | 16     |
| Linguagem           | TypeScript              | 5.4    |
| Validação de schema | Zod                     | 4.x    |
| Documentação da API | Swagger                 | —      |
| Testes              | Jest + ts-jest          | 30.x   |
| Build               | tsup                    | 8.x    |
| Containerização     | Docker + Docker Compose | —      |

---

## Endpoints da API

A documentação interativa completa está disponível em **`/docs`** (Swagger UI) ao rodar a aplicação.

| Método   | Rota                   | Descrição                            |
| -------- | ---------------------- | ------------------------------------ |
| `POST`   | `/posts`               | Cria um novo post                    |
| `GET`    | `/posts`               | Lista todos os posts (com paginação) |
| `GET`    | `/posts/:id`           | Busca um post pelo ID                |
| `PUT`    | `/posts/:id`           | Atualiza um post existente           |
| `DELETE` | `/posts/:id`           | Remove um post                       |
| `GET`    | `/posts/search?query=` | Busca posts por título ou conteúdo   |

### Exemplo de Payload — Criar Post

```json
POST /posts
{
  "title": "Introdução ao Clean Architecture",
  "content": "Clean Architecture é uma abordagem...",
  "author": "Nome do Autor"
}
```

### Exemplo de Resposta

```json
HTTP 201 Created
{
  "id": 1,
  "title": "Introdução ao Clean Architecture",
  "content": "Clean Architecture é uma abordagem...",
  "author": "Nome do Autor",
  "isPublished": false,
  "createdAt": "2026-03-23T10:00:00.000Z",
  "updatedAt": "2026-03-23T10:00:00.000Z"
}
```

---

## Como Executar

### Pré-requisitos

- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) instalados
- (Opcional) Node.js 20+ para execução local sem Docker

### Com Docker Compose (recomendado)

```bash
# Sobe a API e o banco de dados PostgreSQL
docker compose up
```

A API ficará disponível em `http://localhost:3000` e o Swagger em `http://localhost:3000/docs`.

O Docker Compose executa automaticamente as migrations antes de iniciar o servidor.

### Localmente (sem Docker)

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com as credenciais do seu PostgreSQL

# 3. Rodar as migrations
npm run migration:run

# 4. (Opcional) Popular o banco com dados iniciais
npm run seed

# 5. Iniciar o servidor em modo desenvolvimento
npm run start:dev
```

### Imagem Docker Hub

A imagem de produção está publicada em:

```
docker pull lucasalmada/edublog-api:latest
```

---

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

| Variável            | Descrição                       | Exemplo       |
| ------------------- | ------------------------------- | ------------- |
| `PORT`              | Porta em que a API será exposta | `3000`        |
| `NODE_ENV`          | Ambiente de execução            | `development` |
| `DATABASE_HOST`     | Host do PostgreSQL              | `localhost`   |
| `DATABASE_PORT`     | Porta do PostgreSQL             | `5432`        |
| `DATABASE_NAME`     | Nome do banco de dados          | `edublog`     |
| `DATABASE_USER`     | Usuário do banco                | `postgres`    |
| `DATABASE_PASSWORD` | Senha do banco                  | `postgres`    |

---

## Testes

O projeto conta com testes unitários para todos os use cases, utilizando o repositório in-memory para isolar a lógica de negócio.

```bash
# Rodar todos os testes
npm test

# Rodar com relatório de cobertura
npm run test:coverage
```

Os testes cobrem os cenários principais de cada use case: criação, atualização, deleção, listagem, busca por ID e busca por query, incluindo cenários de erro como recurso não encontrado (`ResourceNotFoundError`).

---

## CI/CD

O projeto utiliza **GitHub Actions** com duas pipelines:

### CI — Integração Contínua

Ativada em pushes e pull requests para as branches `main` e `develop`:

1. **Lint** — Verifica conformidade com ESLint + Prettier
2. **Test** — Executa os testes com cobertura e faz upload do artefato de coverage
3. **Build** — Compila o TypeScript com `tsup`

### CD — Entrega Contínua

Ativada em pushes para `main`:

1. Constrói a imagem Docker no target `production`
2. Publica no Docker Hub com as tags `latest` e `sha-<commit>`

---

## Relato de Experiências e Desafios

Um dos principais desafios desse projeto foi construir uma API usando JavaScript, principalmente porque, diferente de frameworks como o Ruby on Rails, não existe uma estrutura tão bem definida ou cheia de convenções. Usando Fastify com TypeORM, ficou bem claro que a organização do projeto depende muito mais das decisões do próprio desenvolvedor.

Outro ponto desafiador foi a criação das imagens Docker para os ambientes de desenvolvimento e produção. Tive que pesquisar bastante e ler documentação para entender as melhores práticas e conseguir montar um setup consistente entre os ambientes.
