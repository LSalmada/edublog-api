import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreatePostsTable1773801502493 implements MigrationInterface {
  name = 'CreatePostsTable1773801502493'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" BIGSERIAL NOT NULL, "title" text NOT NULL, "content" text NOT NULL, "author" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "is_published" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "posts"`)
  }
}
