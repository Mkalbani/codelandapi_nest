import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { PostModule } from './post/post.module';
// type orm
import { TypeOrmModule } from '@nestjs/typeorm';

// import { configDotenv } from 'dotenv';
// import { Photo } from './photos/photo.entity';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Add ConfigService here
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { PostServices } from './post/providers/post.services';
import { User } from './users/user.entity';
import { MetaOptionsService } from './meta-options/provider/meta-options.service';
import { TagsService } from './tags/provider/tags.service';
import { UserService } from './users/providers/users.services';
import { AuthModule } from './auth/auth.module';
import { BcryptProvider } from './auth/providers/bcrypt.provider';
import { HashingProvider } from './auth/providers/hashing.provider';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AccessTokenGuard } from './auth/guard/access-token/access-token.guard';
import jwtConfig from './auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { DataResponseInterceptor } from './common/interceptors/data-response/data-response.interceptor';
import { MailModule } from './mail/mail.module';
import { MailService } from './mail/providers/mail.service';


@Module({
  imports: [TagsModule, UsersModule, PostModule, ConfigModule.forRoot({
      isGlobal: true, // Make ConfigModule available globally
    }),
    // type orm module
    TypeOrmModule.forRootAsync({
      inject: [ConfigService], // Correct placement of inject
      useFactory: async(configService:ConfigService)=>({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: configService.get<string>('PGPASSWORD'),
      database: 'afrifarmer',
      // entities: [User, TagsModule, MetaOptionsModule, PostModule],
      autoLoadEntities: true, //To automatically load entities, 
      //set the autoLoadEntities property of the configuration object (passed into the forRoot() method) to true
      synchronize: true, // false when using it in production
      }),
 
    }),
    TagsModule,
    MetaOptionsModule,
    PostModule,
    AuthModule,
    
       ConfigModule.forFeature(jwtConfig),
      JwtModule.registerAsync(jwtConfig.asProvider()),
      MailModule],
  controllers: [AppController],
  providers: [AppService, 
  //   {
  //   provide: APP_GUARD,
  //   useClass:AccessTokenGuard
  // },
  {
    provide: APP_INTERCEPTOR,
    useClass: DataResponseInterceptor
  },
  MailService
],
  
})
export class AppModule {}
