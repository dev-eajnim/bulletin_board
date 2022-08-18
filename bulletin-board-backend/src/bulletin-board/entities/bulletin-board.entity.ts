import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BulletinBoard {
    @PrimaryGeneratedColumn() //자동으로 id 생성
    id : number
    
    @Column()
    title : string

    @Column()
    content : string

    @CreateDateColumn()
    date : Date

    @Column({ default: 0 })
    views : number
}