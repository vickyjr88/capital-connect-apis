import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateScoringTable1720689116558 implements MigrationInterface {
    name = 'CreateScoringTable1720689116558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."scorings_type_enum" AS ENUM('ELIGIBILITY', 'PREPAREDNESS')`);
        await queryRunner.query(`CREATE TABLE "scorings" ("id" SERIAL NOT NULL, "score" character varying NOT NULL, "comment" character varying NOT NULL, "implication" text, "action" text, "recommendation" text, "type" "public"."scorings_type_enum" NOT NULL, CONSTRAINT "PK_a4ef90be23d1d879ae31098654d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "scorings"`);
        await queryRunner.query(`DROP TYPE "public"."scorings_type_enum"`);
    }

}
