import { MigrationInterface, QueryRunner } from "typeorm";

export class ForeignKeyDeleteConstraintFix1719317276449 implements MigrationInterface {
    name = 'ForeignKeyDeleteConstraintFix1719317276449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_c38697a57844f52584abdb878d7"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_a19be8cf90e3ff2e3ec34d14ef2"`);
        await queryRunner.query(`ALTER TABLE "subsections" DROP CONSTRAINT "FK_93c2cb50e5efca783ba4dccaa0e"`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_c38697a57844f52584abdb878d7" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_a19be8cf90e3ff2e3ec34d14ef2" FOREIGN KEY ("subSectionId") REFERENCES "subsections"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subsections" ADD CONSTRAINT "FK_93c2cb50e5efca783ba4dccaa0e" FOREIGN KEY ("sectionId") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subsections" DROP CONSTRAINT "FK_93c2cb50e5efca783ba4dccaa0e"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_a19be8cf90e3ff2e3ec34d14ef2"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_c38697a57844f52584abdb878d7"`);
        await queryRunner.query(`ALTER TABLE "subsections" ADD CONSTRAINT "FK_93c2cb50e5efca783ba4dccaa0e" FOREIGN KEY ("sectionId") REFERENCES "sections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_a19be8cf90e3ff2e3ec34d14ef2" FOREIGN KEY ("subSectionId") REFERENCES "subsections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_c38697a57844f52584abdb878d7" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
