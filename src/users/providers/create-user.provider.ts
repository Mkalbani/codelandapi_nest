import { BadRequestException, Inject, Injectable, RequestTimeoutException, forwardRef } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { AuthService } from 'src/auth/providers/auth.service';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly authService:AuthService,

    @Inject(forwardRef(()=>HashingProvider))
    private readonly hashingProvider:HashingProvider
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
     let newUser = this.userRepository.create({
        ...createUserDto,
        password: await this.hashingProvider.hashPassword(createUserDto.password)
    });
    newUser = await this.userRepository.save(newUser);
    return newUser;
  }
}
