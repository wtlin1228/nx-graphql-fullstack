import { gql } from 'graphql-request';
import { useInfiniteQuery } from 'react-query';
import { graphQLClient } from '../utils/graphQLClient';

// types
import type { ClientError } from 'graphql-request';
import type { Post } from '@nx-graphql-fullstack/util-graphql-interface';

export const infinitePostsQueryKey = 'infinite-posts';

export const INFINITE_POSTS = gql`
  query InfinitePosts($input: Int) {
    posts(page: $input) {
      id
      message
      author {
        email
      }
    }
  }
`;

export const fetchInfinitePosts = async ({
  pageParam = 1,
}): Promise<{
  nextPage: number;
  posts: Post[];
}> => {
  const response = await graphQLClient.request(INFINITE_POSTS, {
    input: pageParam,
  });
  return {
    nextPage: pageParam + 1,
    posts: response.posts,
  };
};

export default function useInfinitePosts() {
  return useInfiniteQuery<
    {
      nextPage: number;
      posts: Post[];
    },
    ClientError
  >(infinitePostsQueryKey, fetchInfinitePosts, {
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}
