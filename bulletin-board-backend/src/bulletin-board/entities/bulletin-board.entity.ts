import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BulletinBoard {
    @PrimaryGeneratedColumn()
    id : number
    
    @Column()
    title : string

    @Column()
    content : string

    @Column()
    date : Date

    @Column()
    views : number
}