import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../typeorm/entities/user';
import { CreateUserParams, CreateUserProfileParams, CreatePostParams } from './types';
import { Profile } from '../typeorm/entities/profile';
import { Posts } from '../typeorm/entities/posts';
import * as bcrypt from 'bcrypt'
@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Posts) private postRepository: Repository<Posts>,

  ) { }

  findUsers() {
    return this.userRepository.find({ relations: ['profile', 'posts'] })
  }

  async createUser(userDetails: CreateUserParams) {

    const salt = await bcrypt.genSalt()
    const { password } = userDetails

    const newUser = this.userRepository.create(userDetails)
    newUser.password = await bcrypt.hash(password, salt)

    const savedUser = await this.userRepository.save(newUser)
    return savedUser
  }


  updateUser(id: number, userDetails: CreateUserParams) {
    return this.userRepository.update(id, userDetails)
  }

  deleteUser(id: number) {
    return this.userRepository.delete(id)
  }

  async createUserProfile(id: number, profileDetails: CreateUserProfileParams) {
    const user = await this.userRepository.findOneBy({ id })

    if (!user) {
      throw new HttpException("User Not Found", HttpStatus.BAD_REQUEST)
    }

    const newProfile = this.profileRepository.create(profileDetails)
    const userProfile = await this.profileRepository.save(newProfile)
    user.profile = userProfile
    this.userRepository.save(user)
    const { password, ...rest } = user
    return rest
  }

  async createUserPost(id: number, postDetails: CreatePostParams) {
    const user = await this.userRepository.findOneBy({ id })

    if (!user) {
      throw new HttpException("User Not Found", HttpStatus.BAD_REQUEST)
    }

    const newPost = this.postRepository.create({
      ...postDetails, user
    })
    try {
      const postB = await this.postRepository.save(newPost)
      delete (postB.user)
      return postB
    } catch (error) {
      console.log(error)
    }





  }
}
