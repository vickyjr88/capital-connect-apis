import { Question } from 'src/question/entities/question.entity';
import { Section } from 'src/section/entities/section.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';


@Entity("subsections")
export class SubSection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Section, (section) => section.subSections)
  section: Section;

  @OneToMany(() => Question, (question) => question.subSection)
  questions: Question[];
}
