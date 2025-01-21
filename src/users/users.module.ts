import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './providers/users.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneByEmail } from './providers/find-one-by-email';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from 'src/auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
   forwardRef(()=>AuthModule),
       ConfigModule.forFeature(jwtConfig),
      JwtModule.registerAsync(jwtConfig.asProvider())],
  controllers: [UsersController],
  providers: [UserService, CreateUserProvider, FindOneByEmail],
  exports: [TypeOrmModule, UserService, FindOneByEmail],
})
export class UsersModule {}
