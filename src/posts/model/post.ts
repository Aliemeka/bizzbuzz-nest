export interface PostModel {
  id: string;
  title: string;
  body: string;
  status: PostStatus;
}

export enum PostStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  RESTRICTED = 'RESTRICTED',
  ARCHIVED = 'ARCHIVED',
}
