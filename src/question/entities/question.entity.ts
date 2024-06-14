import { Answer } from 'src/answer/entities/answer.entity';
import { SubSection } from 'src/subsection/entities/subsection.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { QuestionType } from '../question.type';

@Entity("questions")
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({
    type: 'enum',
    enum: QuestionType,
  })
  type: QuestionType;

  @ManyToOne(() => SubSection, (subSection) => subSection.questions)
  subSection: SubSection;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];
}
