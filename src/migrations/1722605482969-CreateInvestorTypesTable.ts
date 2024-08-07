import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInvestorTypesTable1722605482969 implements MigrationInterface {
    name = 'CreateInvestorTypesTable1722605482969'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "investor-types" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text, CONSTRAINT "PK_f6c66d422003846eb985e1b9097" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "investor-types"`);
    }

}
