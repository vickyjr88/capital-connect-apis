import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableContactPersons1722250586650 implements MigrationInterface {
    name = 'CreateTableContactPersons1722250586650'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contact_persons" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "designation" character varying NOT NULL, "emailAddress" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "investorProfileId" integer, "primaryContact" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_7ac4bdd4703f21ec369f9418d98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contact_persons" ADD CONSTRAINT "FK_5a9f53ee3f0c3c5864a0d08eedf" FOREIGN KEY ("investorProfileId") REFERENCES "investor_profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact_persons" DROP CONSTRAINT "FK_5a9f53ee3f0c3c5864a0d08eedf"`);
        await queryRunner.query(`DROP TABLE "contact_persons"`);
    }

}
