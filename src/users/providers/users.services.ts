import { Injectable } from '@nestjs/common';
import { GetUserParamDto } from '../dtos/getUser-params.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
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
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    // Handle Error

    // Create the user
    let newUser = this.userRepository.create(createUserDto);
    newUser = await this.userRepository.save(newUser);
    return newUser;
  }
}
