import { gql, GraphQLClient } from 'graphql-request';
import { useInfiniteQuery } from 'react-query';
import { graphQLClient } from '../utils/graphQLClient';

export const infinitePostsQueryKey = 'infinite-posts';

export const gqlInfinitePostsQuery = gql`
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

export const fetchInfinitePosts = async ({ pageParam = 1 }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await graphQLClient.request(gqlInfinitePostsQuery, {
    input: pageParam,
  });
  return {
    nextPage: pageParam + 1,
    posts: response.posts,
  };
};

export default function useInfinitePosts() {
  return useInfiniteQuery(infinitePostsQueryKey, fetchInfinitePosts, {
    getNextPageParam: (lastPage, _pages) => lastPage.nextPage,
  });
}
