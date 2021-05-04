import { gql } from 'graphql-request';
import { useInfiniteQuery } from 'react-query';
import { graphQLClient } from '../utils/graphQLClient';

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

export const fetchInfinitePosts = async ({ pageParam = 1 }) => {
  const response = await graphQLClient.request(INFINITE_POSTS, {
    input: pageParam,
  });
  return {
    nextPage: pageParam + 1,
    posts: response.posts,
  };
};

export default function useInfinitePosts() {
  return useInfiniteQuery(infinitePostsQueryKey, fetchInfinitePosts, {
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}
