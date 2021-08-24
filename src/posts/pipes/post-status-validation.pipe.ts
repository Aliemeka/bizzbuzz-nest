import { BadRequestException, PipeTransform } from '@nestjs/common';
import { PostStatus } from '../model/post';

export class PostStatusValidation implements PipeTransform {
  readonly allowedStatuses: PostStatus[] = [
    PostStatus.ARCHIVED,
    PostStatus.DRAFT,
    PostStatus.PUBLISHED,
    PostStatus.RESTRICTED
  ]

  private isStatusValid(status: any): boolean{
    const statusIndex = this.allowedStatuses.indexOf(status);
    return statusIndex !== -1;
  }

  transform(value: any) {
    value = value.toUpperCase();
    if(!this.isStatusValid(value)){
      throw new BadRequestException(`'${value}' is not a valid status. Status must be any of "${this.allowedStatuses.join(", ")}"`)
    }
    return value;
  }
}
