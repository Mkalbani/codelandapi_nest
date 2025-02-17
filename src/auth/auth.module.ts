import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { SignInProvider } from './providers/sign-in.provider';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { GenerateTokensProviderTs } from './providers/generate-tokens.provider.ts/generate-tokens.provider.ts';
import { RefreshTokensProviderTs } from './providers/refresh-tokens.provider.ts';


@Module({
  imports:[forwardRef(()=>UsersModule),
     ConfigModule.forFeature(jwtConfig),
      JwtModule.registerAsync(jwtConfig.asProvider())],
  providers: [AuthService, 
    {
      provide: HashingProvider,
      useClass: BcryptProvider
  }, SignInProvider, GenerateTokensProviderTs, RefreshTokensProviderTs],
  controllers: [AuthController],
  exports: [AuthService, HashingProvider]
})
export class AuthModule {}
