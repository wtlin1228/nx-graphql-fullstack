import * as React from 'react';
import { GraphQLClient } from 'graphql-request';

const endpoint = 'http://localhost:3333/graphql';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ii1lMXV4UWUwdmV6SXdSRTVjZlNJbiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTYxOTE3NjIxMH0.LT_NJlWMFWDCjps4mDFQUp7cmTvH6Hh7WKVVdOhlXSc';
const client = new GraphQLClient(endpoint);
client.setHeader('authorization', token);

const Context = React.createContext(client);

function GraphQLClientProvider({ children }) {
  return <Context.Provider value={client}>{children}</Context.Provider>;
}
function useGraphQLClient() {
  const context = React.useContext(Context);
  if (context === undefined) {
    throw new Error(
      'useGraphQLClient must be used within a GraphQLClientProvider'
    );
  }
  return context;
}
export { GraphQLClientProvider, useGraphQLClient };
