import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

}
