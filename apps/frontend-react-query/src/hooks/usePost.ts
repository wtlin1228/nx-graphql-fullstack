import { gql } from 'graphql-request';
import { useQuery } from 'react-query';
import { graphQLClient } from '../utils/graphQLClient';

export const getQueryKey = (postId: string): string[] => ['posts', postId];

export const gqlPostQuery = gql`
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
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await graphQLClient.request(gqlPostQuery, {
    input: postId,
  });
  return response.post;
};

export default function usePost(postId: string) {
  return useQuery(getQueryKey(postId), () => fetchPost(postId), {
    enabled: postId !== 'undefined',
  });
}
