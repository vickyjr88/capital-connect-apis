import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLastNameAndRolesToUsers1717494716371 implements MigrationInterface {
    name = 'AddLastNameAndRolesToUsers1717494716371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "lastName" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "roles" character varying NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roles"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastName"`);
    }

}
