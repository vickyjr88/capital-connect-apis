import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBusinessSubsectorToCompanies1721195491215 implements MigrationInterface {
    name = 'AddBusinessSubsectorToCompanies1721195491215'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ADD "businessSubsector" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "businessSubsector"`);
    }

}
