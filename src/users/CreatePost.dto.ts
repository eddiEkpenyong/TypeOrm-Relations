import { Injectable } from "@nestjs/common"

@Injectable()
export class CreatePostDto {

    title:string
    description:string
}