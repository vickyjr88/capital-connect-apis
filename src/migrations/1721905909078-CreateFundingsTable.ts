import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFundingsTable1721905909078 implements MigrationInterface {
    name = 'CreateFundingsTable1721905909078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "fundings" ("id" SERIAL NOT NULL, "minFunding" integer NOT NULL, "maxFunding" integer NOT NULL, CONSTRAINT "PK_9810270c14b02f5d6c4d47bafe4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "fundings"`);
    }

}
