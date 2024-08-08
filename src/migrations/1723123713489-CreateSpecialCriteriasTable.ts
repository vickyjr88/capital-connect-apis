import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSpecialCriteriasTable1723123713489 implements MigrationInterface {
    name = 'CreateSpecialCriteriasTable1723123713489'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "special_criteria" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text, CONSTRAINT "PK_4beba29a395e077ff6c4d4cad28" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "special_criteria_questions_questions" ("specialCriteriaId" integer NOT NULL, "questionsId" integer NOT NULL, CONSTRAINT "PK_651d038e675d0253bb8af68e2d2" PRIMARY KEY ("specialCriteriaId", "questionsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dc8997bfe5f3551209e331f4c2" ON "special_criteria_questions_questions" ("specialCriteriaId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d30f7ac78eb63464e53afd868a" ON "special_criteria_questions_questions" ("questionsId") `);
        await queryRunner.query(`ALTER TABLE "special_criteria_questions_questions" ADD CONSTRAINT "FK_dc8997bfe5f3551209e331f4c24" FOREIGN KEY ("specialCriteriaId") REFERENCES "special_criteria"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "special_criteria_questions_questions" ADD CONSTRAINT "FK_d30f7ac78eb63464e53afd868a1" FOREIGN KEY ("questionsId") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "special_criteria_questions_questions" DROP CONSTRAINT "FK_d30f7ac78eb63464e53afd868a1"`);
        await queryRunner.query(`ALTER TABLE "special_criteria_questions_questions" DROP CONSTRAINT "FK_dc8997bfe5f3551209e331f4c24"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d30f7ac78eb63464e53afd868a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dc8997bfe5f3551209e331f4c2"`);
        await queryRunner.query(`DROP TABLE "special_criteria_questions_questions"`);
        await queryRunner.query(`DROP TABLE "special_criteria"`);
    }

}
