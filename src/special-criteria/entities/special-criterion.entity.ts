import { Question } from "src/question/entities/question.entity";
import { QuestionService } from "src/question/question.service";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("special_criteria")
export class SpecialCriterion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @ManyToMany(() => Question, (questions) => questions.specialcriteria)
    @JoinTable()
    questions: Question[];
}
