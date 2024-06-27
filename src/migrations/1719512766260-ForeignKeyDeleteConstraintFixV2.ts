import { MigrationInterface, QueryRunner } from "typeorm";

export class ForeignKeyDeleteConstraintFixV21719512766260 implements MigrationInterface {
    name = 'ForeignKeyDeleteConstraintFixV21719512766260'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submission" DROP CONSTRAINT "FK_e2589bedf8766da0d54841c79df"`);
        await queryRunner.query(`ALTER TABLE "submission" DROP CONSTRAINT "FK_c2ab2118f46f205bfd6a1039e9e"`);
        await queryRunner.query(`ALTER TABLE "submission" ADD CONSTRAINT "FK_e2589bedf8766da0d54841c79df" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "submission" ADD CONSTRAINT "FK_c2ab2118f46f205bfd6a1039e9e" FOREIGN KEY ("answerId") REFERENCES "answers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submission" DROP CONSTRAINT "FK_c2ab2118f46f205bfd6a1039e9e"`);
        await queryRunner.query(`ALTER TABLE "submission" DROP CONSTRAINT "FK_e2589bedf8766da0d54841c79df"`);
        await queryRunner.query(`ALTER TABLE "submission" ADD CONSTRAINT "FK_c2ab2118f46f205bfd6a1039e9e" FOREIGN KEY ("answerId") REFERENCES "answers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "submission" ADD CONSTRAINT "FK_e2589bedf8766da0d54841c79df" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
