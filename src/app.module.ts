import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeormConfig } from './config/typeorm.config';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig)],
  controllers: [AppController, PostsController],
  providers: [AppService, PostsService],
})
export class AppModule {}
