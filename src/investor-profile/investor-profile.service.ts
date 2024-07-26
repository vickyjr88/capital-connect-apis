import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInvestorProfileDto } from './dto/create-investor-profile.dto';
import { UpdateInvestorProfileDto } from './dto/update-investor-profile.dto';
import { InvestorProfile } from './entities/investor-profile.entity';
import { User } from '../users/entities/user.entity';
import { Sector } from '../sector/entities/sector.entity';
import { SubSector } from '../subsector/entities/subsector.entity';
import { FilterInvestorProfilesDto } from './dto/filter-investor-profile.dto';

@Injectable()
export class InvestorProfileService {
  constructor(
    @InjectRepository(InvestorProfile)
    private investorProfileRepository: Repository<InvestorProfile>,
    @InjectRepository(Sector)
    private sectorRepository: Repository<Sector>,
    @InjectRepository(SubSector)
    private subSectorRepository: Repository<SubSector>,
  ) {}

  async create(
    createInvestorProfileDto: CreateInvestorProfileDto,
  ): Promise<InvestorProfile> {
    const { sectors, subSectors, ...rest } = createInvestorProfileDto;
    const investorProfile = this.investorProfileRepository.create({ ...rest });
    investorProfile.user = { id: createInvestorProfileDto.userId } as User;

    if (createInvestorProfileDto.sectors) {
      const fetchedSectors = await this.sectorRepository.findByIds(sectors);
      investorProfile.sectors = fetchedSectors;
    }

    if (createInvestorProfileDto.subSectors) {
      const fetchedSubSectors =
        await this.subSectorRepository.findByIds(subSectors);
      investorProfile.subSectors = fetchedSubSectors;
    }
    return this.investorProfileRepository.save(investorProfile);
  }

  findAll(): Promise<InvestorProfile[]> {
    return this.investorProfileRepository.find();
  }

  findOne(id: number): Promise<InvestorProfile> {
    return this.investorProfileRepository.findOne({
      where: { id },
      relations: ['user', 'sectors', 'subSectors'],
    });
  }

  findOneByUserId(id: number): Promise<InvestorProfile> {
    return this.investorProfileRepository.findOne({
      where: { user: { id } },
    });
  }

  async update(
    id: number,
    updateInvestorProfileDto: UpdateInvestorProfileDto,
  ): Promise<InvestorProfile> {
    const investorProfile = await this.findOne(id);
    if (!investorProfile) {
      throw new NotFoundException('Investor profile not found');
    }

    Object.assign(investorProfile, updateInvestorProfileDto);

    if (updateInvestorProfileDto.sectors) {
      const sectors = await this.sectorRepository.findByIds(
        updateInvestorProfileDto.sectors,
      );
      investorProfile.sectors = sectors;
    }

    if (updateInvestorProfileDto.subSectors) {
      const subSectors = await this.subSectorRepository.findByIds(
        updateInvestorProfileDto.subSectors,
      );
      investorProfile.subSectors = subSectors;
    }

    await this.investorProfileRepository.save(investorProfile);
    return await this.findOne(id);
    if (!investorProfile) {
      throw new NotFoundException('Investor profile not found');
    }
    return investorProfile;
  }

  remove(id: number): Promise<void> {
    return this.investorProfileRepository.delete(id).then(() => {});
  }

