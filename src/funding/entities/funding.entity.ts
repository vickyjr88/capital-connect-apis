import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("fundings")
export class Funding {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    minFunding: number;

    @Column()
    maxFunding: number;
}
