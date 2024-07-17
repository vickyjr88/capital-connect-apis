import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("mobiles")
export class Mobile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phoneNo: number;

  @Column({ type: 'text', nullable: true })
  isVerified: string;

  @Column({ default: 0 })
  otp: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => User, user => user.mobiles)
  user: User;
}
