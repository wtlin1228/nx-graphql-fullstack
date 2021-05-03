import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import createAuthLink from './links/auth';
import createDelayLink from './links/delay';
import createHttpLink from './links/http';

const initApolloClient = () =>
  new ApolloClient({
    link: ApolloLink.from([
      createDelayLink(),
      createAuthLink(),
      createHttpLink(),
    ]),
    cache: new InMemoryCache(),
  });

export default initApolloClient;
