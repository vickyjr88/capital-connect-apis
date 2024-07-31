import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFundingVehiclesTable1722411910071 implements MigrationInterface {
    name = 'CreateFundingVehiclesTable1722411910071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "funding-vehicles" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text, CONSTRAINT "PK_a494386c4a3ab9e98c247002371" PRIMARY KEY ("id"))`);
        }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "funding-vehicles"`);
        }
}
