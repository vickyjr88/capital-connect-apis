import { MigrationInterface, QueryRunner } from "typeorm";

export class GenerateSectorsAndSubsectors1719996576861 implements MigrationInterface {
    name = 'GenerateSectorsAndSubsectors1719996576861'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sectors" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text, CONSTRAINT "PK_923fdda0dc12f59add7b3a1782f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subsectors" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text, "sectorId" integer, CONSTRAINT "PK_ba9401c48404abe5089bca7fe59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "subsectors" ADD CONSTRAINT "FK_2f71c0784968be850d0c06bf47e" FOREIGN KEY ("sectorId") REFERENCES "sectors"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subsectors" DROP CONSTRAINT "FK_2f71c0784968be850d0c06bf47e"`);
        await queryRunner.query(`DROP TABLE "subsectors"`);
        await queryRunner.query(`DROP TABLE "sectors"`);
    }

}
