import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { SignupInput } from './dto/signup.input';
import { SigninInput } from './dto/signin.input';
import { UpdateMeInput } from './dto/update-me.input';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation('signup')
  signup(@Args('signupInput') signupInput: SignupInput, @Context() ctx) {
    return this.usersService.signup(signupInput, ctx);
  }

  @Mutation('signin')
  signin(@Args('signinInput') signinInput: SigninInput, @Context() ctx) {
    return this.usersService.signin(signinInput, ctx);
  }

  @Mutation('updateMe')
  updateMe(
    @Args('updateMeInput') updateMeInput: UpdateMeInput,
    @Context() ctx
  ) {
    return this.usersService.updateMe(updateMeInput, ctx);
  }

  @Query('me')
  me(@Context('user') user) {
    return user;
  }
}
