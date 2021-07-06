import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import createAuthLink from './links/auth';
// import createDelayLink from './links/delay';
import createErrorLink from './links/error';
import createHttpLink from './links/http';

const initApolloClient = () =>
  new ApolloClient({
    link: ApolloLink.from([
      createErrorLink(),
      // createDelayLink(),
      createAuthLink(),
      createHttpLink(),
    ]),
    cache: new InMemoryCache(),
  });

export default initApolloClient;
