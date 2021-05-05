import { gql } from 'graphql-request';
import { useQuery } from 'react-query';
import { graphQLClient } from '../utils/graphQLClient';

// types
import type { ClientError } from 'graphql-request';
import type { Post } from '@nx-graphql-fullstack/util-graphql-interface';

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

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await graphQLClient.request(POSTS);
  return response.posts;
};

export default function usePosts() {
  return useQuery<Post[], ClientError>(postsQueryKey, fetchPosts, {
    retry: process.env.NODE_ENV === 'test' ? 0 : 3,
  });
}
