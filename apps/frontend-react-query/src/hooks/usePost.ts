import { gql } from 'graphql-request';
import { useQuery } from 'react-query';
import { graphQLClient } from '../utils/graphQLClient';

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

export const fetchPost = async (postId: string) => {
  const response = await graphQLClient.request(POST, {
    input: postId,
  });
  return response.post;
};

export default function usePost(postId: string) {
  return useQuery(getPostQueryKey(postId), () => fetchPost(postId), {
    enabled: postId !== 'undefined',
  });
}
