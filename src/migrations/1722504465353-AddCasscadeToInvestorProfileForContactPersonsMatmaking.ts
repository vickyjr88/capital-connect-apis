import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCasscadeToInvestorProfileForContactPersonsMatmaking1722504465353 implements MigrationInterface {
    name = 'AddCasscadeToInvestorProfileForContactPersonsMatmaking1722504465353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact_persons" DROP CONSTRAINT "FK_5a9f53ee3f0c3c5864a0d08eedf"`);
        await queryRunner.query(`ALTER TABLE "match_makings" DROP CONSTRAINT "FK_f0a259715208352a52924bce757"`);
        await queryRunner.query(`ALTER TABLE "contact_persons" ADD CONSTRAINT "FK_5a9f53ee3f0c3c5864a0d08eedf" FOREIGN KEY ("investorProfileId") REFERENCES "investor_profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match_makings" ADD CONSTRAINT "FK_f0a259715208352a52924bce757" FOREIGN KEY ("investorProfileId") REFERENCES "investor_profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match_makings" DROP CONSTRAINT "FK_f0a259715208352a52924bce757"`);
        await queryRunner.query(`ALTER TABLE "contact_persons" DROP CONSTRAINT "FK_5a9f53ee3f0c3c5864a0d08eedf"`);
        await queryRunner.query(`ALTER TABLE "match_makings" ADD CONSTRAINT "FK_f0a259715208352a52924bce757" FOREIGN KEY ("investorProfileId") REFERENCES "investor_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contact_persons" ADD CONSTRAINT "FK_5a9f53ee3f0c3c5864a0d08eedf" FOREIGN KEY ("investorProfileId") REFERENCES "investor_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
