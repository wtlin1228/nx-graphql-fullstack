import { gql } from 'graphql-request';
import { useQuery } from 'react-query';
import { graphQLClient } from '../utils/graphQLClient';

export const postsQueryKey = 'posts';

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

export const fetchAllPosts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await graphQLClient.request(gqlAllPostsQuery);
  return response.posts;
};

export default function usePosts() {
  return useQuery(postsQueryKey, () => fetchAllPosts());
}
