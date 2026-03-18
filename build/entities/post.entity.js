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

// src/entities/post.entity.ts
var post_entity_exports = {};
__export(post_entity_exports, {
  Post: () => Post
});
module.exports = __toCommonJS(post_entity_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Post
});
