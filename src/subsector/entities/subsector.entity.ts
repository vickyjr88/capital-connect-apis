import { Sector } from 'src/sector/entities/sector.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


@Entity("subsectors")
export class SubSector {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => Sector, (sector) => sector.subSectors, {
    onDelete: "CASCADE",
  })
  sector: Sector;
}
