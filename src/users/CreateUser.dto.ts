import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateUserDto {

    username:string

    password:string

}