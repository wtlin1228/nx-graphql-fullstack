import { gql, GraphQLClient } from 'graphql-request';
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

export const fetchPost = async (
  graphQLClient: GraphQLClient,
  postId: string
) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await graphQLClient.request(gqlPostQuery, {
    input: postId,
  });
  return response.post;
};

export default function usePost(postId: string) {
  const graphQLClient = useGraphQLClient();
  return useQuery(getQueryKey(postId), () => fetchPost(graphQLClient, postId), {
    enabled: postId !== 'undefined',
  });
}
