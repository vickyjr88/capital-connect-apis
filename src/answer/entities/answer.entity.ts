import { Question } from 'src/question/entities/question.entity';
import { Submission } from 'src/submission/entities/submission.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';


@Entity("answers")
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ nullable: true })
  recommendation: string;

  @Column()
  weight: number;

  @ManyToOne(() => Question, (question) => question.answers, {
    onDelete: "CASCADE",
  })
  question: Question;

  @OneToMany(() => Submission, submission => submission.answer)
  submissions: Submission[];
}
