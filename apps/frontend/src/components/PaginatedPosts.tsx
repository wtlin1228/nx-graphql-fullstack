import * as React from 'react';
import Link from 'next/link';

// contexts
import { useQueryClient } from 'react-query';
import { useGraphQLClient } from '../contexts/useGraphQLClient';

// hooks
import usePaginatedPost, {
  getPaginatedPostsQueryKey,
  fetchPaginatedPosts,
} from '../hooks/usePaginatedPosts';

// types
import { Post } from '@nx-graphql-fullstack/util-graphql-interface';

const PaginatedPosts = () => {
  const [page, setPage] = React.useState(1);
  const queryClient = useQueryClient();
  const graphQLClient = useGraphQLClient();
  const paginatedPostsQuery = usePaginatedPost(page);

  React.useEffect(() => {
    const nextPage = page + 1;
    queryClient.prefetchQuery(getPaginatedPostsQueryKey(nextPage), () =>
      fetchPaginatedPosts(graphQLClient, nextPage)
    );
  }, [page]);

  return (
    <div>
      <h1>Posts {paginatedPostsQuery.isFetching ? 'updating...' : null}</h1>
      <div>
        {paginatedPostsQuery.isLoading ? (
          'Loading posts...'
        ) : (
          <ul>
            {paginatedPostsQuery.data.map((post: Post) => {
              return (
                <li key={post.id}>
                  <Link href="/[postId]" as={`/${post.id}`}>
                    <a href={`/${post.id}`}>{post.message}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        <button
          onClick={() => setPage((page) => page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setPage((page) => page + 1)}
          disabled={paginatedPostsQuery.isPreviousData}
        >
          Next
        </button>
        <span>Current Page: {page}</span>
      </div>
    </div>
  );
};

export default PaginatedPosts;
