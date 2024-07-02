import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRecomendationToAnswers1719852781027 implements MigrationInterface {
    name = 'AddRecomendationToAnswers1719852781027'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answers" ADD "recommendation" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answers" DROP COLUMN "recommendation"`);
    }

}
