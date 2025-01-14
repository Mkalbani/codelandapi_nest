import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './providers/users.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneByEmail } from './providers/find-one-by-email';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(()=>AuthModule)],
  controllers: [UsersController],
  providers: [UserService, CreateUserProvider, FindOneByEmail],
  exports: [TypeOrmModule, UserService, FindOneByEmail],
})
export class UsersModule {}
