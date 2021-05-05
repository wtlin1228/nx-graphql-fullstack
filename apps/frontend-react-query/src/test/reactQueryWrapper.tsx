import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const createReactQueryWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default createReactQueryWrapper;
