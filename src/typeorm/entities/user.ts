import { Entity,Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, OneToMany } from "typeorm";
import { Posts } from "./posts";
import { Profile } from "./profile";

@Entity({ name: 'users'})

export class User{

    @PrimaryGeneratedColumn()
    id:number

    @Column({unique : true})
    username:string

    @Column()
    password:string

    @CreateDateColumn()
    createdAt: Date

    @OneToOne(() => Profile, (profile) => profile.user)
    profile:Profile

    @OneToMany(() => Posts, (posts) => posts.user )
    posts:Posts[]
}