import { gql } from 'graphql-request';
import { useQuery } from 'react-query';
import { useGraphQLClient } from '../contexts/useGraphQLClient';

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

export default function usePost(postId: string) {
  const graphQLClient = useGraphQLClient();
  return useQuery(
    getQueryKey(postId),
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await graphQLClient.request(gqlPostQuery, {
        input: postId,
      });
      return response.post;
    },
    {
      enabled: postId !== 'undefined',
    }
  );
}
