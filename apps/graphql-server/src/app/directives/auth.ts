import {
  AuthenticationError,
  SchemaDirectiveVisitor,
} from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function (source, args, context, info) {
      if (!context.user) {
        throw new AuthenticationError('not authorized');
      }

      return await resolve(source, args, context, info);
    };
  }
}

export default AuthDirective;
