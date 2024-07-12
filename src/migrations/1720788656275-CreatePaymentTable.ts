import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePaymentTable1720788656275 implements MigrationInterface {
    name = 'CreatePaymentTable1720788656275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payments" ("id" SERIAL NOT NULL, "currency" character varying NOT NULL, "amount" integer NOT NULL, "description" text, "status" text, "OrderTrackingId" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "payments"`);
    }

}
