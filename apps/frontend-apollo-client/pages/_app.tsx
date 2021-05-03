import * as React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider } from '@apollo/client/react';

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

const client = new ApolloClient({
  link: ApolloLink.from([delay, auth, http]),
  cache: new InMemoryCache(),
});

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Welcome to frontend-apollo-client!</title>
      </Head>
      <div className="app">
        <header className="flex">
          <h1>Welcome to frontend-apollo-client!</h1>
        </header>
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </ApolloProvider>
  );
}

export default CustomApp;
