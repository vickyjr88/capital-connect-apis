import { Sector } from 'src/sector/entities/sector.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { InvestorProfile } from '../../investor-profile/entities/investor-profile.entity';

@Entity('subsectors')
export class SubSector {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => Sector, (sector) => sector.subSectors, {
    onDelete: 'CASCADE',
  })
  sector: Sector;

  @ManyToMany(
    () => InvestorProfile,
    (investorProfile) => investorProfile.subSectors,
  )
  investorProfiles: InvestorProfile[];
}
