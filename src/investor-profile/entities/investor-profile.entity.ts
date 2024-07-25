import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

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
}
