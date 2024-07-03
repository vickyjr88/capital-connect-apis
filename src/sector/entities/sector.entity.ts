import { SubSector } from 'src/subsector/entities/subsector.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity("sectors")
export class Sector {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => SubSector, (subSector) => subSector.sector, {
    onDelete: "CASCADE",
  })
  subSectors: SubSector[];
}
