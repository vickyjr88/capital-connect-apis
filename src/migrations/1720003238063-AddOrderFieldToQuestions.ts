import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderFieldToQuestions1720003238063 implements MigrationInterface {
    name = 'AddOrderFieldToQuestions1720003238063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" ADD "order" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "order"`);
    }

}
