import { MigrationInterface, QueryRunner } from "typeorm";

export class CompanyEnumTypeFeature1719479600352 implements MigrationInterface {
    name = 'CompanyEnumTypeFeature1719479600352'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "yearsOfOperation"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "numberOfEmployees"`);
        await queryRunner.query(`CREATE TYPE "public"."companies_yearsofoperationenum_enum" AS ENUM('0 years', '0 - 1 years', '2 - 3 years', '3 - 5 years', '5 - 8 years', 'More than 8 years')`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "yearsOfOperationEnum" "public"."companies_yearsofoperationenum_enum" NOT NULL DEFAULT '0 years'`);
        await queryRunner.query(`CREATE TYPE "public"."companies_numberofemployeesenum_enum" AS ENUM('1-10 employees', '11-50 employees', '51-200 employees', '201-500 employees', '501-1000 employees', '1001-5000 employees', '5001-10000 employees', '10001+ employees')`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "numberOfEmployeesEnum" "public"."companies_numberofemployeesenum_enum" NOT NULL DEFAULT '1-10 employees'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "numberOfEmployeesEnum"`);
        await queryRunner.query(`DROP TYPE "public"."companies_numberofemployeesenum_enum"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "yearsOfOperationEnum"`);
        await queryRunner.query(`DROP TYPE "public"."companies_yearsofoperationenum_enum"`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "numberOfEmployees" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "yearsOfOperation" integer NOT NULL`);
    }

}
