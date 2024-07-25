import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStagesTable1721752231090 implements MigrationInterface {
    name = 'CreateStagesTable1721752231090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stages" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text, CONSTRAINT "PK_16efa0f8f5386328944769b9e6d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "stages"`);
    }

}
