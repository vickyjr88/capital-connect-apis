import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("files")
export class File {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    path: string;

}