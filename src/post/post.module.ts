import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostServices } from './providers/post.services';
import { Post } from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { TagsModule } from 'src/tags/tags.module';

@Module({
  imports: [UsersModule, TagsModule, TypeOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostServices],
  exports: [TypeOrmModule, PostModule],
})
export class PostModule {}