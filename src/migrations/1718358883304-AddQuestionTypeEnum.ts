import { MigrationInterface, QueryRunner } from "typeorm";

export class AddQuestionTypeEnum1718358883304 implements MigrationInterface {
    name = 'AddQuestionTypeEnum1718358883304'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."questions_type_enum" AS ENUM('MULTIPLE_CHOICE', 'SINGLE_CHOICE', 'TRUE_FALSE', 'SHORT_ANSWER')`);
        await queryRunner.query(`ALTER TABLE "questions" ADD "type" "public"."questions_type_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."questions_type_enum"`);
    }

}
