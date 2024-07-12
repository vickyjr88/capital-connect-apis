import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("payments")
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  currency: string;

  @Column()
  amount: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  status: string;

  @Column({ default: 0 })
  OrderTrackingId: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

 /* @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;*/

}
