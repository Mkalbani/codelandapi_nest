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
      port: 5433,
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
    
],
  controllers: [AppController],
  providers: [AppService, PostServices, MetaOptionsService, UserService, TagsService],
  
})
export class AppModule {}
