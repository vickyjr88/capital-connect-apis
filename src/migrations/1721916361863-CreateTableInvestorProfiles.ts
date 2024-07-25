import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableInvestorProfiles1721916361863 implements MigrationInterface {
    name = 'CreateTableInvestorProfiles1721916361863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "investor_profiles" ("id" SERIAL NOT NULL, "headOfficeLocation" character varying NOT NULL, "organizationName" character varying, "emailAddress" character varying NOT NULL, "contactPerson" character varying NOT NULL, "countriesOfInvestmentFocus" text array NOT NULL, "useOfFunds" text array NOT NULL, "maximumFunding" bigint NOT NULL, "minimumFunding" bigint NOT NULL, "sectorsOfInvestment" text array NOT NULL, "businessGrowthStages" text array NOT NULL, "investorType" character varying NOT NULL, "investmentStructures" text array NOT NULL, "esgFocusAreas" text array NOT NULL, "registrationStructures" text array NOT NULL, "userId" integer, CONSTRAINT "REL_732da4f9018a4454ec2a100098" UNIQUE ("userId"), CONSTRAINT "PK_154d889a096b3948f856b4ca53f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "investor_profiles" ADD CONSTRAINT "FK_732da4f9018a4454ec2a100098d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "investor_profiles" DROP CONSTRAINT "FK_732da4f9018a4454ec2a100098d"`);
        await queryRunner.query(`DROP TABLE "investor_profiles"`);
    }

}
