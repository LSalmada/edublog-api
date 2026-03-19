"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// src/app.ts
var app_exports = {};
__export(app_exports, {
  app: () => app
});
module.exports = __toCommonJS(app_exports);
var import_reflect_metadata = require("reflect-metadata");
var import_fastify = __toESM(require("fastify"));

// src/lib/typeorm/typeorm.ts
var import_typeorm2 = require("typeorm");

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["development", "production", "test"]).default("development"),
  PORT: import_zod.z.coerce.number().default(3e3),
  DATABASE_USER: import_zod.z.string(),
  DATABASE_PASSWORD: import_zod.z.string(),
  DATABASE_NAME: import_zod.z.string(),
  DATABASE_HOST: import_zod.z.string(),
  DATABASE_PORT: import_zod.z.coerce.number()
});
var _env = envSchema.safeParse(process.env);
if (!_env.success) {
  console.error("Invalid environment variables", _env.error.format());
  throw new Error("Invalid environment variables");
}
var env = _env.data;

// src/entities/post.entity.ts
var import_typeorm = require("typeorm");
var Post = class {
};
__decorateClass([
  (0, import_typeorm.PrimaryGeneratedColumn)("increment", { name: "id", type: "bigint" })
], Post.prototype, "id", 2);
__decorateClass([
  (0, import_typeorm.Column)({ name: "title", type: "text" })
], Post.prototype, "title", 2);
__decorateClass([
  (0, import_typeorm.Column)({ name: "content", type: "text" })
], Post.prototype, "content", 2);
__decorateClass([
  (0, import_typeorm.Column)({ name: "author", type: "text" })
], Post.prototype, "author", 2);
__decorateClass([
  (0, import_typeorm.CreateDateColumn)({ name: "created_at", type: "timestamptz" })
], Post.prototype, "createdAt", 2);
__decorateClass([
  (0, import_typeorm.UpdateDateColumn)({ name: "updated_at", type: "timestamptz" })
], Post.prototype, "updatedAt", 2);
__decorateClass([
  (0, import_typeorm.Column)({ name: "is_published", type: "boolean", default: false })
], Post.prototype, "isPublished", 2);
Post = __decorateClass([
  (0, import_typeorm.Entity)({ name: "posts" })
], Post);

// src/lib/typeorm/typeorm.ts
var appDataSource = new import_typeorm2.DataSource({
  type: "postgres",
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  entities: [Post],
  migrations: ["src/lib/typeorm/migrations/*.ts"],
  logging: env.NODE_ENV === "development"
});
appDataSource.initialize().then(() => {
  console.log("Database with typeorm connected");
}).catch((error) => {
  console.error("Error connecting to database with typeorn", error);
});

// src/utils/global-error-handler.ts
var import_zod2 = require("zod");
var import_process = require("process");
var errorHandlerMap = {
  ZodError: (error, _, reply) => {
    return reply.status(400).send({
      message: "Validation error",
      ...error instanceof import_zod2.ZodError && { error: error.format() }
    });
  },
  ResourceNotFoundError: (error, _, reply) => {
    return reply.status(404).send({ message: error.message });
  }
};
var globalErrorHandler = (error, _, reply) => {
  if (import_process.env.NODE_ENV === "development") {
    console.error(error);
  }
  const handler = errorHandlerMap[error.constructor.name];
  if (handler)
    return handler(error, _, reply);
  return reply.status(500).send({ message: "Internal server error." });
};

// src/use-cases/errors/resource-not-found-error.ts
var ResourceNotFoundError = class extends Error {
  constructor() {
    super("Resource not found");
  }
};

// src/repositories/typeorm/posts.repository.ts
var PostsRepository = class {
  constructor() {
    this.repository = appDataSource.getRepository(Post);
  }
  async create(post) {
    return this.repository.save(post);
  }
  async listAllPosts(page, limit) {
    return this.repository.find({ skip: (page - 1) * limit, take: limit });
  }
  async findById(id) {
    return this.repository.findOne({ where: { id } });
  }
  async update(post) {
    const postToUpdate = await this.repository.findOne({ where: { id: post.id } });
    if (!postToUpdate) {
      throw new ResourceNotFoundError();
    }
    postToUpdate.title = post.title;
    postToUpdate.content = post.content;
    postToUpdate.author = post.author;
    postToUpdate.updatedAt = /* @__PURE__ */ new Date();
    postToUpdate.isPublished = post.isPublished ?? false;
    return this.repository.save(postToUpdate);
  }
  async delete(id) {
    await this.repository.delete(id);
  }
};

