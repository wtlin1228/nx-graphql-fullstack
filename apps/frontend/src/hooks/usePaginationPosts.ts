import { gql, GraphQLClient } from 'graphql-request';
import { useQuery } from 'react-query';

export const getQueryKey = (page: number) => ['posts', { page }];

export const gqlQuery = gql`
  query AllPosts($input: Int) {
    posts(page: $input) {
      id
      message
      author {
        email
      }
    }
  }
`;

export const request = async (graphQLClient: GraphQLClient, page: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await graphQLClient.request(gqlQuery, {
    input: page,
  });
  return response.posts;
};

export default function usePaginationPosts(
  graphQLClient: GraphQLClient,
  page: number
) {
  return useQuery(getQueryKey(page), () => request(graphQLClient, page), {
    keepPreviousData: true,
  });
}
