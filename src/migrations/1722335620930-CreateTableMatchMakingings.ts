import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableMatchMakingings1722335620930 implements MigrationInterface {
    name = 'CreateTableMatchMakingings1722335620930'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "match_makings" ("id" SERIAL NOT NULL, "status" character varying NOT NULL DEFAULT 'interesting', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "investorProfileId" integer, "companyId" integer, CONSTRAINT "PK_5e1ffc243bdeb4fdf0ec2d4943d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "match_makings" ADD CONSTRAINT "FK_f0a259715208352a52924bce757" FOREIGN KEY ("investorProfileId") REFERENCES "investor_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "match_makings" ADD CONSTRAINT "FK_cebf46a510648258e626817ad95" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "match_makings" DROP CONSTRAINT "FK_cebf46a510648258e626817ad95"`);
        await queryRunner.query(`ALTER TABLE "match_makings" DROP CONSTRAINT "FK_f0a259715208352a52924bce757"`);
        await queryRunner.query(`DROP TABLE "match_makings"`);
    }

}
