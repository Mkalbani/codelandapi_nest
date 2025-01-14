import { AuthService } from './../../auth/providers/auth.service';
import { BadRequestException, HttpException, HttpStatus, Injectable, RequestTimeoutException } from '@nestjs/common';
import { GetUserParamDto } from '../dtos/getUser-params.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly authService:AuthService
  ) {}

  public findAll(
    getUserParamDto: GetUserParamDto,
    limit: number,
    page: number,
  ): Promise<User[]> {
    return this.userRepository.find();
    // return [
    //   {
    //     firstName: 'greatest',
    //     lastName: 'ever',
    //     email: 'email@email.com',
    //     password: '@Password123',
    //   },
    //   {
    //     firstName: 'Dee',
    //     lastName: 'Testing',
    //     email: 'deetesting@email.com',
    //     password: '@Password123',
    //   },
    // ];
  }

  public async findOneById(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

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

  public async deleteUser() {
    throw new HttpException(
      {
        status: HttpStatus.GONE,
        error: 'user deleted successfully',
      },
      HttpStatus.GONE,
    );
  }


  // findAll(): Promise<User[]> {
  //   return this.usersRepository.find();
  // }

  // findOne(id: number): Promise<User | null> {
  //   return this.usersRepository.findOneBy({ id });
  // }

  // async remove(id: number): Promise<void> {
  //   await this.usersRepository.delete(id);
  // }
}