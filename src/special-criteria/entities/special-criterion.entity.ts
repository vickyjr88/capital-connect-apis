import { Question } from "src/question/entities/question.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("special_criteria")
export class SpecialCriterion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @ManyToOne(() => Question, { eager: true })
    @JoinColumn({ name: 'questionId' })
    question: Question;
}