  async filter(
    filterDto: FilterInvestorProfilesDto,
  ): Promise<InvestorProfile[]> {
    const query = this.investorProfileRepository
      .createQueryBuilder('investorProfile')
      .leftJoinAndSelect('investorProfile.sectors', 'sectors')
      .leftJoinAndSelect('investorProfile.subSectors', 'subSectors');

    if (filterDto.countriesOfInvestmentFocus) {
      query.andWhere(
        'investorProfile.countriesOfInvestmentFocus && :countriesOfInvestmentFocus',
        {
          countriesOfInvestmentFocus: filterDto.countriesOfInvestmentFocus,
        },
      );
    }

    if (filterDto.headOfficeLocation) {
      query.andWhere(
        'investorProfile.headOfficeLocation = :headOfficeLocation',
        {
          headOfficeLocation: filterDto.headOfficeLocation,
        },
      );
    }

    if (filterDto.emailAddress) {
      query.andWhere('investorProfile.emailAddress = :emailAddress', {
        emailAddress: filterDto.emailAddress,
      });
    }

    if (filterDto.contactPerson) {
      query.andWhere('investorProfile.contactPerson = :contactPerson', {
        contactPerson: filterDto.contactPerson,
      });
    }

    if (filterDto.useOfFunds) {
      query.andWhere('investorProfile.useOfFunds && :useOfFunds', {
        useOfFunds: filterDto.useOfFunds,
      });
    }

    if (filterDto.maximumFunding) {
      query.andWhere('investorProfile.maximumFunding >= :maximumFunding', {
        maximumFunding: filterDto.maximumFunding,
      });
    }

    if (filterDto.minimumFunding) {
      query.andWhere('investorProfile.minimumFunding <= :minimumFunding', {
        minimumFunding: filterDto.minimumFunding,
      });
    }

    if (filterDto.sectors) {
      query.andWhere('sectors.id IN (:...sectors)', {
        sectors: filterDto.sectors,
      });
    }

    if (filterDto.subSectors) {
      query.andWhere('subSectors.id IN (:...subSectors)', {
        subSectors: filterDto.subSectors,
      });
    }

    if (filterDto.businessGrowthStages) {
      query.andWhere(
        'investorProfile.businessGrowthStages && :businessGrowthStages',
        {
          businessGrowthStages: filterDto.businessGrowthStages,
        },
      );
    }

    if (filterDto.investorType) {
      query.andWhere('investorProfile.investorType = :investorType', {
        investorType: filterDto.investorType,
      });
    }

    if (filterDto.investmentStructures) {
      query.andWhere(
        'investorProfile.investmentStructures && :investmentStructures',
        {
          investmentStructures: filterDto.investmentStructures,
        },
      );
    }

    if (filterDto.esgFocusAreas) {
      query.andWhere('investorProfile.esgFocusAreas && :esgFocusAreas', {
        esgFocusAreas: filterDto.esgFocusAreas,
      });
    }

    if (filterDto.registrationStructure) {
      query.andWhere(
        'investorProfile.registrationStructure = :registrationStructure',
        {
          registrationStructure: filterDto.registrationStructure,
        },
      );
    }

    return await query.getMany();
  }

  async filterByOr(
    filterDto: FilterInvestorProfilesDto,
  ): Promise<InvestorProfile[]> {
    const query = this.investorProfileRepository
      .createQueryBuilder('investorProfile')
      .leftJoinAndSelect('investorProfile.sectors', 'sectors')
      .leftJoinAndSelect('investorProfile.subSectors', 'subSectors');

    if (filterDto.countriesOfInvestmentFocus) {
      query.orWhere(
        'investorProfile.countriesOfInvestmentFocus && :countriesOfInvestmentFocus',
        {
          countriesOfInvestmentFocus: filterDto.countriesOfInvestmentFocus,
        },
      );
    }

    if (filterDto.headOfficeLocation) {
      query.orWhere(
        'investorProfile.headOfficeLocation = :headOfficeLocation',
        {
          headOfficeLocation: filterDto.headOfficeLocation,
        },
      );
    }

    if (filterDto.emailAddress) {
      query.orWhere('investorProfile.emailAddress = :emailAddress', {
        emailAddress: filterDto.emailAddress,
      });
    }

    if (filterDto.contactPerson) {
      query.orWhere('investorProfile.contactPerson = :contactPerson', {
        contactPerson: filterDto.contactPerson,
      });
    }

    if (filterDto.useOfFunds) {
      query.orWhere('investorProfile.useOfFunds && :useOfFunds', {
        useOfFunds: filterDto.useOfFunds,
      });
    }

    if (filterDto.maximumFunding) {
      query.orWhere('investorProfile.maximumFunding >= :maximumFunding', {
        maximumFunding: filterDto.maximumFunding,
      });
    }

    if (filterDto.minimumFunding) {
      query.orWhere('investorProfile.minimumFunding <= :minimumFunding', {
        minimumFunding: filterDto.minimumFunding,
      });
    }

    if (filterDto.sectors) {
      query.orWhere('sectors.id IN (:...sectors)', {
        sectors: filterDto.sectors,
      });
    }

    if (filterDto.subSectors) {
      query.orWhere('subSectors.id IN (:...subSectors)', {
        subSectors: filterDto.subSectors,
      });
    }

    if (filterDto.businessGrowthStages) {
      query.orWhere(
        'investorProfile.businessGrowthStages && :businessGrowthStages',
        {
          businessGrowthStages: filterDto.businessGrowthStages,
        },
      );
    }

    if (filterDto.investorType) {
      query.orWhere('investorProfile.investorType = :investorType', {
        investorType: filterDto.investorType,
      });
    }

    if (filterDto.investmentStructures) {
      query.orWhere(
        'investorProfile.investmentStructures && :investmentStructures',
        {
          investmentStructures: filterDto.investmentStructures,
        },
      );
    }

    if (filterDto.esgFocusAreas) {
      query.orWhere('investorProfile.esgFocusAreas && :esgFocusAreas', {
        esgFocusAreas: filterDto.esgFocusAreas,
      });
    }

    if (filterDto.registrationStructure) {
      query.orWhere(
        'investorProfile.registrationStructure = :registrationStructure',
        {
          registrationStructure: filterDto.registrationStructure,
        },
      );
    }

    return await query.getMany();
  }
}
