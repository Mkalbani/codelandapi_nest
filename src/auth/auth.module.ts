import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';

@Module({
  imports:[forwardRef(()=>UsersModule)],
  providers: [AuthService, 
    {
      provide: HashingProvider,
      useClass: BcryptProvider
  }],
  controllers: [AuthController],
  exports: [AuthService, HashingProvider]
})
export class AuthModule {}
