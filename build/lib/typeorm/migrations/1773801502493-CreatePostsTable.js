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

// src/lib/typeorm/migrations/1773801502493-CreatePostsTable.ts
var CreatePostsTable_exports = {};
__export(CreatePostsTable_exports, {
  CreatePostsTable1773801502493: () => CreatePostsTable1773801502493
});
module.exports = __toCommonJS(CreatePostsTable_exports);
var CreatePostsTable1773801502493 = class {
  constructor() {
    this.name = "CreatePostsTable1773801502493";
  }
  async up(queryRunner) {
    await queryRunner.query(`CREATE TABLE "posts" ("id" BIGSERIAL NOT NULL, "title" text NOT NULL, "content" text NOT NULL, "author" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_published" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
  }
  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE "posts"`);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreatePostsTable1773801502493
});
