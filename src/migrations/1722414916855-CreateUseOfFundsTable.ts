import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUseOfFundsTable1722414916855 implements MigrationInterface {
    name = 'CreateUseOfFundsTable1722414916855'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "use-of-funds" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text, CONSTRAINT "PK_dbc74ded0fac2859fc6c33b79ac" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "use-of-funds"`);
    }

}
