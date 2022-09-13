import { Injectable } from "@nestjs/common"

@Injectable()
export class CreateProfileDto {

    firstname:string
    lastname:string
    age:number
    dob:string

}