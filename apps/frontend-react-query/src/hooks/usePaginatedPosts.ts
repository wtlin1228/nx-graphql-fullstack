import { gql } from 'graphql-request';
import { useQuery } from 'react-query';
import { graphQLClient } from '../utils/graphQLClient';

// types
import type { ClientError } from 'graphql-request';
import type { Post } from '@nx-graphql-fullstack/util-graphql-interface';

export const getPaginatedPostsQueryKey = (page: number) => ['posts', { page }];

export const PAGINATED_POSTS = gql`
  query PaginatedPosts($input: Int) {
    posts(page: $input) {
      id
      message
      author {
        email
      }
    }
  }
`;

export const fetchPaginatedPosts = async (page: number): Promise<Post[]> => {
  const response = await graphQLClient.request(PAGINATED_POSTS, {
    input: page,
  });
  return response.posts;
};

export default function usePaginatedPosts(
  page: number,
  initialData: Post[] = []
) {
  return useQuery<Post[], ClientError>(
    getPaginatedPostsQueryKey(page),
    () => fetchPaginatedPosts(page),
    {
      keepPreviousData: true,
      initialData,
    }
  );
}
