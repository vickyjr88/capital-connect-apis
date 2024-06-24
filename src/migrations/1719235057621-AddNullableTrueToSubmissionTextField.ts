import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNullableTrueToSubmissionTextField1719235057621 implements MigrationInterface {
    name = 'AddNullableTrueToSubmissionTextField1719235057621'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submission" ALTER COLUMN "text" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submission" ALTER COLUMN "text" SET NOT NULL`);
    }

}
