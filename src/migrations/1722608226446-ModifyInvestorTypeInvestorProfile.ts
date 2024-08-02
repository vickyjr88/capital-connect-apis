import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyInvestorTypeInvestorProfile1722608226446 implements MigrationInterface {
    name = 'ModifyInvestorTypeInvestorProfile1722608226446'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "investor_profiles" DROP COLUMN "investorType"`);
        await queryRunner.query(`ALTER TABLE "investor_profiles" ADD "investorType" text array NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "investor_profiles" DROP COLUMN "investorType"`);
        await queryRunner.query(`ALTER TABLE "investor_profiles" ADD "investorType" character varying NOT NULL`);
    }

}
