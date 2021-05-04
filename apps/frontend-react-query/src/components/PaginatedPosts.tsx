import * as React from 'react';
import Link from 'next/link';
import { useQueryClient } from 'react-query';

// hooks
import usePaginatedPost, {
  getPaginatedPostsQueryKey,
  fetchPaginatedPosts,
} from '../hooks/usePaginatedPosts';

// types
import type { Post } from '@nx-graphql-fullstack/util-graphql-interface';

const PaginatedPosts = ({ initialData }: { initialData: Post[] }) => {
  const [page, setPage] = React.useState(1);
  const queryClient = useQueryClient();
  const { data, isFetching, isLoading, isPreviousData } = usePaginatedPost(
    page,
    initialData
  );

  React.useEffect(() => {
    const nextPage = page + 1;
    queryClient.prefetchQuery(getPaginatedPostsQueryKey(nextPage), () =>
      fetchPaginatedPosts(nextPage)
    );
  }, [page]);

  return (
    <div>
      <h1>Posts {isFetching ? 'updating...' : null}</h1>
      <div>
        {isLoading ? (
          'Loading posts...'
        ) : (
          <ul>
            {data.map((post: Post) => {
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
          disabled={isPreviousData}
        >
          Next
        </button>
        <span>Current Page: {page}</span>
      </div>
    </div>
  );
};

export default PaginatedPosts;
