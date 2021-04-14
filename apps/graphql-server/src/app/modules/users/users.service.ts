import { Injectable } from '@nestjs/common';
import { AuthenticationError } from 'apollo-server-errors';
import { SignupInput } from './dto/signup.input';
import { SigninInput } from './dto/signin.input';
import { UpdateMeInput } from './dto/update-me.input';

@Injectable()
export class UsersService {
  signup(signupInput: SignupInput, { models, createToken }) {
    const existing = models.User.findOne({ email: signupInput.email });

    if (existing) {
      throw new AuthenticationError('invalid email');
    }
    const user = models.User.createOne({
      ...signupInput,
      verified: false,
      avatar: 'http',
    });
    const token = createToken(user);
    return { token, user };
  }

  signin(signinInput: SigninInput, { models, createToken }) {
    const user = models.User.findOne(signinInput);

    if (!user) {
      throw new AuthenticationError('wrong email/password');
    }

    const token = createToken(user);
    return { token, user };
  }

  updateMe(updateMeInput: UpdateMeInput, { user, models }) {
    return models.User.updateOne({ id: user.id }, updateMeInput);
  }
}
