import { gql } from 'graphql-request';
import { useQuery } from 'react-query';
import { useGraphQLClient } from '../contexts/useGraphQLClient';

export const gqlAllPostsQuery = gql`
  query AllPosts {
    posts {
      id
      message
      author {
        email
      }
    }
  }
`;

export default function usePosts() {
  const graphQLClient = useGraphQLClient();
  return useQuery('posts', async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await graphQLClient.request(gqlAllPostsQuery);
    return response.posts;
  });
}
