import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Sector } from '../../sector/entities/sector.entity';
import { SubSector } from '../../subsector/entities/subsector.entity';
import { JoinTable } from 'typeorm';
import { ContactPerson } from '../../contact-person/entities/contact-person.entity';

@Entity('investor_profiles')
export class InvestorProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  headOfficeLocation: string;

  @Column({ nullable: true })
  organizationName: string;

  @Column({ nullable: true })
  url: string;

  @Column('text', { array: true })
  countriesOfInvestmentFocus: string[];

  @Column('text', { array: true })
  useOfFunds: string[];

  @Column('bigint', { default: 0 })
  minimumFunding: number;

  @Column('bigint', { default: 0 })
  maximumFunding: number;

  @Column('boolean', { default: false })
  noMaximumFunding: boolean;

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

  @OneToMany(
    () => ContactPerson,
    (contactPerson) => contactPerson.investorProfile,
  )
  contactPersons: ContactPerson[];
}
