import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInvestmentStructuresTable1721743653866 implements MigrationInterface {
    name = 'CreateInvestmentStructuresTable1721743653866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "investment-structures" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text, CONSTRAINT "PK_e9547cb0a565f540ecc5ac00457" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "investment-structures"`);
    }
}
