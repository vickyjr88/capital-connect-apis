import { SubSection } from 'src/subsection/entities/subsection.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity("sections")
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => SubSection, (subSection) => subSection.section)
  subSections: SubSection[];
}
