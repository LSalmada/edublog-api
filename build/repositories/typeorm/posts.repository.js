"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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

// src/repositories/typeorm/posts.repository.ts
var posts_repository_exports = {};
__export(posts_repository_exports, {
  PostsRepository: () => PostsRepository
});
module.exports = __toCommonJS(posts_repository_exports);

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

// src/repositories/typeorm/posts.repository.ts
var PostsRepository = class {
  constructor() {
    this.repository = appDataSource.getRepository(Post);
  }
  async create(post) {
    return this.repository.save(post);
  }
  async findAll(page, limit) {
    return this.repository.find({ skip: (page - 1) * limit, take: limit });
  }
  async findById(id) {
    return this.repository.findOne({ where: { id } });
  }
  async update(post) {
    return this.repository.save(post);
  }
  async delete(id) {
    await this.repository.delete(id);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PostsRepository
});
