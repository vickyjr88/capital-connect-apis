import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableMobileNumbers1721912418649 implements MigrationInterface {
    name = 'CreateTableMobileNumbers1721912418649'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mobile-numbers" ("id" SERIAL NOT NULL, "phoneNo" character varying NOT NULL, "isVerified" boolean NOT NULL DEFAULT false, "otp" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_e496c05512e393f7bc356671a11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "mobile-numbers" ADD CONSTRAINT "FK_cc40167d45430aad0a8576b8bfd" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mobile-numbers" DROP CONSTRAINT "FK_cc40167d45430aad0a8576b8bfd"`);
        await queryRunner.query(`DROP TABLE "mobile-numbers"`);
    }

}
