import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';

@Injectable()
export class PostsService {
  create(createPostInput: CreatePostInput, { user, models }) {
    const post = models.Post.createOne({ ...createPostInput, author: user.id });
    return post;
  }

  findAll({ user, models }) {
    return models.Post.findMany({ author: user.id });
  }

  findOne(id: string, { user, models }) {
    return models.Post.findOne({ id, author: user.id });
  }

  getAuthor(post, { models }) {
    return models.User.findOne({ id: post.author });
  }
}
