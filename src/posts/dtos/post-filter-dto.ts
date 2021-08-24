import { IsIn, IsOptional } from 'class-validator';
import { PostStatus } from '../model/post';
import { PostStatusValidation } from '../pipes/post-status-validation.pipe';

export class PostFilterDto {
  @IsOptional()
  @IsIn((new PostStatusValidation).allowedStatuses)
  status: PostStatus;
  
  @IsOptional()
  search: string;
}
