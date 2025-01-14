import { BadRequestException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { AuthService } from 'src/auth/providers/auth.service';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly authService:AuthService
  ) {}

      public async createUsers(createUserDto: CreateUserDto) {
    // check if user already exits
    let existingUser = undefined

    try {
      await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process you request at the moment. Try later',
         {
          description: "Error connecting to the db"
         })
    }
    // Handle Error
   if (existingUser) {
      throw new BadRequestException('user already exist');
    } else {
    }

    //  Create new User
     let newUser = this.userRepository.create(createUserDto);
    newUser = await this.userRepository.save(newUser);
    return newUser;
  }
}
