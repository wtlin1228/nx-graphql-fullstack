import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { db, models } from './db';
import { getUserFromToken, createToken } from './auth';
import { AuthDirective } from './directives';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';

const graphqlModule = GraphQLModule.forRoot({
  typePaths: ['./**/*.graphql'],
  // mocks: true,
  context: function ({ req, connection }) {
    const context = { db, models };
    if (connection) {
      return { ...context, ...connection.context };
    }
    const token = req.headers.authorization;
    const user = getUserFromToken(token);
    return { ...context, user, createToken };
  },
  schemaDirectives: {
    auth: AuthDirective,
  },
});

@Module({
  imports: [graphqlModule, UsersModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
