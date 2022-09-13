import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './CreateUser.dto';
import { UsersService } from './users.service';
import { CreateProfileDto } from './CreateProfile.dto';
import { CreatePostDto } from './CreatePost.dto';

@Controller('users')
export class UsersController {

    constructor(private userService:UsersService){}
    @Get()
    async getUsers(){
       const users = await this.userService.findUsers()
       return users
    }

    @Post()
    createUser(@Body() createUserDto:CreateUserDto){
       return this.userService.createUser(createUserDto)
    }

    @Put(':id')
    async updateUserByID(@Param('id', ParseIntPipe) id:number, @Body() updateDetails:CreateUserDto) {
        await this.userService.updateUser(id, updateDetails)
    }

     @Delete(':id')
     async deleteUser(@Param('id', ParseIntPipe) id:number){
       await this.userService.deleteUser(id)
    }

    @Post(':id/profile')
    createUserProfile(@Param('id', ParseIntPipe) id:number, @Body() createProfileDto: CreateProfileDto){
      return this.userService.createUserProfile(id, createProfileDto)
    }

    @Post(':id/posts')
    createUserPost(@Param('id', ParseIntPipe) id:number, @Body()createPostDto: CreatePostDto){
      return this.userService.createUserPost(id, createPostDto)
    }
}
