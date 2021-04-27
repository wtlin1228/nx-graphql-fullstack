import { GraphQLClient } from 'graphql-request';

const endpoint = 'http://localhost:3333/graphql';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ii1lMXV4UWUwdmV6SXdSRTVjZlNJbiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTYxOTE3NjIxMH0.LT_NJlWMFWDCjps4mDFQUp7cmTvH6Hh7WKVVdOhlXSc';

const graphQLClient = new GraphQLClient(endpoint);
graphQLClient.setHeader('authorization', token);

export { graphQLClient };
