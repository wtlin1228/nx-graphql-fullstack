import {
  ResolveField,
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  Parent,
} from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { CreatePostInput } from './dto/create-post.input';

@Resolver('Post')
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation('createPost')
  create(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @Context() ctx
  ) {
    return this.postsService.create(createPostInput, ctx);
  }

  @Query('posts')
  findAll(@Context() ctx) {
    return this.postsService.findAll(ctx);
  }

  @Query('post')
  findOne(@Args('id') id: string, @Context() ctx) {
    return this.postsService.findOne(id, ctx);
  }

  @ResolveField('author')
  author(@Parent() post, @Context() ctx) {
    return this.postsService.getAuthor(post, ctx);
  }
}
