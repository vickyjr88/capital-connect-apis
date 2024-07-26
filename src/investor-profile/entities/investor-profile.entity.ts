import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Sector } from '../../sector/entities/sector.entity';
import { JoinTable } from 'typeorm/browser';
import { SubSector } from '../../subsector/entities/subsector.entity';

@Entity('investor_profiles')
export class InvestorProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  headOfficeLocation: string;

  @Column({ nullable: true })
  organizationName: string;

  @Column()
  emailAddress: string;

  @Column()
  contactPerson: string;

  @Column('text', { array: true })
  countriesOfInvestmentFocus: string[];

  @Column('text', { array: true })
  useOfFunds: string[];

  @Column('bigint')
  maximumFunding: number;

  @Column('bigint')
  minimumFunding: number;

  @Column('text', { array: true })
  sectorsOfInvestment: string[];

  @Column('text', { array: true })
  businessGrowthStages: string[];

  @Column()
  investorType: string;

  @Column('text', { array: true })
  investmentStructures: string[];

  @Column('text', { array: true })
  esgFocusAreas: string[];

  @Column('text', { array: true })
  registrationStructures: string[];

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToMany(() => Sector, (sector) => sector.investorProfiles)
  @JoinTable()
  sectors: Sector[];

  @ManyToMany(() => SubSector, (subSector) => subSector.investorProfiles)
  @JoinTable()
  subSectors: SubSector[];
}
