import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTootipFieldToQuestions1720079827358 implements MigrationInterface {
    name = 'AddTootipFieldToQuestions1720079827358'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" ADD "tooltip" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "tooltip"`);
    }

}
