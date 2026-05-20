import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUsersTable1773801502494 implements MigrationInterface {
  name = 'CreateUsersTable1773801502494'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" BIGSERIAL NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "password_hash" text NOT NULL, "role" text NOT NULL DEFAULT 'teacher', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_users_email" UNIQUE ("email"), CONSTRAINT "PK_users_id" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`)
  }
}
