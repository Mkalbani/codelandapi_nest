import { FindOneByEmail } from './find-one-by-email';
import { CreateUserProvider } from './create-user.provider';
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
    private readonly authService:AuthService,
    private readonly createUserProvider:CreateUserProvider,
    private readonly findOneByEmail:FindOneByEmail

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
    return this.createUserProvider.createUsers(createUserDto)
  }

  public async getOneByEmail(email: string){
    return this.findOneByEmail.findOneByEmail(email)
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