import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyDifferentFundingVehiclesInvestorProfile1722497647759 implements MigrationInterface {
    name = 'ModifyDifferentFundingVehiclesInvestorProfile1722497647759'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "investor_profiles" DROP COLUMN "differentFundingVehicles"`);
        await queryRunner.query(`ALTER TABLE "investor_profiles" ADD "differentFundingVehicles" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "investor_profiles" DROP COLUMN "differentFundingVehicles"`);
        await queryRunner.query(`ALTER TABLE "investor_profiles" ADD "differentFundingVehicles" text array NOT NULL`);
    }

}
