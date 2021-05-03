import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const http = createHttpLink({
  uri: 'http://localhost:3333/graphql',
});

const auth = setContext((_, { headers }) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ii1lMXV4UWUwdmV6SXdSRTVjZlNJbiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTYxOTE3NjIxMH0.LT_NJlWMFWDCjps4mDFQUp7cmTvH6Hh7WKVVdOhlXSc';

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const delay = setContext(
  () => new Promise((resolve) => setTimeout(resolve, 1500))
);

const initApolloClient = () =>
  new ApolloClient({
    link: ApolloLink.from([delay, auth, http]),
    cache: new InMemoryCache(),
  });

export default initApolloClient;
