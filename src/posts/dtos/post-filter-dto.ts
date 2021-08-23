import { PostStatus } from '../model/post';

export class PostFilterDto {
  status: PostStatus;
  search: string;
}
