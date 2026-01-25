import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuthAndMediaTable1769329729200 implements MigrationInterface {
  name = 'CreateAuthAndMediaTable1769329729200';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_gender_enum" AS ENUM('MALE', 'FEMALE')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('GUEST', 'USER', 'ADMIN')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "key_cloak_id" character varying, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "picture" character varying, "avatar_id" uuid, "email" character varying NOT NULL, "gender" "public"."users_gender_enum", "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER', "apple_user_identifier" character varying, "birthday" date, "phone_number" character varying, CONSTRAINT "UQ_eda3bfb3d124aeedfe5f10643bf" UNIQUE ("key_cloak_id"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."medias_file_type_enum" AS ENUM('image', 'video', 'pdf', 'other')`,
    );
    await queryRunner.query(
      `CREATE TABLE "medias" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "file_type" "public"."medias_file_type_enum" NOT NULL, "bucket" character varying NOT NULL, "file_name" character varying NOT NULL, "file_url" character varying NOT NULL, CONSTRAINT "PK_f27321557a66cd4fae9bc1ed6e7" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "medias"`);
    await queryRunner.query(`DROP TYPE "public"."medias_file_type_enum"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
    await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
  }
}
