import { File } from 'src/files/entities/file.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NumberOfEmployees, YearsOfOperation } from '../company.type';

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

  @Column({
    type: 'enum',
    enum: YearsOfOperation,
    default: YearsOfOperation._0
  })
  yearsOfOperation: YearsOfOperation;

  @Column()
  growthStage: string;

  @Column({
    type: 'enum',
    enum: NumberOfEmployees,
    default: NumberOfEmployees._1_TO_10
  })
  numberOfEmployees: NumberOfEmployees;

  @Column()
  fullTimeBusiness: boolean;

  // @OneToOne(() => User, (user) => user.id)
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => File)
  @JoinColumn()
  companyLogo: File;

}
