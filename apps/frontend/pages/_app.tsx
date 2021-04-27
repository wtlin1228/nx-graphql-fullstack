import * as React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider, useIsFetching } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

function GlobalLoadingIndicator() {
  const isFetching = useIsFetching();

  return isFetching ? (
    <div style={{ position: 'absolute', right: 10, top: 10 }}>updating...</div>
  ) : null;
}

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalLoadingIndicator />
      <ReactQueryDevtools />
      <Head>
        <title>Welcome to frontend!</title>
      </Head>
      <div className="app">
        <header className="flex">
          <h1>Welcome to frontend!</h1>
        </header>
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default CustomApp;