// src/use-cases/create-post.ts
var CreatePostUseCase = class {
  constructor(postsRepository) {
    this.postsRepository = postsRepository;
  }
  async handler(post) {
    return this.postsRepository.create(post);
  }
};

// src/use-cases/factory/make-create-post-use-case.ts
function makeCreatePostUseCase() {
  const postsRepository = new PostsRepository();
  const createPostUseCase = new CreatePostUseCase(postsRepository);
  return createPostUseCase;
}

// src/http/controllers/posts/create.ts
var import_zod3 = require("zod");
async function create(request, reply) {
  const registerBodySchema = import_zod3.z.object({
    title: import_zod3.z.string(),
    content: import_zod3.z.string(),
    author: import_zod3.z.string()
  });
  const { title, content, author } = registerBodySchema.parse(request.body);
  const createPostUseCase = makeCreatePostUseCase();
  const post = await createPostUseCase.handler({ title, content, author });
  return reply.status(201).send(post);
}

// src/http/controllers/posts/update.ts
var import_zod4 = require("zod");

// src/use-cases/update-post.ts
var UpdatePostUseCase = class {
  constructor(postsRepository) {
    this.postsRepository = postsRepository;
  }
  async handler(post) {
    return this.postsRepository.update(post);
  }
};

// src/use-cases/factory/make-update-post-use-case.ts
function makeUpdatePostUseCase() {
  const postsRepository = new PostsRepository();
  const updatePostUseCase = new UpdatePostUseCase(postsRepository);
  return updatePostUseCase;
}

// src/http/controllers/posts/update.ts
async function update(request, reply) {
  const paramsSchema = import_zod4.z.object({
    id: import_zod4.z.coerce.number()
  });
  const updateBodySchema = import_zod4.z.object({
    title: import_zod4.z.string(),
    content: import_zod4.z.string(),
    author: import_zod4.z.string()
  });
  const { id } = paramsSchema.parse(request.params);
  const { title, content, author } = updateBodySchema.parse(request.body);
  const updatePostUseCase = makeUpdatePostUseCase();
  const post = await updatePostUseCase.handler({
    id,
    title,
    content,
    author,
    updatedAt: /* @__PURE__ */ new Date()
  });
  return reply.status(200).send(post);
}

// src/use-cases/list-all-posts.ts
var ListAllPostsUseCase = class {
  constructor(postsRepository) {
    this.postsRepository = postsRepository;
  }
  async handler(page, limit) {
    return this.postsRepository.listAllPosts(page, limit);
  }
};

// src/use-cases/factory/make-list-all-posts-use-case.ts
function makeListAllPostsUseCase() {
  const postsRepository = new PostsRepository();
  const listAllPostsUseCase = new ListAllPostsUseCase(postsRepository);
  return listAllPostsUseCase;
}

// src/http/controllers/posts/list-all-posts.ts
var import_zod5 = require("zod");
async function listAllPosts(request, reply) {
  const listAllPostsQuerySchema = import_zod5.z.object({
    page: import_zod5.z.coerce.number().default(1),
    limit: import_zod5.z.coerce.number().default(10)
  });
  const { page, limit } = listAllPostsQuerySchema.parse(request.query);
  const listAllPostsUseCase = makeListAllPostsUseCase();
  const posts = await listAllPostsUseCase.handler(page, limit);
  return reply.status(200).send(posts);
}

// src/http/controllers/posts/routes.ts
async function postRoutes(app2) {
  app2.post("/posts", create);
  app2.put("/posts/:id", update);
  app2.get("/posts", listAllPosts);
}

// src/app.ts
var app = (0, import_fastify.default)();
app.register(postRoutes);
app.setErrorHandler(globalErrorHandler);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  app
});
