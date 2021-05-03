import { createHttpLink } from '@apollo/client';

export default function http() {
  return createHttpLink({
    uri: 'http://localhost:3333/graphql',
  });
}
