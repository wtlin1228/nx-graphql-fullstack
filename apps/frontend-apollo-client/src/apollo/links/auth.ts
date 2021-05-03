import { setContext } from '@apollo/client/link/context';

export default function createAuthLink() {
  return setContext((_, { headers }) => {
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
}
