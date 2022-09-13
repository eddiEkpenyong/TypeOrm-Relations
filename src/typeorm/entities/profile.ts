import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from './user';

@Entity({name: 'user_profiles'})
export class Profile {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    firstname:string

    @Column()
    lastname:string

    @Column()
    age:number

    @Column()
    dob:string

    @OneToOne(() => User, user => user.profile)
    @JoinColumn()
    user:User
}