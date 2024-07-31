import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEsgFocusAreasTable1722417406016 implements MigrationInterface {
    name = 'CreateEsgFocusAreasTable1722417406016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "esg-focus-areas" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text, CONSTRAINT "PK_010102f4a3aa06379cd66e610e5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "esg-focus-areas"`);
    }

}
