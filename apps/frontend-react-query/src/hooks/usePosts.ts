import { gql } from 'graphql-request';
import { useQuery } from 'react-query';
import { graphQLClient } from '../utils/graphQLClient';

export const postsQueryKey = 'posts';

export const POSTS = gql`
  query Posts {
    posts {
      id
      message
      author {
        email
      }
    }
  }
`;

export const fetchPosts = async () => {
  const response = await graphQLClient.request(POSTS);
  return response.posts;
};

export default function usePosts() {
  return useQuery(postsQueryKey, fetchPosts);
}
