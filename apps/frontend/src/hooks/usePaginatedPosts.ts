import { gql, GraphQLClient } from 'graphql-request';
import { useQuery } from 'react-query';
import { useGraphQLClient } from '../contexts/useGraphQLClient';

// types
import { Post } from '@nx-graphql-fullstack/util-graphql-interface';

export const getPaginatedPostsQueryKey = (page: number) => ['posts', { page }];

export const gqlPaginatedPostsQuery = gql`
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

export const fetchPaginatedPosts = async (
  graphQLClient: GraphQLClient,
  page: number
) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await graphQLClient.request(gqlPaginatedPostsQuery, {
    input: page,
  });
  return response.posts;
};

export default function usePaginatedPosts(page: number, initialData: Post[]) {
  const graphQLClient = useGraphQLClient();
  return useQuery(
    getPaginatedPostsQueryKey(page),
    () => fetchPaginatedPosts(graphQLClient, page),
    {
      keepPreviousData: true,
      initialData,
    }
  );
}
