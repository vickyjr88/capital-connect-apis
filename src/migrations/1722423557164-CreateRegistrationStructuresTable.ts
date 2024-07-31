import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRegistrationStructuresTable1722423557164 implements MigrationInterface {
    name = 'CreateRegistrationStructuresTable1722423557164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "registration-structures" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text, CONSTRAINT "PK_570478f8125dbd52ecbfd234c15" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "registration-structures"`);
    }

}
