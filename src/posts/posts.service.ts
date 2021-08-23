import { Injectable, NotFoundException } from '@nestjs/common';
import { PostModel, PostStatus } from './model/post';
import { v4 as uuid4 } from 'uuid';
import { CreatePostDto } from './dtos/create-post';
import { PostFilterDto } from './dtos/post-filter-dto';

@Injectable()
export class PostsService {
  allPost: PostModel[] = [
    {
      id: 'jdjmsnd',
      title: 'Some Stuff!',
      body: "Stuff Happened Yesterday. Couldn't believe it mehn!",
      status: PostStatus.PUBLISHED,
    },
  ];

  getPost(filterDto?: PostFilterDto): PostModel[] {
    let posts = this.allPost;
    if (filterDto !== undefined) {
      const { status, search } = filterDto;
      if (status) {
        posts = posts.filter((p) => p.status === status.toUpperCase());
      }
      if (search) {
        posts = posts.filter(
          (p) =>
            p.title.toUpperCase().includes(search.toUpperCase()) ||
            p.body.toUpperCase().includes(search.toUpperCase()),
        );
      }
    }
    return posts;
  }

  createPost(createTaskDto: CreatePostDto): PostModel {
    const { title, body } = createTaskDto;
    const newPost: PostModel = {
      id: uuid4(),
      title,
      body,
      status: PostStatus.DRAFT,
    };
    this.allPost.push(newPost);
    return newPost;
  }

  getSinglePost(id: string): PostModel {
    const post = this.allPost.find((p) => p.id == id);
    if (!post) {
      throw new NotFoundException(`Cannot find post with id: '${id}'`);
    }
    return post;
  }

  deletePost(id: string): string {
    const post = this.getSinglePost(id);
    this.allPost.filter((p) => p.id != post.id);
    return 'Deleted';
  }

  editPost(id: string, editPostDto: CreatePostDto): PostModel {
    const post = this.getSinglePost(id);
    const { title, body } = editPostDto;
    post.title = title;
    post.body = body;
    return post;
  }

  changePostStatus(id: string, status: PostStatus): PostModel {
    const post = this.getSinglePost(id);
    post.status = status;
    return post;
  }
}
