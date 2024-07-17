import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMobileTable1721208216129 implements MigrationInterface {
    name = 'CreateMobileTable1721208216129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mobiles" ("id" SERIAL NOT NULL, "phoneNo" integer NOT NULL, "isVerified" text, "otp" character varying NOT NULL DEFAULT '0', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_59ee2365f347e4709b04279bfdb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "mobiles" ADD CONSTRAINT "FK_1554dcd3199be80b00ce3d2b686" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mobiles" DROP CONSTRAINT "FK_1554dcd3199be80b00ce3d2b686"`);
        await queryRunner.query(`DROP TABLE "mobiles"`);
    }

}
