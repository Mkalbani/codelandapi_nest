import {
  Body,
  Controller,
  Delete,
  // DefaultValuePipe,
  Get,
  // Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostServices } from './providers/post.services';
// import { GetPostParamDto } from './dto/getPostParamDto';
import { CreatePostDto } from './dto/create-posts.dto';
import { PatchPostDto } from './dto/patch-post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postServices: PostServices) {}

  @Get('/:id?')
  public getPosts() {
    // @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number, // @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number, // @Param() getPostParamDto: GetPostParamDto,
    return this.postServices.FindAllPosts();
  }

  @Post()
  public createPosts(@Body() createPostDto: CreatePostDto) {
    return this.postServices.createPosts(createPostDto);
  }

  @Patch()
  public async updatePost(@Body() patchPostDto:PatchPostDto){
    return this.postServices.editPost(patchPostDto)
  }

  @Delete()
  public deleteOne(@Query('id', ParseIntPipe) id: number) {
    return this.postServices.deleteOne(id);
  }
}
