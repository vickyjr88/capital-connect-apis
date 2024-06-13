import { File } from 'src/files/entities/file.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  businessSector: string;

  @Column()
  productsAndServices: string;

  @Column()
  registrationStructure: string;

  @Column()
  yearsOfOperation: number;

  @Column()
  growthStage: string;

  @Column()
  numberOfEmployees: number;

  @Column()
  fullTimeBusiness: boolean;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @OneToOne(() => File)
  @JoinColumn()
  companyLogo: File;

}
