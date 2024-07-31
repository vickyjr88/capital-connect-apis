import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("funding-vehicles")
export class FundingVehicle {
    @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;
}
