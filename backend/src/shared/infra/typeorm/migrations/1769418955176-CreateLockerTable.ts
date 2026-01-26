import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLockerTable1769418955176 implements MigrationInterface {
  name = 'CreateLockerTable1769418955176';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."lockers_size_enum" AS ENUM('SMALL', 'MEDIUM', 'LARGE')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."lockers_status_enum" AS ENUM('AVAILABLE', 'IN_USE', 'MAINTENANCE')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."lockers_door_state_enum" AS ENUM('OPEN', 'CLOSED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "lockers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "code" character varying NOT NULL, "location" character varying NOT NULL, "size" "public"."lockers_size_enum" NOT NULL, "esp32_id" character varying NOT NULL, "relay_pin" integer NOT NULL, "sensor_pin" integer NOT NULL, "status" "public"."lockers_status_enum" NOT NULL, "door_state" "public"."lockers_door_state_enum" NOT NULL, CONSTRAINT "UQ_912c3fffc19ebb1c405b6f68242" UNIQUE ("code"), CONSTRAINT "UQ_79f3fbb450b51122ddcc3297426" UNIQUE ("esp32_id"), CONSTRAINT "PK_6424129dcf95d459db621073f8a" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "lockers"`);
    await queryRunner.query(`DROP TYPE "public"."lockers_door_state_enum"`);
    await queryRunner.query(`DROP TYPE "public"."lockers_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."lockers_size_enum"`);
  }
}
