import { gql } from 'graphql-request';
import { useQuery } from 'react-query';
import { graphQLClient } from '../utils/graphQLClient';

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

export const fetchPaginatedPosts = async (page: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await graphQLClient.request(gqlPaginatedPostsQuery, {
    input: page,
  });
  return response.posts;
};

export default function usePaginatedPosts(page: number, initialData: Post[]) {
  return useQuery(
    getPaginatedPostsQueryKey(page),
    () => fetchPaginatedPosts(page),
    {
      keepPreviousData: true,
      initialData,
    }
  );
}
