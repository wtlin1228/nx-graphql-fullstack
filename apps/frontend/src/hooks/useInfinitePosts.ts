import { gql, GraphQLClient } from 'graphql-request';
import { useInfiniteQuery } from 'react-query';
import { useGraphQLClient } from '../contexts/useGraphQLClient';

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

export const fetchInfinitePosts = async (
  graphQLClient: GraphQLClient,
  { pageParam = 1 }
) => {
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
  const graphQLClient = useGraphQLClient();
  return useInfiniteQuery(
    infinitePostsQueryKey,
    (context) => fetchInfinitePosts(graphQLClient, context),
    {
      getNextPageParam: (lastPage, _pages) => lastPage.nextPage,
    }
  );
}
