import { Injectable, NotFoundException } from "@nestjs/common";
import { InvestorProfileService } from "../investor-profile/investor-profile.service";
import { CompanyService } from "../company/company.service";
import { FilterCompanyDto } from "../company/dto/filter-company.dto";
import { FilterInvestorProfilesDto } from "../investor-profile/dto/filter-investor-profile.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Sector } from "../sector/entities/sector.entity";

@Injectable()
export class MatchmakingService {

  constructor(
    private investorProfileService: InvestorProfileService,
    private companyService: CompanyService,
    @InjectRepository(Sector)
    private sectorsRepository: Repository<Sector>,
  ) {}

  async getMatchingCompanies(id) {

    const profileFound = await this.investorProfileService.findOneByUserId(id);
    if (!profileFound) {
      throw new NotFoundException();
    }

    const filterDto = new FilterCompanyDto()
    filterDto.countries = profileFound.countriesOfInvestmentFocus;
    filterDto.businessSectors = profileFound.sectors.map(sector => sector.name);
    filterDto.growthStages = profileFound.businessGrowthStages;
    filterDto.registrationStructures = profileFound.registrationStructures;
    return await this.companyService.filterCompanies(filterDto);
  }

  async getMatchingInvestorProfiles(id) {
    const companyFound = await this.companyService.findOneByOwnerId(id);
    if (!companyFound) {
      throw new NotFoundException();
    }

    const filterDto = new FilterInvestorProfilesDto()
    const sector = await this.sectorsRepository.findOne({ where: { name: companyFound.businessSector } });
    if (sector) {
      filterDto.sectors = [sector.id];
    }
    filterDto.countriesOfInvestmentFocus = [companyFound.country];
    filterDto.businessGrowthStages = [companyFound.growthStage];
    filterDto.registrationStructures = [companyFound.registrationStructure];
    return await this.investorProfileService.filter(filterDto);
  }
}
