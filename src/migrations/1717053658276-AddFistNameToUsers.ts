import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFistNameToUsers1717053658276 implements MigrationInterface {
    name = 'AddFistNameToUsers1717053658276'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "firstName" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstName"`);
    }

}
