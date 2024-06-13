import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'files' })
export class File {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    path: string;

}