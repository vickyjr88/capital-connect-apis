import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1718797988687 implements MigrationInterface {
    name = 'InitialMigration1718797988687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying, "lastName" character varying, "roles" character varying NOT NULL DEFAULT 'user', "resetPasswordToken" character varying, "resetPasswordExpires" TIMESTAMP, "isEmailVerified" boolean NOT NULL DEFAULT false, "emailVerificationToken" character varying, "emailVerificationExpires" TIMESTAMP, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "answers" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "weight" integer NOT NULL, "questionId" integer, CONSTRAINT "PK_9c32cec6c71e06da0254f2226c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."questions_type_enum" AS ENUM('MULTIPLE_CHOICE', 'SINGLE_CHOICE', 'TRUE_FALSE', 'SHORT_ANSWER')`);
        await queryRunner.query(`CREATE TABLE "questions" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "type" "public"."questions_type_enum" NOT NULL, "subSectionId" integer, CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sections" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text, CONSTRAINT "PK_f9749dd3bffd880a497d007e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subsections" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text, "sectionId" integer, CONSTRAINT "PK_1229930013cb47ceb1d98bccbc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "submission" ("id" SERIAL NOT NULL, "userId" integer, "questionId" integer, "answerId" integer, CONSTRAINT "PK_7faa571d0e4a7076e85890c9bd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "files" ("id" SERIAL NOT NULL, "path" character varying NOT NULL, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "companies" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "country" character varying NOT NULL, "businessSector" character varying NOT NULL, "productsAndServices" character varying NOT NULL, "registrationStructure" character varying NOT NULL, "yearsOfOperation" integer NOT NULL, "growthStage" character varying NOT NULL, "numberOfEmployees" integer NOT NULL, "fullTimeBusiness" boolean NOT NULL, "userId" integer, "companyLogoId" integer, CONSTRAINT "REL_6d64e8c7527a9e4af83cc66cbf" UNIQUE ("userId"), CONSTRAINT "REL_eb06a09af4bf21ea7f413aea1c" UNIQUE ("companyLogoId"), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_c38697a57844f52584abdb878d7" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_a19be8cf90e3ff2e3ec34d14ef2" FOREIGN KEY ("subSectionId") REFERENCES "subsections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subsections" ADD CONSTRAINT "FK_93c2cb50e5efca783ba4dccaa0e" FOREIGN KEY ("sectionId") REFERENCES "sections"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "submission" ADD CONSTRAINT "FK_7bd626272858ef6464aa2579094" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "submission" ADD CONSTRAINT "FK_e2589bedf8766da0d54841c79df" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "submission" ADD CONSTRAINT "FK_c2ab2118f46f205bfd6a1039e9e" FOREIGN KEY ("answerId") REFERENCES "answers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "FK_6d64e8c7527a9e4af83cc66cbf7" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "FK_eb06a09af4bf21ea7f413aea1c0" FOREIGN KEY ("companyLogoId") REFERENCES "files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_eb06a09af4bf21ea7f413aea1c0"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_6d64e8c7527a9e4af83cc66cbf7"`);
        await queryRunner.query(`ALTER TABLE "submission" DROP CONSTRAINT "FK_c2ab2118f46f205bfd6a1039e9e"`);
        await queryRunner.query(`ALTER TABLE "submission" DROP CONSTRAINT "FK_e2589bedf8766da0d54841c79df"`);
        await queryRunner.query(`ALTER TABLE "submission" DROP CONSTRAINT "FK_7bd626272858ef6464aa2579094"`);
        await queryRunner.query(`ALTER TABLE "subsections" DROP CONSTRAINT "FK_93c2cb50e5efca783ba4dccaa0e"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_a19be8cf90e3ff2e3ec34d14ef2"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_c38697a57844f52584abdb878d7"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`DROP TABLE "files"`);
        await queryRunner.query(`DROP TABLE "submission"`);
        await queryRunner.query(`DROP TABLE "subsections"`);
        await queryRunner.query(`DROP TABLE "sections"`);
        await queryRunner.query(`DROP TABLE "questions"`);
        await queryRunner.query(`DROP TYPE "public"."questions_type_enum"`);
        await queryRunner.query(`DROP TABLE "answers"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
