import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescriptionToSectionAndSubSection1718356863426 implements MigrationInterface {
    name = 'AddDescriptionToSectionAndSubSection1718356863426'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sections" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "subsections" ADD "description" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subsections" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "sections" DROP COLUMN "description"`);
    }

}
