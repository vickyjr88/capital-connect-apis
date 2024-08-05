import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSpecialCriteriaTable1722871601791 implements MigrationInterface {
    name = 'CreateSpecialCriteriaTable1722871601791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "special_criteria" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text, "questionId" integer, CONSTRAINT "PK_4beba29a395e077ff6c4d4cad28" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "special_criteria" ADD CONSTRAINT "FK_9e41d14bbb8ddc47e7587cd4a92" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "special_criteria" DROP CONSTRAINT "FK_9e41d14bbb8ddc47e7587cd4a92"`);
        await queryRunner.query(`DROP TABLE "special_criteria"`);
    }

}
