import { gql } from 'graphql-request';
import { useQuery } from 'react-query';
import { graphQLClient } from '../utils/graphQLClient';

// types
import type { ClientError } from 'graphql-request';
import type { Post } from '@nx-graphql-fullstack/util-graphql-interface';

export const getPostQueryKey = (postId: string): string[] => ['posts', postId];

export const POST = gql`
  query Post($input: ID!) {
    post(id: $input) {
      id
      message
      author {
        email
      }
    }
  }
`;

export const fetchPost = async (postId: string): Promise<Post> => {
  const response = await graphQLClient.request(POST, {
    input: postId,
  });
  return response.post;
};

export default function usePost(postId: string) {
  return useQuery<Post, ClientError>(
    getPostQueryKey(postId),
    () => fetchPost(postId),
    {
      enabled: postId !== 'undefined',
      retry: process.env.NODE_ENV === 'test' ? 0 : 3,
    }
  );
}
