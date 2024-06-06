import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSubmissionsTable1717659360859 implements MigrationInterface {
    name = 'CreateSubmissionsTable1717659360859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "submission" ("id" SERIAL NOT NULL, "userId" integer, "questionId" integer, "answerId" integer, CONSTRAINT "PK_7faa571d0e4a7076e85890c9bd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "submission" ADD CONSTRAINT "FK_7bd626272858ef6464aa2579094" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "submission" ADD CONSTRAINT "FK_e2589bedf8766da0d54841c79df" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "submission" ADD CONSTRAINT "FK_c2ab2118f46f205bfd6a1039e9e" FOREIGN KEY ("answerId") REFERENCES "answers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submission" DROP CONSTRAINT "FK_c2ab2118f46f205bfd6a1039e9e"`);
        await queryRunner.query(`ALTER TABLE "submission" DROP CONSTRAINT "FK_e2589bedf8766da0d54841c79df"`);
        await queryRunner.query(`ALTER TABLE "submission" DROP CONSTRAINT "FK_7bd626272858ef6464aa2579094"`);
        await queryRunner.query(`DROP TABLE "submission"`);
    }

}
