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
import { UpdatePostInput } from './dto/update-post.input';

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

  @Mutation('updatePost')
  update(
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
    @Context() ctx
  ) {
    return this.postsService.update(updatePostInput, ctx);
  }

  @Query('posts')
  findAll(@Args('page') page: number, @Context() ctx) {
    return this.postsService.findAll(page, ctx);
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
