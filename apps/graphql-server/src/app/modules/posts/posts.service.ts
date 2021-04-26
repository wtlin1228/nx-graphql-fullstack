import { Injectable } from '@nestjs/common';
import { ValidationError } from 'apollo-server-express';
import { CreatePostInput } from './dto/create-post.input';

@Injectable()
export class PostsService {
  create(createPostInput: CreatePostInput, { user, models }) {
    if (createPostInput.message.includes('Bad')) {
      throw new ValidationError('Message can not include Bad word');
    }
    const post = models.Post.createOne({ ...createPostInput, author: user.id });
    return post;
  }

  findAll(page: number, { user, models }) {
    if (page) {
      const limit = 10;
      const offset = (page - 1) * limit;
      return models.Post.findMany({ author: user.id }).slice(
        offset,
        offset + limit
      );
    }
    return models.Post.findMany({ author: user.id });
  }

  findOne(id: string, { user, models }) {
    return models.Post.findOne({ id, author: user.id });
  }

  getAuthor(post, { models }) {
    return models.User.findOne({ id: post.author });
  }
}
