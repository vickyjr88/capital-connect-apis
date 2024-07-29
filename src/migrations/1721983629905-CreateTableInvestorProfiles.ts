import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableInvestorProfiles1721983629905 implements MigrationInterface {
    name = 'CreateTableInvestorProfiles1721983629905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "investor_profiles" ("id" SERIAL NOT NULL, "headOfficeLocation" character varying NOT NULL, "organizationName" character varying, "url" character varying, "countriesOfInvestmentFocus" text array NOT NULL, "useOfFunds" text array NOT NULL, "minimumFunding" bigint NOT NULL DEFAULT '0', "maximumFunding" bigint NOT NULL DEFAULT '0', "noMaximumFunding" boolean NOT NULL DEFAULT false, "sectorsOfInvestment" text array NOT NULL, "businessGrowthStages" text array NOT NULL, "investorType" character varying NOT NULL, "investmentStructures" text array NOT NULL, "esgFocusAreas" text array NOT NULL, "registrationStructures" text array NOT NULL, "userId" integer, CONSTRAINT "REL_732da4f9018a4454ec2a100098" UNIQUE ("userId"), CONSTRAINT "PK_154d889a096b3948f856b4ca53f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "investor_profiles_sectors_sectors" ("investorProfilesId" integer NOT NULL, "sectorsId" integer NOT NULL, CONSTRAINT "PK_b978841979c7d68207b562d7f3a" PRIMARY KEY ("investorProfilesId", "sectorsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4e6c80eb4a7305708c9ca490bf" ON "investor_profiles_sectors_sectors" ("investorProfilesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d8a032eb8a676685f610bfbdde" ON "investor_profiles_sectors_sectors" ("sectorsId") `);
        await queryRunner.query(`CREATE TABLE "investor_profiles_sub_sectors_subsectors" ("investorProfilesId" integer NOT NULL, "subsectorsId" integer NOT NULL, CONSTRAINT "PK_efbaa88fe250c01d11d9cc532e6" PRIMARY KEY ("investorProfilesId", "subsectorsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_725e3146dd421fd4c1484df0df" ON "investor_profiles_sub_sectors_subsectors" ("investorProfilesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_eadfbddadda0cbe1661d5b95d6" ON "investor_profiles_sub_sectors_subsectors" ("subsectorsId") `);
        await queryRunner.query(`ALTER TABLE "investor_profiles" ADD CONSTRAINT "FK_732da4f9018a4454ec2a100098d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "investor_profiles_sectors_sectors" ADD CONSTRAINT "FK_4e6c80eb4a7305708c9ca490bf9" FOREIGN KEY ("investorProfilesId") REFERENCES "investor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "investor_profiles_sectors_sectors" ADD CONSTRAINT "FK_d8a032eb8a676685f610bfbdde4" FOREIGN KEY ("sectorsId") REFERENCES "sectors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "investor_profiles_sub_sectors_subsectors" ADD CONSTRAINT "FK_725e3146dd421fd4c1484df0dfc" FOREIGN KEY ("investorProfilesId") REFERENCES "investor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "investor_profiles_sub_sectors_subsectors" ADD CONSTRAINT "FK_eadfbddadda0cbe1661d5b95d6a" FOREIGN KEY ("subsectorsId") REFERENCES "subsectors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "investor_profiles_sub_sectors_subsectors" DROP CONSTRAINT "FK_eadfbddadda0cbe1661d5b95d6a"`);
        await queryRunner.query(`ALTER TABLE "investor_profiles_sub_sectors_subsectors" DROP CONSTRAINT "FK_725e3146dd421fd4c1484df0dfc"`);
        await queryRunner.query(`ALTER TABLE "investor_profiles_sectors_sectors" DROP CONSTRAINT "FK_d8a032eb8a676685f610bfbdde4"`);
        await queryRunner.query(`ALTER TABLE "investor_profiles_sectors_sectors" DROP CONSTRAINT "FK_4e6c80eb4a7305708c9ca490bf9"`);
        await queryRunner.query(`ALTER TABLE "investor_profiles" DROP CONSTRAINT "FK_732da4f9018a4454ec2a100098d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_eadfbddadda0cbe1661d5b95d6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_725e3146dd421fd4c1484df0df"`);
        await queryRunner.query(`DROP TABLE "investor_profiles_sub_sectors_subsectors"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d8a032eb8a676685f610bfbdde"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4e6c80eb4a7305708c9ca490bf"`);
        await queryRunner.query(`DROP TABLE "investor_profiles_sectors_sectors"`);
        await queryRunner.query(`DROP TABLE "investor_profiles"`);
    }

}
