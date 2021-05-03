import * as React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client/react';
import initApolloClient from '../src/apollo/client';

const client = initApolloClient();

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
