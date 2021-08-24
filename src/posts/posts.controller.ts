import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post';
import { PostFilterDto } from './dtos/post-filter-dto';
import { PostModel, PostStatus } from './model/post';
import { PostStatusValidation } from './pipes/post-status-validation.pipe';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  postService = new PostsService();

  @Get('/')
  getPosts(@Query(ValidationPipe) filterDto: PostFilterDto): PostModel[] {
    if(Object.keys(filterDto).length){
      return this.postService.getPost(filterDto);
    }
    return this.postService.getPost();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createPost(@Body() createPostDto: CreatePostDto): PostModel {
    return this.postService.createPost(createPostDto);
  }

  @Get(':id')
  getPost(@Param('id') id: string): PostModel {
    return this.postService.getSinglePost(id);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  editPost(
    @Param('id') id: string,
    @Body() editPostDto: CreatePostDto,
  ): PostModel {
    return this.postService.editPost(id, editPostDto);
  }

  @Patch(':id')
  changePostStatus(
    @Param('id') id: string,
    @Body('status', PostStatusValidation) status: PostStatus,
  ): PostModel {
    return this.postService.changePostStatus(id, status);
  }
}
