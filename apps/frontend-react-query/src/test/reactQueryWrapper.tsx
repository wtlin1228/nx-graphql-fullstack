import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const createReactQueryWrapper = () => {
  const queryClient = new QueryClient();

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default createReactQueryWrapper;
