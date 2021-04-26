import * as React from 'react';
import Link from 'next/link';
import usePaginationPost, {
  getQueryKey as getPaginationPostsQueryKey,
  request as paginationPostsRequest,
} from '../src/hooks/usePaginationPosts';
import useCreatePost from '../src/hooks/useCreatePost';
import { useGraphQLClient } from '../src/contexts/useGraphQLClient';
import { Post } from '@nx-graphql-fullstack/util-graphql-interface';
import { useQueryClient } from 'react-query';

const Posts = () => {
  const [page, setPage] = React.useState(1);
  const queryClient = useQueryClient();
  const graphQLClient = useGraphQLClient();
  const paginationPostsQuery = usePaginationPost(graphQLClient, page);

  React.useEffect(() => {
    const nextPage = page + 1;
    queryClient.prefetchQuery(getPaginationPostsQueryKey(nextPage), () =>
      paginationPostsRequest(graphQLClient, nextPage)
    );
  }, [page]);

  return (
    <div>
      <h1>Posts {paginationPostsQuery.isFetching ? 'updating...' : null}</h1>
      <div>
        {paginationPostsQuery.isLoading ? (
          'Loading posts...'
        ) : (
          <ul>
            {paginationPostsQuery.data.map((post: Post) => {
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
          disabled={paginationPostsQuery.isPreviousData}
        >
          Next
        </button>
        <span>Current Page: {page}</span>
      </div>
    </div>
  );
};

const PostForm = () => {
  const [message, setMessage] = React.useState<string>('');
  const createPostMutation = useCreatePost();

  return (
    <div>
      <h1>Create Post</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPostMutation.mutate({ message });
          setMessage('');
        }}
      >
        <label htmlFor="message">message: </label>
        <input
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={createPostMutation.isLoading}
        />
      </form>
      <p style={{ color: 'gray', opacity: '0.7' }}>
        {createPostMutation.isLoading ? 'Saving...' : null}
        {createPostMutation.isError ? 'An error occurred' : null}
        {createPostMutation.isSuccess ? 'Post added!' : null}
      </p>
      {createPostMutation.isError ? (
        <pre>
          {JSON.stringify(
            createPostMutation.error.response.errors.map(
              (error) => error.message
            ),
            undefined,
            4
          )}
        </pre>
      ) : null}
    </div>
  );
};

export function Index() {
  return (
    <div>
      <Posts />
      <PostForm />
    </div>
  );
}

export default Index;
