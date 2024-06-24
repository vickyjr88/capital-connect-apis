import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTextToSubmission1719234014525 implements MigrationInterface {
    name = 'AddTextToSubmission1719234014525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submission" ADD "text" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submission" DROP COLUMN "text"`);
    }

}
