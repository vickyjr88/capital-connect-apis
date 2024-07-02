import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAcceptTnCsToUser1719920293857 implements MigrationInterface {
    name = 'AddAcceptTnCsToUser1719920293857'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "hasAcceptedTerms" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "termsAcceptedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "termsAcceptedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "hasAcceptedTerms"`);
    }

}
